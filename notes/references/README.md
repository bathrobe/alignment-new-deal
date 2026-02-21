# Reference Images

Style references for image generation consistency. These get auto-attached
via the `-r` flag when generating backgrounds.

## Style References (`style/`)

Approved backgrounds that define the visual language. Every generation
should include 2 of these as refs (shuffled randomly).

| File | Mood | What it locks |
|------|------|---------------|
| `style_ref_01_urban_melancholy.jpg` | Melancholy, golden hour, street | Palette, linework weight, POV |
| `style_ref_02_institutional_interior.jpg` | Calm, institutional, daylight | Interior lighting, object detail |
| `style_ref_03_civic_hope_outdoors.jpg` | Hopeful, golden hour, nature | Outdoor palette, scale, warmth |
| `style_ref_04_night_contemplation.jpg` | Quiet, nighttime, reflective | Night palette, city glow, mood |

### How to use

Pick 2 refs that match the mood of the scene you're generating:
- **Daytime exterior** → refs 01 + 03
- **Interior** → refs 02 + (01 or 03 for light color)
- **Night** → refs 04 + 01
- **Mixed/uncertain** → shuffle any 2

### Adding new refs

When a generated background is especially good, copy it here and add to the table.
Keep to 4-6 refs max — too many dilutes the signal.

## Character References (`characters/`)

_Not yet created. Will hold character reference sheets for consistency._
