# Tech Spec: Hybrid Narrative + Exploration System

> **Project**: Alignment New Deal
> **Architecture**: Ink (narrative) + React (world state) hybrid
> **Principle**: Ink owns dialogue, choices, and story flags. React owns rooms, items, and movement. A narrow bridge connects them.

---

## 1. Overview

The game alternates between two modes:

| Mode | Owner | What the player does |
|------|-------|---------------------|
| **NARRATIVE** | Ink | Reads dialogue, makes choices, advances story |
| **EXPLORE** | React | Moves between rooms, picks up items, inspects things |

Exploration is **bounded and linear** — small pockets of 2-4 rooms between narrative beats. Not an open world. Think of it as seasoning: you poke around a space, find flavor items, then a trigger pulls you into the next Ink scene.

---

## 2. Game Modes

### 2.1 Mode Enum

```typescript
type GameMode = 'title' | 'narrative' | 'explore' | 'results'
```

### 2.2 Mode Transitions

```
title → narrative (new game / continue)
narrative → explore (Ink emits `# mode: explore` tag)
explore → narrative (player triggers narrative event)
narrative → results (Ink emits `# show: results` tag)
```

### 2.3 Narrative Triggers (explore → narrative)

Exploration ends when the player does something that fires an Ink knot:
- **Enter a room** for the first time (e.g., entering `lab` triggers `=== lab_first_visit ===`)
- **Use an item** in a specific context (e.g., use `notebook` in `office`)
- **Click a hotspot** (a special interactable in a room)
- **Exhaust a space** (visited all rooms → auto-trigger next beat)

These are defined per-scene in the room data, not hardcoded.

---

## 3. World Model (React)

### 3.1 Data Types

```typescript
// src/types/world.ts

interface Room {
  id: string
  name: string
  description: string
  background: string              // image filename (matches public/backgrounds/)
  exits: Exit[]
  items: string[]                 // item IDs present in room (mutable)
  hotspots: Hotspot[]             // clickable narrative triggers
  onFirstVisit?: string           // Ink knot to fire on first entry
}

interface Exit {
  direction: string               // "north", "the hallway", "upstairs", etc.
  targetRoomId: string
  locked?: boolean
  lockMessage?: string            // "The door won't budge."
}

interface Item {
  id: string
  name: string
  description: string             // shown on inspect
  icon?: string                   // emoji or small image
  narrativeTrigger?: string       // Ink knot fired when picked up
}

interface Hotspot {
  id: string
  label: string                   // "Examine the console", "Talk to the figure"
  inkKnot: string                 // Ink knot to trigger
  oneShot?: boolean               // disappears after use (default: true)
}
```

### 3.2 World State

```typescript
// Managed by useWorld hook

interface WorldState {
  currentRoomId: string
  inventory: string[]             // item IDs the player holds
  visitedRooms: Set<string>       // track first-visit triggers
  roomStates: Record<string, {    // per-room mutable state
    itemsRemaining: string[]
    hotspotsUsed: string[]
    unlocked: string[]            // exit IDs that were locked, now open
  }>
}
```

### 3.3 Data Files

Room and item definitions live in `src/data/`:

```
src/data/
├── rooms.ts          // Room[] — all room definitions
├── items.ts          // Item[] — all item definitions
└── chapters.ts       // chapter-to-room mappings (which rooms available when)
```

Rooms are grouped by **chapter** — each exploration segment only exposes a subset of rooms. This keeps exploration bounded.

```typescript
// src/data/chapters.ts
interface Chapter {
  id: string
  startRoomId: string
  availableRoomIds: string[]
}
```

---

## 4. Hooks

### 4.1 `useWorld` (new)

```typescript
// src/hooks/useWorld.ts

