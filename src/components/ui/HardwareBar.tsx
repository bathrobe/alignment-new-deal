/**
 * HardwareBar - Top strip with controls
 * Contains chapter label, title, mute button, etc.
 * TODO: Customize styling for your project's look
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
      className="flex items-center justify-between px-3 py-2 rounded-t-lg"
      style={{
        backgroundColor: PALETTE.secondary,
        borderBottom: `1px solid ${PALETTE.border}`,
      }}
    >
      <div className="flex-shrink-0">{leftSlot}</div>
      <div className="flex-1 flex justify-center">{centerSlot}</div>
      <div className="flex-shrink-0">{rightSlot}</div>
    </div>
  );
}

// Label for chapter names, status indicators, etc.
export function EmbossedLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="text-xs px-2 py-1 rounded"
      style={{
        backgroundColor: PALETTE.background,
        color: PALETTE.textMuted,
        border: `1px solid ${PALETTE.border}`,
      }}
    >
      {children}
    </span>
  );
}
