---
name: background-generator
description: Generate background images with consistent style for your visual novel. Wraps prompts with Style Lock prefix/suffix, generates at 4:3 2K, and saves to public/backgrounds/.
---

# Background Generator

Generate background images with your project's visual style.

## Quick Start

```
/background-generator "scene description" scene_name
/background-generator "scene description" scene_name -r /path/to/reference.jpg
```

## Setup

1. Create your style lock in `notes/style_lock.md` (see TEMPLATE)
2. Copy the prefix/suffix to `references/style-lock.md` in this skill folder

## Workflow

### 1. Read Style Lock

Load [references/style-lock.md](references/style-lock.md) for the prompt prefix, suffix, and palette.

### 2. Build the Prompt

Wrap the user's scene description:

```
{STYLE_LOCK_PREFIX}

{user's scene description}

{STYLE_LOCK_SUFFIX}
```

### 3. Generate Image

```bash
uv run ~/.claude/skills/nano-banana/scripts/generate_image.py \
  "{wrapped_prompt}" \
  -a 4:3 \
  -s 2K \
  [-r {reference_image_path}] \
  -o {project_path}/public/backgrounds/{scene_name}.jpg
```

### 4. Verify & Analyze

Read the generated image and evaluate:
- **Style adherence**: Does it match your style lock?
- **Clean frame**: No UI elements or text?
- **Composition**: Works as a background?

## Output

- **Format**: `.jpg`
- **Location**: `public/backgrounds/{scene_name}.jpg`
- **Naming**: lowercase, underscores for spaces

## References

- [style-lock.md](references/style-lock.md) — Your project's prompt prefix/suffix
