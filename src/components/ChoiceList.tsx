import type { InkChoice } from "../hooks/useInkStory";
import { ChoiceButton } from "./ui";
import { PALETTE } from "../styles/palette";

interface ChoiceListProps {
  choices: InkChoice[];
  onChoose: (index: number) => void;
}

function ChoiceList({ choices, onChoose }: ChoiceListProps) {
  if (choices.length === 0) return null;

  return (
    <div
      className="space-y-2 rounded-[3px]"
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
  );
}

export default ChoiceList;
