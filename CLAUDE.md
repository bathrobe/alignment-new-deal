# Alignment New Deal

Visual novel engine: Ink (narrative) + React (presentation).

## Quick Context

- **What**: Alignment New Deal — interactive fiction
- **Stack**: Vite + React + TypeScript + inkjs + pnpm
- **Principle**: Ink owns all logic; React is dumb renderer

## Key Files

- `WORKFLOW.md` — Meta-process for building a visual novel
- `notes/arc.md` — Story structure (create from TEMPLATE)
- `notes/ink_syntax.md` — Ink language reference
- `DEV_NOTES.md` — Ink + React integration gotchas

## Session Start

1. Read `DEV_NOTES.md` for Ink + React patterns
2. Check `notes/arc.md` for current story state
3. When writing Ink, reference `notes/ink_syntax.md`

## Code Style

- Functional over OOP
- Many short files (sub-100 lines) over few long ones
- Readable variable names
- TypeScript, but don't be too precious with types while prototyping

## Dev Commands (after scaffolding)

```bash
pnpm install          # Install deps
pnpm dev              # Start dev server
pnpm run ink:compile  # Compile .ink to .json
```

_Project not yet scaffolded. Run these after setup._

---

## Development Workflow

### Spec-Driven Development

When I have a large task, I'll have a spec document and a checklist for agentically coding it. Here's what to do:

1. **Read the spec** (`tech-spec.md`) before implementing anything
2. **Check `CHECKLIST.md`** for the next task (lowest unchecked item)
3. **Implement** according to spec + CLAUDE.md code style
4. **Verify in browser** using Claude-in-Chrome extension before marking complete
5. **Commit** after each checklist item
6. **Check off** the completed item

### When Stuck or Uncertain

Stop and ask. Don't try alternatives silently—have a conversation. This helps Joe learn the codebase.

### Large Checklist Items

Break into sub-items inline. After completing sub-items, stop and talk before continuing.

---

## Code Style (Detailed)

### Architecture

- **Ink owns all logic; React is dumb renderer**
- State lives in Ink, exposed via `useInkStory` hook
- Components are pure functions (props-only, no internal state)
- Exception: UI-only state (animations, hover) is okay locally

### File Organization

- **Naming**: camelCase for files, PascalCase for components
- **Length**: Max ~100 lines per file; split proactively
- **Folders**: Flat unless complexity warrants nesting, then use descriptive folder names
- **Barrel exports**: Use `index.ts` for cleaner imports

### Styling

- Tailwind CSS
- shadcn/ui components when useful

### Error Handling

- Fail loudly during dev (throw errors)
- No silent failures or swallowed exceptions

### Components

```tsx
// Preferred: pure function, props-only
function StoryText({ text }: { text: string }) {
  return <p className="prose">{text}</p>
}

// Avoid: internal state that duplicates Ink state
function StoryText({ initialText }) {
  const [text, setText] = useState(initialText) // Don't do this
  ...
}
```

---

## Ink Patterns

### Flavor → Mechanical nesting

Top-level choices can be pure expression (no axis change). Nest the mechanical choices underneath. This gives players more voice without inflating the axis system.

```ink
* "I don't trust therapists."
    "That's fair," they say. "What is it specifically?"
    * * "My thoughts are my own."
        ~ sovereign_symphonic -= 1
        -> next_knot
    * * "Who says you're qualified?"
        ~ elitist_populist += 1
        -> next_knot
```

---

## Assets

- **Backgrounds**: `public/backgrounds/{scene-name}.jpg`
