/**
 * Parse Ink tags into a key-value object.
 * ["background: lab", "show: results"] → { background: "lab", show: "results" }
 */
export function parseTags(tags: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const tag of tags) {
    const [key, value] = tag.split(":");
    if (key && value) {
      result[key.trim()] = value.trim();
    }
  }
  return result;
}
