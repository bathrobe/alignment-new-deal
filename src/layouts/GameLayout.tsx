/**
 * GameLayout - Scene + Sidebar composition
 * Desktop: flex row (scene left, sidebar right)
 * Mobile (<1024px): flex column (scene top, sidebar bottom)
 * TODO: Customize styling for your project
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
          backgroundColor: PALETTE.secondary,
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
            <div className="p-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {children}
            </div>
          </Viewport>
        </Frame>
      </div>
    </div>
  );
}
