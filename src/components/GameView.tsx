import type { InkChoice } from "../hooks/useInkStory";
import { GameLayout } from "../layouts/GameLayout";
import { EmbossedLabel, MuteButton, NarrativeText, ChoiceButton } from "./ui";

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

/**
 * Main game layout using hardware-framed sidebar.
 * Desktop: scene left, sidebar right
 * Mobile: scene top, sidebar bottom
 */
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
  // Click-to-continue when there's pending content and no choices
  const showClickToContinue = hasPendingContent && choices.length === 0;

  // Build background image path (or undefined for special backgrounds)
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
          <div className="mt-4">
            <ChoiceButton onClick={onContinue}>...</ChoiceButton>
          </div>
        )}

        {isEnded && choices.length === 0 && !hasPendingContent && (
          <p className="mt-4 text-gray-400 italic font-baskerville">The End.</p>
        )}
      </div>

      {/* Choice buttons */}
      {choices.length > 0 && (
        <div className="mt-4 space-y-2">
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
