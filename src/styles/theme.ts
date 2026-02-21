/**
 * Theme - derived values from palette
 * TODO: Customize gradients, shadows, etc. for your visual style
 */

import { PALETTE } from "./palette";

// Text color mapping for Ink #color: tags
// Add your own color names as needed
export const TEXT_COLORS: Record<string, string> = {
  primary: PALETTE.primary,
  muted: PALETTE.textMuted,
  accent: PALETTE.accent,
};
