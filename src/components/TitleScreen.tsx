/**
 * TitleScreen - Welcome screen
 * TODO: Customize for your project's look and branding
 */

import { Frame, Viewport, HardwareBar } from "./ui";
import { PrimaryButton, SecondaryButton } from "./ui/buttons";
import { PALETTE } from "../styles/palette";

interface TitleScreenProps {
  onNewGame: () => void;
  onContinue: () => void;
  hasSave: boolean;
}

function TitleScreen({ onNewGame, onContinue, hasSave }: TitleScreenProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: PALETTE.background }}
    >
      <Frame>
        <HardwareBar
          centerSlot={
            <span className="text-xs" style={{ color: PALETTE.textMuted }}>
              Visual Novel Template
            </span>
          }
        />

        <Viewport>
          <div className="p-8 text-center">
            {/* Title - customize this */}
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: PALETTE.text }}
            >
              [Your Title Here]
            </h1>

            <p
              className="text-sm mb-8"
              style={{ color: PALETTE.textMuted }}
            >
              A visual novel
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3 items-center">
              <PrimaryButton onClick={onNewGame}>
                New Game
              </PrimaryButton>

              {hasSave && (
                <SecondaryButton onClick={onContinue}>
                  Continue
                </SecondaryButton>
              )}
            </div>
          </div>
        </Viewport>

        <HardwareBar
          centerSlot={
            <span className="text-xs" style={{ color: PALETTE.textMuted }}>
              v0.1
            </span>
          }
        />
      </Frame>
    </div>
  );
}

export default TitleScreen;
