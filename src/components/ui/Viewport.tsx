/**
 * Viewport - Content area / text panel
 * TODO: Customize styling for your project's look
 */

import type { ReactNode } from "react";
import { PALETTE } from "../../styles/palette";

interface ViewportProps {
  children: ReactNode;
  className?: string;
}

export function Viewport({ children, className = "" }: ViewportProps) {
  return (
    <div
      className={`rounded-lg ${className}`}
      style={{
        backgroundColor: PALETTE.surface,
        border: `1px solid ${PALETTE.border}`,
      }}
    >
      {children}
    </div>
  );
}
