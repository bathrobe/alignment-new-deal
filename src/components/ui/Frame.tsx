/**
 * Frame — outer sidebar container
 * Comic panel style: flat cream, bold black outline, hard drop shadow
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
      className={`relative flex flex-col ${className}`}
      style={{
        backgroundColor: PALETTE.cream,
        border: `4px solid ${PALETTE.charcoal}`,
        borderRadius: "2px",
        boxShadow: `6px 6px 0 ${PALETTE.charcoal}`,
      }}
    >
      {/* Halftone dot overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${PALETTE.charcoal} 0.6px, transparent 0.6px)`,
          backgroundSize: "6px 6px",
          opacity: 0.035,
        }}
      />
      {children}
    </div>
  );
}
