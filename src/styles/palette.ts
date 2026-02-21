/**
 * Color palette — WPA screenprint / graphic novel
 * Flat colors, bold outlines, hard shadows
 */

export const PALETTE = {
  terraCotta: "#C2704F",     // Primary actions
  terraCottaLight: "#D07E5A",
  terraCottaDark: "#A85E3E",
  cream: "#E8DCC8",          // Paper/viewport/secondary
  creamLight: "#F0E8D6",
  creamDark: "#D8CDB8",
  slate: "#4D5666",          // Frame/header bar
  gold: "#C4A24D",           // Labels/accents
  teal: "#4A7C7E",           // Subtle tints
  charcoal: "#2B2D2F",       // Outlines, text, shadows
  disabledBg: "#A09888",
  disabledText: "#C0B8A8",
} as const;

export type PaletteColor = keyof typeof PALETTE;
