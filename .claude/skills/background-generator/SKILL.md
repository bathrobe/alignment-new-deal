---
name: background-generator
description: Generate background images with consistent style for your visual novel. Wraps prompts with Style Lock prefix/suffix, generates at 4:3 2K, and saves to public/backgrounds/.
---

# Background Generator

Generate background images with your project's visual style.

## Quick Start

```
/background-generator "scene description" scene_name
/background-generator "scene description" scene_name -r /path/to/extra/reference.jpg
```

## Workflow

### 1. Read Style Lock

Load [references/style-lock.md](references/style-lock.md) for the prompt prefix, suffix, and palette.

### 2. Select Style References

Read `notes/references/README.md` for the reference image table.

**Auto-attach 2 style refs** based on scene mood:

| Scene mood | Refs to use |
|-----------|-------------|
| Daytime exterior | `style_ref_01_urban_melancholy.jpg` + `style_ref_03_civic_hope_outdoors.jpg` |
| Interior | `style_ref_02_institutional_interior.jpg` + `style_ref_01_urban_melancholy.jpg` |
| Night / quiet | `style_ref_04_night_contemplation.jpg` + `style_ref_01_urban_melancholy.jpg` |
| Hopeful / warm | `style_ref_03_civic_hope_outdoors.jpg` + `style_ref_01_urban_melancholy.jpg` |
| Mixed / uncertain | Shuffle any 2 |

Ref path base: `{project_path}/notes/references/style/`

### 3. Build the Prompt

Wrap the user's scene description:

```
{STYLE_LOCK_PREFIX}

{user's scene description}

{STYLE_LOCK_SUFFIX}
```

### 4. Generate Image

```bash
uv run ~/.claude/skills/nano-banana/scripts/generate_image.py \
  "{wrapped_prompt}" \
  -a 4:3 \
  -s 2K \
  -r {ref_1_path} \
  -r {ref_2_path} \
  [-r {extra_reference_if_user_provided}] \
  -o {project_path}/public/backgrounds/{scene_name}.jpg
```

**Always include 2 style refs.** The user may optionally pass additional refs
(e.g., character sheets) — append those as extra `-r` flags.

### 5. Verify & Analyze

Read the generated image and evaluate:
- **Style adherence**: Does it match the style refs? Same linework, palette, flatness?
- **Clean frame**: No UI elements or text?
- **Composition**: Works as a background? Important elements away from edges?
- **Palette**: Dusty teals, terra cotta, muted gold, cool slate?

If the image is especially good, suggest adding it to `notes/references/style/`.

## Output

- **Format**: `.jpg`
- **Location**: `public/backgrounds/{scene_name}.jpg`
- **Naming**: lowercase, underscores for spaces

## References

- [style-lock.md](references/style-lock.md) — Prompt prefix/suffix and palette
- `notes/references/README.md` — Style ref table and usage guide
- `notes/references/style/` — Style reference images (auto-attached)
