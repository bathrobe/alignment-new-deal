/**
 * Frame - Outer container/wrapper
 * TODO: Customize styling for your project's look
 */

import type { ReactNode } from "react";
import { PALETTE } from "../../styles/palette";

interface FrameProps {
  children: ReactNode;
  className?: string;
}

export function Frame({ children, className = "" }: FrameProps) {
  return (
    <div
      className={`relative p-4 flex flex-col border rounded-lg ${className}`}
      style={{
        backgroundColor: PALETTE.secondary,
        borderColor: PALETTE.border,
      }}
    >
      {children}
    </div>
  );
}
