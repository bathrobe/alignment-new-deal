/**
 * TitleLayout - Title screen composition
 * Centered Frame with Viewport for content
 * TODO: Customize background styling for your project
 */

import type { ReactNode } from "react";
import { Frame, Viewport, HardwareBar } from "../components/ui";
import { PALETTE } from "../styles/palette";

interface TitleLayoutProps {
  topHardwareBar?: ReactNode;
  bottomHardwareBar?: ReactNode;
  children: ReactNode;
}

export function TitleLayout({
  topHardwareBar,
  bottomHardwareBar,
  children,
}: TitleLayoutProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: PALETTE.slate }}
    >
      <Frame>
        {topHardwareBar && (
          <HardwareBar centerSlot={topHardwareBar} />
        )}
        <Viewport>
          <div className="p-8">
            {children}
          </div>
        </Viewport>
        {bottomHardwareBar && (
          <HardwareBar centerSlot={bottomHardwareBar} />
        )}
      </Frame>
    </div>
  );
}
