/**
 * ChoiceButton — cream with arrow, fills terra cotta on hover
 * Comic panel choice style
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./choiceButton.css";

interface ChoiceButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ChoiceButton({ children, className = "", ...props }: ChoiceButtonProps) {
  return (
    <button
      className={`choice-btn w-full text-left rounded-[3px] cursor-pointer ${className}`}
      {...props}
    >
      <span className="choice-arrow">&#9656;</span>
      {children}
    </button>
  );
}
