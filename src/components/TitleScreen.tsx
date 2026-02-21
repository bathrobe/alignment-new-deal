/**
 * TitleScreen — welcome screen
 * Comic panel frame centered on page
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
      style={{ backgroundColor: PALETTE.slate }}
    >
      <Frame>
        <HardwareBar />

        <Viewport>
          <div className="py-8 px-4 text-center">
            <h1
              style={{
                fontFamily: "'Bitter', Georgia, serif",
                fontSize: "26px",
                fontWeight: 800,
                color: PALETTE.charcoal,
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                marginBottom: "8px",
              }}
            >
              The Alignment<br />New Deal
            </h1>

            <p
              style={{
                fontFamily: "'Bitter', Georgia, serif",
                fontSize: "12px",
                color: PALETTE.slate,
                textTransform: "uppercase" as const,
                letterSpacing: "1px",
                marginBottom: "28px",
              }}
            >
              An Interactive Story
            </p>

            <div className="flex flex-col gap-3 items-center">
              <PrimaryButton onClick={onNewGame} style={{ width: "200px" }}>
                New Game
              </PrimaryButton>

              {hasSave && (
                <SecondaryButton onClick={onContinue} style={{ width: "200px" }}>
                  Continue
                </SecondaryButton>
              )}
            </div>
          </div>
        </Viewport>
      </Frame>
    </div>
  );
}

export default TitleScreen;
