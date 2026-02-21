/**
 * ResultsScreen — bespoke ending screen
 * Full-page comic panel style, same design language as sidebar
 */

import { PALETTE } from "../styles/palette";

interface ResultsScreenProps {
  variables: Record<string, unknown>;
  onReset: () => void;
}

function ResultsScreen({ variables, onReset }: ResultsScreenProps) {
  // TODO: derive ending archetype from axis variables
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

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: PALETTE.slate }}
    >
      <div
        className="w-full max-w-lg relative"
        style={{
          backgroundColor: PALETTE.cream,
          border: `4px solid ${PALETTE.charcoal}`,
          borderRadius: "2px",
          boxShadow: `8px 8px 0 ${PALETTE.charcoal}`,
        }}
      >
        {/* Halftone overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${PALETTE.charcoal} 0.6px, transparent 0.6px)`,
            backgroundSize: "6px 6px",
            opacity: 0.035,
          }}
        />

        {/* Top bar */}
        <div
          className="relative z-10 px-4 py-2 flex items-center justify-center"
          style={{
            backgroundColor: PALETTE.slate,
            borderBottom: `3px solid ${PALETTE.charcoal}`,
          }}
        >
          <span
            style={{
              fontFamily: "'Bitter', Georgia, serif",
              fontSize: "12px",
              fontWeight: 800,
              color: PALETTE.gold,
              textTransform: "uppercase" as const,
              letterSpacing: "3px",
            }}
          >
            The End
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 py-10 text-center">
          {/* Archetype title */}
          <h1
            style={{
              fontFamily: "'Bitter', Georgia, serif",
              fontSize: "32px",
              fontWeight: 800,
              color: PALETTE.charcoal,
              lineHeight: 1.1,
              marginBottom: "12px",
            }}
          >
            {archetype}
          </h1>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Bitter', Georgia, serif",
              fontSize: "15px",
              lineHeight: 1.7,
              color: PALETTE.slate,
              maxWidth: "360px",
              margin: "0 auto 32px",
            }}
          >
            {description}
          </p>

          {/* Divider */}
          <div
            className="mx-auto mb-8"
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: PALETTE.terraCotta,
            }}
          />

          {/* Axes readout */}
          <div
            className="mb-10 mx-auto text-left"
            style={{
              maxWidth: "280px",
              padding: "14px",
              border: `2px solid ${PALETTE.charcoal}`,
              borderRadius: "3px",
              boxShadow: `3px 3px 0 ${PALETTE.charcoal}`,
            }}
          >
            <AxisBar
              label="Sovereign"
              labelRight="Symbiotic"
              value={sovereignSymbiotic}
            />
            <div className="h-3" />
            <AxisBar
              label="Builder"
              labelRight="Witness"
              value={builderWitness}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-3">
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
                border: `3px solid ${PALETTE.charcoal}`,
                borderRadius: "4px",
                padding: "10px 28px",
                boxShadow: `4px 4px 0 ${PALETTE.charcoal}`,
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Simple axis bar — flat, comic style */
function AxisBar({
  label,
  labelRight,
  value,
}: {
  label: string;
  labelRight: string;
  value: number;
}) {
  const percent = Math.max(0, Math.min(100, (value / 16) * 100));

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: PALETTE.charcoal,
            textTransform: "uppercase" as const,
            letterSpacing: "1px",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: PALETTE.charcoal,
            textTransform: "uppercase" as const,
            letterSpacing: "1px",
          }}
        >
          {labelRight}
        </span>
      </div>
      <div
        style={{
          height: "8px",
          backgroundColor: PALETTE.creamDark,
          border: `2px solid ${PALETTE.charcoal}`,
          borderRadius: "1px",
          position: "relative",
        }}
      >
        {/* Marker */}
        <div
          style={{
            position: "absolute",
            left: `${percent}%`,
            top: "-3px",
            width: "10px",
            height: "14px",
            backgroundColor: PALETTE.terraCotta,
            border: `2px solid ${PALETTE.charcoal}`,
            borderRadius: "2px",
            transform: "translateX(-50%)",
          }}
        />
      </div>
    </div>
  );
}

export default ResultsScreen;
