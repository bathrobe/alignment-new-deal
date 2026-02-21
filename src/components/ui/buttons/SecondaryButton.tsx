/**
 * SecondaryButton — cream, bold outline, hard shadow
 * Same shadow system as primary
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { PALETTE } from "../../../styles/palette";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function SecondaryButton({ children, className = "", style, ...props }: SecondaryButtonProps) {
  return (
    <button
      className={`px-5 py-2.5 rounded cursor-pointer transition-all duration-[80ms] ease-in-out
        hover:translate-x-[-1px] hover:translate-y-[-1px]
        active:translate-x-[2px] active:translate-y-[2px]
        ${className}`}
      style={{
        fontFamily: "'Bitter', Georgia, serif",
        fontWeight: 600,
        fontSize: "14px",
        color: PALETTE.charcoal,
        backgroundColor: PALETTE.cream,
        border: `3px solid ${PALETTE.charcoal}`,
        boxShadow: `4px 4px 0 ${PALETTE.charcoal}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
