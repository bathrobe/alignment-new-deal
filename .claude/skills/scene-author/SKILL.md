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
5. **Reference README** (`notes/references/README.md`) — Available style & character refs

### 3. Write Ink (File-First Collaborative Loop)

#### 3a: Present Context
- Show the arc scene description
- Summarize: vibe, emotional core
- Ask for any specific beats in mind

**STOP. Wait for input before drafting.**

#### 3b: Write First Draft to File
- Write directly to `src/story/episode1.ink` — not in chat
- Include: intro text, choices, response text, end knot with `+ [...]`
- Open the file in Cursor (`code <path>`) so user can see it

**STOP. User reads in editor. Gets feedback.**

#### 3c: Revise in File
- Use **Edit tool** for surgical changes (user sees old → new diffs)
- User can also edit the file directly in Cursor and describe changes
- Repeat until approved
- No rewriting whole blocks in chat — all edits happen on the real file

### 4. Generate Background

Use the **background-generator** skill:

#### 4a: Select References

Read `notes/references/README.md`. Pick 2 style refs matching the scene mood:

| Scene mood | Style refs |
|-----------|------------|
| Daytime exterior | `style_ref_01` + `style_ref_03` |
| Interior | `style_ref_02` + `style_ref_01` |
| Night / quiet | `style_ref_04` + `style_ref_01` |
| Hopeful / warm | `style_ref_03` + `style_ref_01` |

If the scene includes a known character, also attach their character ref
from `notes/references/characters/` (when those exist).

#### 4b: Craft 3 Prompts
Based on approved Ink, write 3 prompt variations.

**STOP. Discuss prompts.**

#### 4c: Generate All 3

All 3 get the same style refs. Generate to inbox:

```
public/inbox/{scene_name}_v1.jpg
public/inbox/{scene_name}_v2.jpg
public/inbox/{scene_name}_v3.jpg
```

#### 4d: Present Options
View all 3, note any issues with style lock compliance.

**STOP. Pick winner or request more.**

#### 4e: Finalize
- Move winner to `public/backgrounds/{scene_name}.jpg`
- Archive rejects to `public/inbox/archive/`
- If winner is especially good, suggest adding to `notes/references/style/`

### 5. Compile & Verify

```bash
pnpm run ink:compile
```

### 6. Mark Complete

Update your scene checklist.

---

## Speed Mode (Hackathon)

When time is tight, use this instead of the normal workflow:

### Image Blitz

1. Read `notes/arc.md` background descriptions + `notes/references/README.md`
2. Craft all prompts at once (1 per scene, no variations)
3. Generate in parallel batches of 3-4 using background agents
4. Quick review — regenerate only disasters
5. All images go directly to `public/backgrounds/{scene_name}.jpg`

### Ship It

1. `pnpm run ink:compile` — verify no errors
2. `pnpm dev` — test in browser via Claude-in-Chrome
3. Git commit, push, deploy

### Rules in Speed Mode
- **1 image per scene** (not 3)
- **No STOP gates** — keep moving unless something's broken
- **Always attach style refs** — still non-negotiable
- **Quick Look each image** to sanity check before moving on

---

## Notes (Normal Mode)

- **STOP means STOP.** Don't proceed until explicitly approved.
- **Keep it tight.** 2-3 lines per beat max.
- **3 variations minimum** for images.
- **Always attach style refs.** Never generate without them.
