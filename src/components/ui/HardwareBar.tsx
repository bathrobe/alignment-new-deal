/**
 * HardwareBar — top header strip
 * Slate background, bold chapter label in gold
 */

import type { ReactNode } from "react";
import { PALETTE } from "../../styles/palette";

interface HardwareBarProps {
  leftSlot?: ReactNode;
  centerSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export function HardwareBar({ leftSlot, centerSlot, rightSlot }: HardwareBarProps) {
  return (
    <div
      className="flex items-center justify-between px-3.5 py-2 relative z-10"
      style={{
        backgroundColor: PALETTE.slate,
        borderBottom: `3px solid ${PALETTE.charcoal}`,
      }}
    >
      <div className="flex-shrink-0">{leftSlot}</div>
      <div className="flex-1 flex justify-center">{centerSlot}</div>
      <div className="flex-shrink-0">{rightSlot}</div>
    </div>
  );
}

export function EmbossedLabel({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "'Bitter', Georgia, serif",
        fontSize: "12px",
        fontWeight: 800,
        color: PALETTE.gold,
        textTransform: "uppercase" as const,
        letterSpacing: "3px",
      }}
    >
      {children}
    </span>
  );
}
