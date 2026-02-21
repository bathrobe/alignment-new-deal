/**
 * NarrativeText - Story text display
 * Supports color tags from Ink
 */

import { PALETTE } from "../../styles/palette";
import { parseInkTags } from "../../utils/parseInkTags";

interface NarrativeTextProps {
  paragraphs: string[];
  newBatchStartIndex?: number;
}

export function NarrativeText({ paragraphs, newBatchStartIndex = 0 }: NarrativeTextProps) {
  return (
    <div className="space-y-3">
      {paragraphs.map((rawText, index) => {
        const { text, color } = parseInkTags(rawText);
        const isOld = index < newBatchStartIndex;

        return (
          <p
            key={index}
            className="text-base leading-relaxed"
            style={{
              color: color ?? PALETTE.text,
              opacity: isOld ? 0.5 : 1,
            }}
          >
            {text}
          </p>
        );
      })}
    </div>
  );
}
