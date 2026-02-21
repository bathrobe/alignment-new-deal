---
name: scene-author
description: Step through arc.md scenes procedurally — write Ink dialogue, generate backgrounds, get feedback at each step.
---

# Scene Author

Procedural scene authoring with built-in revision loops. Collaborative — nothing ships without approval.

## Quick Start

```
/scene-author              # Continue from next unchecked scene
/scene-author "Scene Name" # Jump to specific scene
```

---

## Workflow

### 1. Find Next Scene

Check your scene checklist for the next unchecked scene.

### 2. Load Context

**Always read before drafting:**

1. **Arc doc** (`notes/arc.md`) — Scene description, vibe, axes
2. **Current story** (`src/story/*.ink`) — Voice, tone, existing flow
3. **Existing backgrounds** — Visual language established
4. **DEV_NOTES.md** — Ink patterns and gotchas

### 3. Write Ink (Collaborative Loop)

#### 3a: Present Context
- Show the arc scene description
- Summarize: vibe, axes, emotional core
- Ask for any specific beats in mind

**STOP. Wait for input before drafting.**

#### 3b: Draft Intro
- Opening text only (2-4 paragraphs)
- Set scene, establish mood
- No choices yet

**STOP. Get feedback. Revise until approved.**

#### 3c: Draft Choices
- 3-4 choice texts only
- Note which axis each moves
- No responses yet

**STOP. Discuss framing. Revise until approved.**

#### 3d: Draft Full Scene
- Add response text
- Add axis changes
- Add end knot with `+ [...]` pattern

**STOP. Line-by-line feedback. Revise until approved.**

### 4. Generate Background

Use the **background-generator** skill:

#### 4a: Craft 3 Prompts
Based on approved Ink, write 3 variations.

**STOP. Discuss prompts.**

#### 4b: Generate All 3
```
public/inbox/{scene_name}_v1.jpg
public/inbox/{scene_name}_v2.jpg
public/inbox/{scene_name}_v3.jpg
```

#### 4c: Present Options
View all 3, note any issues.

**STOP. Pick winner or request more.**

#### 4d: Finalize
- Move winner to `public/backgrounds/{scene_name}.jpg`
- Archive rejects to `public/inbox/archive/`

### 5. Compile & Verify

```bash
pnpm run ink:compile
```

### 6. Mark Complete

Update your scene checklist.

---

## Notes

- **STOP means STOP.** Don't proceed until explicitly approved.
- **Keep it tight.** 2-3 lines per beat max.
- **3 variations minimum** for images.
