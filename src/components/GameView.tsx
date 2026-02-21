import type { InkChoice } from "../hooks/useInkStory";
import { GameLayout } from "../layouts/GameLayout";
import { EmbossedLabel, MuteButton, NarrativeText, ChoiceButton } from "./ui";
import { PALETTE } from "../styles/palette";

interface GameViewProps {
  backgroundName?: string;
  textHistory: string[];
  newBatchStartIndex: number;
  choices: InkChoice[];
  onChoose: (index: number) => void;
  onContinue: () => void;
  isEnded: boolean;
  hasPendingContent: boolean;
  chapterLabel?: string;
  isMuted: boolean;
  onToggleMute: () => void;
}

function GameView({
  backgroundName,
  textHistory,
  newBatchStartIndex,
  choices,
  onChoose,
  onContinue,
  isEnded,
  hasPendingContent,
  chapterLabel = "Episode 1",
  isMuted,
  onToggleMute,
}: GameViewProps) {
  const showClickToContinue = hasPendingContent && choices.length === 0;

  const backgroundImage = backgroundName
    ? `/backgrounds/${backgroundName}.jpg`
    : undefined;

  return (
    <GameLayout
      backgroundImage={backgroundImage}
      hardwareBarLeft={<EmbossedLabel>{chapterLabel}</EmbossedLabel>}
      hardwareBarRight={<MuteButton isMuted={isMuted} onToggle={onToggleMute} />}
    >
      {/* Narrative text with click-to-continue */}
      <div
        className={showClickToContinue ? "cursor-pointer" : ""}
        onClick={showClickToContinue ? onContinue : undefined}
      >
        <NarrativeText paragraphs={textHistory} newBatchStartIndex={newBatchStartIndex} />

        {showClickToContinue && (
          <div className="mt-3">
            <button
              onClick={onContinue}
              className="cursor-pointer transition-all duration-[80ms]
                hover:translate-x-[-1px] hover:translate-y-[-1px]
                active:translate-x-[1px] active:translate-y-[1px]"
              style={{
                fontFamily: "'Bitter', Georgia, serif",
                fontSize: "13px",
                color: PALETTE.slate,
                padding: "6px 16px",
                background: "transparent",
                border: `2px solid ${PALETTE.slate}`,
                borderRadius: "3px",
                boxShadow: `2px 2px 0 rgba(43,45,47,0.2)`,
              }}
            >
              . . .
            </button>
          </div>
        )}

        {isEnded && choices.length === 0 && !hasPendingContent && (
          <p
            className="mt-4 italic"
            style={{
              fontFamily: "'Bitter', Georgia, serif",
              color: PALETTE.slate,
              opacity: 0.6,
            }}
          >
            The End.
          </p>
        )}
      </div>

      {/* Choice buttons */}
      {choices.length > 0 && (
        <div
          className="mt-5 space-y-2 rounded-[3px]"
          style={{
            padding: "14px",
            background: `rgba(74,124,126, 0.08)`,
            border: `2px solid ${PALETTE.charcoal}`,
          }}
        >
          {choices.map((choice) => (
            <ChoiceButton key={choice.index} onClick={() => onChoose(choice.index)}>
              {choice.text}
            </ChoiceButton>
          ))}
        </div>
      )}
    </GameLayout>
  );
}

export default GameView;
