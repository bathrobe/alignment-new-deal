/**
 * NarrativeText — story text display
 * Bitter serif, faded for old text
 */

import { PALETTE } from "../../styles/palette";
import { parseInkTags } from "../../utils/parseInkTags";

interface NarrativeTextProps {
  paragraphs: string[];
  newBatchStartIndex?: number;
}

export function NarrativeText({ paragraphs, newBatchStartIndex = 0 }: NarrativeTextProps) {
  return (
    <div className="space-y-3.5">
      {paragraphs.map((rawText, index) => {
        const { text, color } = parseInkTags(rawText);
        const isOld = index < newBatchStartIndex;

        return (
          <p
            key={index}
            style={{
              fontFamily: "'Bitter', Georgia, serif",
              fontSize: "15px",
              lineHeight: 1.7,
              color: color ?? PALETTE.charcoal,
              opacity: isOld ? 0.35 : 1,
            }}
          >
            {text}
          </p>
        );
      })}
    </div>
  );
}
