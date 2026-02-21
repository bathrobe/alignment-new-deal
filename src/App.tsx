import { useEffect, useState, useRef } from "react";
import { useInkStory } from "./hooks/useInkStory";
import { useAudio, type MusicTrack } from "./hooks/useAudio";
import GameView from "./components/GameView";
import TitleScreen from "./components/TitleScreen";
import { saveGame, loadGame, hasSavedGame, clearSave } from "./lib/gameSave";
import storyJson from "./story/episode1.json";


// Map mood tags to chapter labels - customize for your story
const PHASE_LABELS: Record<string, string> = {
  intro: "Introduction",
  // Add your chapter/phase labels here
};

type GameState = "menu" | "playing";

function App() {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [hasSave, setHasSave] = useState(false);
  const previousBackgroundRef = useRef<string | undefined>(undefined);
  const previousMoodRef = useRef<string | undefined>(undefined);

  const { playMusic, fadeOutMusic, playSfx, preload, isMuted, toggleMute } = useAudio();

  const {
    textHistory,
    newBatchStartIndex,
    choices,
    tags,
    choose,
    reset,
    continue: continueStory,
    isEnded,
    hasPendingContent,
    getState,
    loadState,
  } = useInkStory(storyJson);

  // Check for saved game on mount
  useEffect(() => {
    setHasSave(hasSavedGame());
  }, []);

  // Preload audio files
  useEffect(() => {
    preload();
  }, [preload]);

  // Change music when mood tag changes
  useEffect(() => {
    if (gameState !== "playing") return;

    const currentMood = tags.mood;
    if (currentMood && currentMood !== previousMoodRef.current) {
      const isFirstMood = previousMoodRef.current === undefined;
      previousMoodRef.current = currentMood;

      if (!isFirstMood) {
        // Phase transition: fade out → jingle → fade in new music
        fadeOutMusic()
          .then(() => playSfx("phase-transition"))
          .then(() => playMusic(currentMood as MusicTrack))
          .catch((err) => console.error("Audio transition failed:", err));
      } else {
        // First mood: just start music
        playMusic(currentMood as MusicTrack);
      }
    }
  }, [tags.mood, gameState, playMusic, fadeOutMusic, playSfx]);

  // Auto-save when background changes (scene transition)
  useEffect(() => {
    if (gameState !== "playing") return;
    if (hasPendingContent) return;

    const currentBackground = tags.background;
    if (
      currentBackground &&
      currentBackground !== previousBackgroundRef.current
    ) {
      previousBackgroundRef.current = currentBackground;
      saveGame(getState(), currentBackground, textHistory);
      setHasSave(true);
    }
  }, [tags.background, gameState, getState, hasPendingContent, textHistory]);

  function handleNewGame() {
    clearSave();
    setHasSave(false);
    reset();
    setGameState("playing");
  }

  function handleContinue() {
    const save = loadGame();
    if (save) {
      loadState(save.inkState, save.background, save.textHistory);
      setGameState("playing");
    }
  }

  function handleReturnToMenu() {
    setGameState("menu");
    setHasSave(hasSavedGame());
  }

  function handleChoose(index: number) {
    playSfx("click-soft");
    choose(index);
  }

  // Menu screen
  if (gameState === "menu") {
    return (
      <TitleScreen
        onNewGame={handleNewGame}
        onContinue={handleContinue}
        hasSave={hasSave}
      />
    );
  }

  // Game view
  return (
    <GameView
      backgroundName={tags.background}
      textHistory={textHistory}
      newBatchStartIndex={newBatchStartIndex}
      choices={choices}
      onChoose={handleChoose}
      onContinue={continueStory}
      isEnded={isEnded}
      hasPendingContent={hasPendingContent}
      chapterLabel={tags.mood ? PHASE_LABELS[tags.mood] : undefined}
      isMuted={isMuted}
      onToggleMute={toggleMute}
      onReturnToMenu={handleReturnToMenu}
    />
  );
}

export default App;
