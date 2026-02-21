/**
 * MuteButton - Audio toggle
 * TODO: Customize styling for your project's look
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
      className="flex items-center justify-center w-8 h-8 rounded transition-opacity hover:opacity-80"
      style={{
        backgroundColor: isMuted ? PALETTE.secondary : PALETTE.primary,
        color: isMuted ? PALETTE.textMuted : PALETTE.surface,
      }}
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
    >
      {isMuted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
