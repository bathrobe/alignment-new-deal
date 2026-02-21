# Visual Novel Workflow

Meta-process for creating a new visual novel with this template.

---

## Phase 1: Story Design

1. **Define structure** — Create `notes/arc.md` with chapters, scenes, emotional beats
2. **Define characters** — Create `notes/characters.md` with descriptions + prompt fragments
3. **Define axes** (optional) — If doing a personality test, define the measurement poles

## Phase 2: Visual Identity

1. **Establish style lock** — Create `notes/style_lock.md` with:
   - Prompt prefix/suffix for image generation
   - Hex color palette
   - Mood references / touchstones
2. **Update background-generator skill** — Point to your style lock
3. **Generate UI styling** — Update `src/styles/palette.ts` and UI components to match your visual identity. Keep UI and art evolving together.

## Phase 3: Scene Authoring

For each scene:

1. **Draft Ink** — Write dialogue, choices, axis changes
2. **Generate images** — Create 3 variations to `public/inbox/`
3. **Pick winner** — Move to `public/backgrounds/`, archive rejects
4. **Compile & verify** — `pnpm run ink:compile`, test in browser

## Phase 4: Polish

1. **UI styling pass** — Apply visual identity to React components
2. **Viewport testing** — Check across screen sizes
3. **Results/ending** — Build out any special screens

---

## Key Files

| File | Purpose |
|------|---------|
| `notes/arc.md` | Story structure |
| `notes/characters.md` | Character bible |
| `notes/style_lock.md` | Visual consistency |
| `notes/ink_syntax.md` | Ink reference |
| `DEV_NOTES.md` | Ink + React gotchas |
| `CLAUDE.md` | Claude Code instructions |

## Key Folders

| Folder | Purpose |
|--------|---------|
| `src/story/` | Ink source files |
| `public/backgrounds/` | Final background images |
| `public/inbox/` | Image staging area |
| `.claude/skills/` | Claude skills for this project |
