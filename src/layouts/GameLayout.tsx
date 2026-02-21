/**
 * GameLayout — scene + sidebar composition
 * Desktop: scene left, sidebar right
 * Mobile: scene top, sidebar bottom
 */

import type { ReactNode } from "react";
import { Frame, Viewport, HardwareBar } from "../components/ui";
import { PALETTE } from "../styles/palette";

interface GameLayoutProps {
  backgroundImage?: string;
  hardwareBarLeft?: ReactNode;
  hardwareBarCenter?: ReactNode;
  hardwareBarRight?: ReactNode;
  children: ReactNode;
}

export function GameLayout({
  backgroundImage,
  hardwareBarLeft,
  hardwareBarCenter,
  hardwareBarRight,
  children,
}: GameLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Scene area */}
      <div
        className="flex-1 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundColor: PALETTE.slate,
          minHeight: "40vh",
        }}
      />

      {/* Sidebar */}
      <div className="lg:w-80 lg:h-screen flex-shrink-0">
        <Frame className="h-full rounded-none">
          <HardwareBar
            leftSlot={hardwareBarLeft}
            centerSlot={hardwareBarCenter}
            rightSlot={hardwareBarRight}
          />
          <Viewport className="flex-1">
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
              {children}
            </div>
          </Viewport>
        </Frame>
      </div>
    </div>
  );
}