function useWorld() {
  // State
  const currentRoom: Room
  const inventory: Item[]
  const availableExits: Exit[]

  // Actions
  function moveTo(roomId: string): NarrativeTrigger | null
  function pickUpItem(itemId: string): NarrativeTrigger | null
  function useHotspot(hotspotId: string): NarrativeTrigger | null
  function isRoomVisited(roomId: string): boolean
  function hasItem(itemId: string): boolean

  // Chapter management
  function loadChapter(chapterId: string): void
  function getWorldSnapshot(): WorldState    // for save/load

  return { currentRoom, inventory, availableExits, moveTo, pickUpItem, ... }
}
```

Each action returns a `NarrativeTrigger | null`. If non-null, the game controller switches to NARRATIVE mode and starts that Ink knot.

```typescript
interface NarrativeTrigger {
  inkKnot: string       // e.g. "lab_first_visit"
}
```

### 4.2 `useGameMode` (new)

```typescript
// src/hooks/useGameMode.ts

function useGameMode() {
  const mode: GameMode
  function setMode(mode: GameMode): void
  function enterExplore(chapterId: string): void   // sets up rooms + switches mode
  function enterNarrative(inkKnot?: string): void   // switches to Ink, optionally jumps
  return { mode, setMode, enterExplore, enterNarrative }
}
```

### 4.3 `useInkStory` (existing — modifications)

Add **external functions** so Ink can query world state:

```typescript
// Register with Ink's external function API
story.BindExternalFunction("hasItem", (itemId: string) => boolean)
story.BindExternalFunction("currentRoom", () => string)
story.BindExternalFunction("roomVisited", (roomId: string) => boolean)
story.BindExternalFunction("itemCount", () => number)
```

Add **tag handlers** so Ink can command world changes:

| Tag | Effect |
|-----|--------|
| `# give: item-id` | Add item to inventory |
| `# take: item-id` | Remove item from inventory |
| `# move: room-id` | Teleport player to room |
| `# unlock: room-id:exit-direction` | Unlock a locked exit |
| `# mode: explore` | Switch to explore mode |
| `# mode: narrative` | (default) stay in narrative |
| `# chapter: chapter-id` | Load a chapter's room set |

These tags are parsed in the existing `parseTags()` utility and handled by a new `handleWorldTags()` function.

---

## 5. Components

### 5.1 New Components

```
src/components/explore/
├── RoomView.tsx          # Room description + background + hotspots
├── ExitList.tsx          # Navigation buttons (exits)
├── InventoryPanel.tsx    # Sidebar inventory display
├── ItemInRoom.tsx        # Clickable item on the ground
└── HotspotButton.tsx     # Clickable narrative trigger in a room
```

### 5.2 Component Specs

**RoomView** — Main explore viewport
- Shows room `background` image (same system as narrative backgrounds)
- Renders room `description` text
- Lists items on the ground (clickable to pick up)
- Lists hotspots (clickable to trigger narrative)

**ExitList** — Navigation
- Renders available exits as buttons: "Go to the hallway", "Head upstairs"
- Locked exits shown grayed out with lock message on hover/click
- Clicking fires `moveTo()` → may trigger narrative

**InventoryPanel** — Sidebar
- List of held items with icon + name
- Click to inspect (shows description in a small popover or inline)
- Minimal — this is flavor, not a puzzle system

**ItemInRoom** — Pickup prompt
- Shows item name + "Pick up" action
- On click: item moves from room to inventory, optional Ink trigger

**HotspotButton** — Narrative interactable
- Styled differently from exits (more prominent, story-colored)
- "Examine the terminal", "Talk to the stranger"
- One-shot by default (disappears after use)

### 5.3 Modified Components

**GameView.tsx** — Add mode-aware rendering:
```tsx
function GameView() {
  const { mode } = useGameMode()

  if (mode === 'explore') return <ExploreView />
  if (mode === 'narrative') return <NarrativeView />  // existing behavior
}
```

**GameLayout.tsx** — Sidebar shows inventory in explore mode, narrative text in narrative mode.

**App.tsx** — Wire up `useWorld`, `useGameMode`, and the bridge between them.

---

## 6. The Bridge

The bridge is the orchestration layer that connects Ink and React world state. It lives in `src/lib/bridge.ts` and is consumed by the game controller in `App.tsx`.

### 6.1 Ink → React (tag commands)

