/**
 * SecondaryButton - Secondary action button
 * TODO: Customize styling for your project's look
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { PALETTE } from "../../../styles/palette";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function SecondaryButton({ children, className = "", ...props }: SecondaryButtonProps) {
  return (
    <button
      className={`px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      style={{
        backgroundColor: PALETTE.background,
        color: PALETTE.text,
        border: `1px solid ${PALETTE.border}`,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
