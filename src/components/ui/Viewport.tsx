/**
 * Viewport — content/reading area inside the frame
 * Cream paper feel, no border (frame provides the border)
 */

import type { ReactNode } from "react";

interface ViewportProps {
  children: ReactNode;
  className?: string;
}

export function Viewport({ children, className = "" }: ViewportProps) {
  return (
    <div className={`relative ${className}`} style={{ padding: "20px 18px" }}>
      {children}
    </div>
  );
}