After each Ink `continue()`, scan tags for world commands:

```typescript
// src/lib/bridge.ts

function handleWorldTags(
  tags: Record<string, string>,
  world: WorldActions,
  gameMode: GameModeActions
) {
  if (tags.give) world.addItem(tags.give)
  if (tags.take) world.removeItem(tags.take)
  if (tags.move) world.moveTo(tags.move)
  if (tags.unlock) world.unlockExit(tags.unlock)  // format: "roomId:direction"
  if (tags.mode === 'explore') gameMode.enterExplore(tags.chapter)
  if (tags.chapter) world.loadChapter(tags.chapter)
}
```

### 6.2 React → Ink (external functions)

Registered at story initialization. The functions close over world state:

```typescript
function bindWorldFunctions(story: Story, world: WorldState) {
  story.BindExternalFunction("hasItem", (id: string) =>
    world.inventory.includes(id)
  )
  story.BindExternalFunction("currentRoom", () =>
    world.currentRoomId
  )
  story.BindExternalFunction("roomVisited", (id: string) =>
    world.visitedRooms.has(id)
  )
}
```

### 6.3 Explore → Ink (narrative triggers)

When a world action returns a `NarrativeTrigger`:

```typescript
function handleNarrativeTrigger(trigger: NarrativeTrigger) {
  gameMode.enterNarrative()
  inkStory.jumpTo(trigger.inkKnot)
  inkStory.continue()
}
```

---

## 7. Save/Load

Extend the existing save system to include world state:

```typescript
interface GameSave {
  inkState: string              // existing
  background?: string           // existing
  textHistory?: string[]        // existing
  worldState?: WorldState       // NEW — rooms, inventory, visited
  gameMode?: GameMode           // NEW — what mode to resume in
  currentChapter?: string       // NEW — which room set is active
}
```

Save triggers remain the same: on scene transitions (background changes) and on mode switches.

---

## 8. File Structure (final)

```
src/
├── types/
│   └── world.ts                # Room, Item, Exit, Hotspot, WorldState types
├── data/
│   ├── rooms.ts                # Room definitions
│   ├── items.ts                # Item definitions
│   └── chapters.ts             # Chapter → room mappings
├── hooks/
│   ├── useInkStory.ts          # MODIFIED — add external functions
│   ├── useWorld.ts             # NEW — world state management
│   ├── useGameMode.ts          # NEW — mode switching
│   ├── useAudio.ts             # existing
│   └── useMediaQuery.ts        # existing
├── lib/
│   ├── bridge.ts               # NEW — Ink ↔ React bridge
│   ├── gameSave.ts             # MODIFIED — include world state
│   ├── tags.ts                 # MODIFIED — parse world tags
│   └── copyCard.ts             # existing
├── components/
│   ├── explore/
│   │   ├── ExploreView.tsx     # NEW — explore mode container
│   │   ├── RoomView.tsx        # NEW — room display
│   │   ├── ExitList.tsx        # NEW — navigation buttons
│   │   ├── InventoryPanel.tsx  # NEW — item list sidebar
│   │   ├── ItemInRoom.tsx      # NEW — pickup prompt
│   │   └── HotspotButton.tsx   # NEW — narrative trigger button
│   ├── GameView.tsx            # MODIFIED — mode-aware rendering
│   ├── TitleScreen.tsx         # existing
│   ├── ResultsScreen.tsx       # existing
│   └── ui/                     # existing components
├── layouts/
│   ├── GameLayout.tsx          # MODIFIED — sidebar adapts to mode
│   └── TitleLayout.tsx         # existing
├── styles/                     # existing
├── App.tsx                     # MODIFIED — wire up world + bridge
└── main.tsx                    # existing
```

---

## 9. What This Spec Does NOT Cover

- Story content (narrative, characters, axes) — brainstormed separately
- Visual identity (palette, style lock, backgrounds) — Phase 2 of WORKFLOW.md
- Audio — existing system, no changes needed
- Results screen — customize after story is defined
- Specific room/item content — populated after story structure exists
