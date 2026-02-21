/**
 * Color palette - customize for your project
 * TODO: Define your visual identity colors here
 */

export const PALETTE = {
  // Core colors - replace with your project's palette
  primary: "#3B82F6",      // Blue - primary actions
  secondary: "#6B7280",    // Gray - secondary elements
  background: "#F9FAFB",   // Light gray - backgrounds
  surface: "#FFFFFF",      // White - cards/panels
  text: "#1F2937",         // Dark gray - body text
  textMuted: "#6B7280",    // Medium gray - secondary text
  border: "#E5E7EB",       // Light gray - borders
  accent: "#8B5CF6",       // Purple - accents (optional)
} as const;

export type PaletteColor = keyof typeof PALETTE;
