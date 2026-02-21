/**
 * PrimaryButton — terra cotta, bold outline, hard shadow
 * Lifts on hover, presses into shadow on active
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { PALETTE } from "../../../styles/palette";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function PrimaryButton({ children, disabled, className = "", style, ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`px-5 py-3 rounded cursor-pointer transition-all duration-[80ms] ease-in-out
        hover:translate-x-[-1px] hover:translate-y-[-1px]
        active:translate-x-[2px] active:translate-y-[2px]
        disabled:cursor-default disabled:transform-none
        ${className}`}
      style={{
        fontFamily: "'Bitter', Georgia, serif",
        fontWeight: 700,
        fontSize: "15px",
        color: disabled ? PALETTE.disabledText : PALETTE.cream,
        backgroundColor: disabled ? PALETTE.disabledBg : PALETTE.terraCotta,
        border: `3px solid ${disabled ? "rgba(43,45,47,0.4)" : PALETTE.charcoal}`,
        boxShadow: disabled
          ? `2px 2px 0 rgba(43,45,47,0.3)`
          : `4px 4px 0 ${PALETTE.charcoal}`,
        ...style,
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
