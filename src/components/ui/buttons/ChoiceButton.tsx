/**
 * ChoiceButton - Story choice selection button
 * TODO: Customize styling for your project's look
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { PALETTE } from "../../../styles/palette";

interface ChoiceButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ChoiceButton({ children, className = "", ...props }: ChoiceButtonProps) {
  return (
    <button
      className={`px-3 py-2 rounded-lg text-left text-sm w-full cursor-pointer transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1 ${className}`}
      style={{
        backgroundColor: PALETTE.background,
        color: PALETTE.text,
        border: `1px solid ${PALETTE.border}`,
      }}
      {...props}
    >
      <span className="mr-2">›</span>
      {children}
    </button>
  );
}
