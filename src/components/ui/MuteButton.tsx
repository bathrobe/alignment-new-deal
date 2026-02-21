/**
 * MuteButton — round toggle, terra cotta when on, cream when off
 */

import { PALETTE } from "../../styles/palette";

interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

export function MuteButton({ isMuted, onToggle }: MuteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center w-7 h-7 rounded-full cursor-pointer transition-all duration-[80ms]"
      style={{
        backgroundColor: isMuted ? PALETTE.cream : PALETTE.terraCotta,
        color: isMuted ? PALETTE.slate : PALETTE.cream,
        border: `2px solid ${PALETTE.charcoal}`,
        boxShadow: `2px 2px 0 rgba(0,0,0,0.3)`,
      }}
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
    >
      {isMuted ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
