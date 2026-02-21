/**
 * Parse Ink color tags from text
 * Example: "Hello!" #color:teal → { text: "Hello!", color: "teal" }
 */

import { TEXT_COLORS } from "../styles/theme";

export interface ParsedText {
  text: string;
  color?: string; // Hex color if tag found
}

const COLOR_TAG_REGEX = /#color:(\w+)/;

export function parseInkTags(rawText: string): ParsedText {
  const match = rawText.match(COLOR_TAG_REGEX);

  if (!match) {
    return { text: rawText };
  }

  const colorKey = match[1];
  const text = rawText.replace(COLOR_TAG_REGEX, "").trim();
  const color = TEXT_COLORS[colorKey];

  return {
    text,
    color,
  };
}
