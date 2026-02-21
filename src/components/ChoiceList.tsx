import type { InkChoice } from "../hooks/useInkStory";
import { ChoiceButton } from "./ui";
import { PALETTE } from "../styles/palette";

interface ChoiceListProps {
  choices: InkChoice[];
  onChoose: (index: number) => void;
}

/**
 * Renders choice buttons for the player.
 * TODO: Customize styling for your project
 */
function ChoiceList({ choices, onChoose }: ChoiceListProps) {
  if (choices.length === 0) {
    return null;
  }

  return (
    <div
      className="p-3 rounded-lg space-y-2"
      style={{ backgroundColor: PALETTE.background }}
    >
      {choices.map((choice) => (
        <ChoiceButton
          key={choice.index}
          onClick={() => onChoose(choice.index)}
        >
          {choice.text}
        </ChoiceButton>
      ))}
    </div>
  );
}

export default ChoiceList;
