/**
 * ResultsScreen — final panel
 * Full-screen background image with archetype text at bottom
 */

import { PALETTE } from "../styles/palette";

interface ResultsScreenProps {
  variables: Record<string, unknown>;
  onReset: () => void;
}

function ResultsScreen({ variables, onReset }: ResultsScreenProps) {
  const sovereignSymbiotic = Number(variables.sovereign_symbiotic ?? 8);
  const builderWitness = Number(variables.builder_witness ?? 8);

  const isSovereign = sovereignSymbiotic < 8;
  const isBuilder = builderWitness < 8;

  const archetype = isSovereign && isBuilder ? "The Craftsperson"
    : isSovereign && !isBuilder ? "The Chronicler"
    : !isSovereign && isBuilder ? "The Listener-Worker"
    : "The Philosopher";

  const description = isSovereign && isBuilder
    ? "Independent, skilled, useful on your own terms."
    : isSovereign && !isBuilder
    ? "Clear-eyed observer, documenting what's happening."
    : !isSovereign && isBuilder
    ? "Deep partnership with AI, building the new thing."
    : "Changed by the encounter, thinking thoughts that weren't possible before.";

  // TODO: swap to archetype-specific ending backgrounds
  const backgroundImage = "/backgrounds/test_walk_home.jpg";

  return (
    <div
      className="min-h-screen relative flex flex-col justify-end"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient fade from image to text area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 40%, ${PALETTE.charcoal} 100%)`,
        }}
      />

      {/* Text overlay at bottom */}
      <div className="relative z-10 px-8 pb-10 pt-20">
        <h1
          style={{
            fontFamily: "'Bitter', Georgia, serif",
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 800,
            color: PALETTE.cream,
            lineHeight: 1.1,
            marginBottom: "10px",
          }}
        >
          {archetype}
        </h1>

        <p
          style={{
            fontFamily: "'Bitter', Georgia, serif",
            fontSize: "clamp(15px, 2vw, 18px)",
            lineHeight: 1.6,
            color: PALETTE.cream,
            opacity: 0.8,
            maxWidth: "480px",
            marginBottom: "28px",
          }}
        >
          {description}
        </p>

        <button
          onClick={onReset}
          className="cursor-pointer transition-all duration-[80ms]
            hover:translate-x-[-1px] hover:translate-y-[-1px]
            active:translate-x-[2px] active:translate-y-[2px]"
          style={{
            fontFamily: "'Bitter', Georgia, serif",
            fontWeight: 700,
            fontSize: "14px",
            color: PALETTE.cream,
            backgroundColor: PALETTE.terraCotta,
            border: `3px solid ${PALETTE.cream}`,
            borderRadius: "4px",
            padding: "10px 28px",
            boxShadow: `4px 4px 0 rgba(0,0,0,0.4)`,
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default ResultsScreen;
