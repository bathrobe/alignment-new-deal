import { useState, useCallback, useMemo, useRef } from "react";
import { Story } from "inkjs";
import { parseTags } from "../lib/tags";

export interface InkChoice {
  text: string;
  index: number;
}

export interface ParsedTags {
  background?: string;
  show?: string;
  mood?: string;
  [key: string]: string | undefined;
}

/**
 * Wrapper for reading Ink variables.
 * Use getVariable("name") to read a specific variable.
 */
export interface VariableReader {
  getVariable: (name: string) => unknown;
}

export interface UseInkStoryReturn {
  textHistory: string[];
  newBatchStartIndex: number;
  choices: InkChoice[];
  tags: ParsedTags;
  variables: VariableReader;
  continue: () => void;
  choose: (index: number) => void;
  reset: () => void;
  isEnded: boolean;
  hasPendingContent: boolean; // True when there's content waiting after a scene change
  getState: () => string; // Serialize current Ink state
  loadState: (state: string, background?: string, savedTextHistory?: string[]) => void;
  jumpTo: (knotName: string) => void; // Dev tool: jump to any knot
}

export function useInkStory(storyJson: object): UseInkStoryReturn {
  const story = useMemo(() => new Story(storyJson), [storyJson]);

  const [textHistory, setTextHistory] = useState<string[]>([]);
  const [newBatchStartIndex, setNewBatchStartIndex] = useState<number>(0);
  const [choices, setChoices] = useState<InkChoice[]>([]);
  const [tags, setTags] = useState<ParsedTags>({});
  const [isEnded, setIsEnded] = useState(false);
  const previousBackgroundRef = useRef<string | undefined>(undefined);
  const previousMoodRef = useRef<string | undefined>(undefined);

  // Pending content: text/tags waiting to be shown after a scene transition
  const [pendingText, setPendingText] = useState<string[]>([]);
  const [pendingTags, setPendingTags] = useState<ParsedTags>({});
  const [pendingChoices, setPendingChoices] = useState<InkChoice[]>([]);

  const continueStory = useCallback(() => {
    // ─────────────────────────────────────────────────────────────────────────
    // CASE 1: Pending content from a previous scene transition
    // ─────────────────────────────────────────────────────────────────────────
    // When we hit a background change mid-flow, we store the "after" content
    // as pending. On the next continue(), we display it instead of reading
    // more from Ink. This creates a natural pause at scene boundaries.
    if (pendingText.length > 0) {
      setTextHistory(pendingText);
      setNewBatchStartIndex(0);
      setTags(pendingTags);
      setChoices(pendingChoices);
      if (pendingTags.background) {
        previousBackgroundRef.current = pendingTags.background;
      }
      if (pendingTags.mood) {
        previousMoodRef.current = pendingTags.mood;
      }
      setPendingText([]);
      setPendingTags({});
      setPendingChoices([]);
      setIsEnded(!story.canContinue && pendingChoices.length === 0);
      return;
    }

    if (!story.canContinue) return;

    // ─────────────────────────────────────────────────────────────────────────
    // CASE 2: Read new content from Ink, watching for background changes
    // ─────────────────────────────────────────────────────────────────────────
    // We consume all available text until either:
    //   a) Ink runs out of content (hits a choice or end)
    //   b) We detect a # background: tag change (scene transition)
    //
    // If (b), we split content into "before" and "after" the change.
    // "Before" displays now; "after" becomes pending for next continue().

    const startingBackground = previousBackgroundRef.current;
    let currentBackground = startingBackground;
    let textBatch: string[] = [];         // Text for current scene
    let tagsBeforeChange: string[] = [];  // Tags for current scene
    let tagsAfterChange: string[] = [];   // Tags for next scene (if bg changes)
    let overflowText: string[] = [];      // Text for next scene (if bg changes)
    let hitBackgroundChange = false;

    // Read lines from Ink until we can't continue or hit a scene change
    while (story.canContinue) {
      const text = story.Continue();
      const lineTags = story.currentTags ?? [];
      const parsedLineTags = parseTags(lineTags);

      // Detect background change → split point
      if (!hitBackgroundChange && parsedLineTags.background && parsedLineTags.background !== currentBackground) {
        hitBackgroundChange = true;
        currentBackground = parsedLineTags.background;

        // This line and everything after goes to overflow (next scene)
        const lines = (text ?? '').split('\n').map(line => line.trim()).filter(line => line);
        overflowText.push(...lines);
        tagsAfterChange = tagsAfterChange.concat(lineTags);

        // Drain remaining content into overflow
        while (story.canContinue) {
          const moreText = story.Continue();
          const moreLines = (moreText ?? '').split('\n').map(line => line.trim()).filter(line => line);
          overflowText.push(...moreLines);
          tagsAfterChange = tagsAfterChange.concat(story.currentTags ?? []);
        }
        break;
      }

      // No scene change yet — accumulate into current batch
      tagsBeforeChange = tagsBeforeChange.concat(lineTags);
      const lines = (text ?? '').split('\n').map(line => line.trim()).filter(line => line);
      textBatch.push(...lines);
    }

    // Choices belong to wherever Ink stopped (end of overflow if bg changed)
    const currentChoices = story.currentChoices.map((choice) => ({
      text: choice.text,
      index: choice.index,
    }));

    // ─────────────────────────────────────────────────────────────────────────
    // CASE 2a: Background changed mid-flow
    // ─────────────────────────────────────────────────────────────────────────
    if (hitBackgroundChange) {
      if (textBatch.length > 0) {
        // Show "before" content now, store "after" as pending
        // Note: We capture textHistory.length before updating. This is safe because
        // continueStory is only called from discrete user events, so React will have
        // flushed any pending updates before this closure runs.
        const batchStartIndex = textHistory.length;
        setTextHistory(prev => [...prev, ...textBatch]);
        setNewBatchStartIndex(batchStartIndex);

        const parsedBeforeTags = parseTags(tagsBeforeChange);
        if (!parsedBeforeTags.background && startingBackground) {
          parsedBeforeTags.background = startingBackground;
        }
        if (!parsedBeforeTags.mood && previousMoodRef.current) {
          parsedBeforeTags.mood = previousMoodRef.current;
        }
        // Update mood ref if we got a new mood
        if (parsedBeforeTags.mood) {
          previousMoodRef.current = parsedBeforeTags.mood;
        }
        setTags(parsedBeforeTags);
        setChoices([]); // Hide choices until pending content is shown

        // Preserve mood in pending tags if not specified
        const parsedPendingTags = parseTags(tagsAfterChange);
        if (!parsedPendingTags.mood && previousMoodRef.current) {
          parsedPendingTags.mood = previousMoodRef.current;
        }
        setPendingText(overflowText);
        setPendingTags(parsedPendingTags);
        setPendingChoices(currentChoices);
        setIsEnded(false);
      } else {
        // No "before" content — jump straight to new scene
        const parsedAfterTags = parseTags(tagsAfterChange);
        previousBackgroundRef.current = parsedAfterTags.background;
        // Preserve mood
        if (parsedAfterTags.mood) {
          previousMoodRef.current = parsedAfterTags.mood;
        } else if (previousMoodRef.current) {
          parsedAfterTags.mood = previousMoodRef.current;
        }

        setTextHistory(overflowText);
        setNewBatchStartIndex(0);
        setTags(parsedAfterTags);
        setChoices(currentChoices);
        setIsEnded(!story.canContinue && currentChoices.length === 0);
      }
      return;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CASE 2b: No background change — normal continuation
    // ─────────────────────────────────────────────────────────────────────────
    const parsedTags = parseTags(tagsBeforeChange);
    const newBackground = parsedTags.background;
    const backgroundChanged = newBackground !== undefined && newBackground !== startingBackground;

    // Preserve previous background if no new one specified
    if (newBackground !== undefined) {
      previousBackgroundRef.current = newBackground;
    } else if (startingBackground) {
      parsedTags.background = startingBackground;
    }

    // Preserve previous mood if no new one specified
    if (parsedTags.mood !== undefined) {
      previousMoodRef.current = parsedTags.mood;
    } else if (previousMoodRef.current) {
      parsedTags.mood = previousMoodRef.current;
    }

    if (textBatch.length > 0) {
      if (backgroundChanged) {
        // New scene — replace text history
        setTextHistory(textBatch);
        setNewBatchStartIndex(0);
      } else {
        // Same scene — append to existing history
        const batchStartIndex = textHistory.length;
        setTextHistory(prev => [...prev, ...textBatch]);
        setNewBatchStartIndex(batchStartIndex);
      }
    }

    setTags(parsedTags);
    setChoices(currentChoices);
    setIsEnded(!story.canContinue && currentChoices.length === 0);
  }, [story, textHistory, pendingText, pendingTags, pendingChoices]);

  const choose = useCallback(
    (index: number) => {
      story.ChooseChoiceIndex(index);
      continueStory();
    },
    [story, continueStory]
  );

  const reset = useCallback(() => {
    story.ResetState();
    setTextHistory([]);
    setNewBatchStartIndex(0);
    setChoices([]);
    setTags({});
    setIsEnded(false);
    setPendingText([]);
    setPendingTags({});
    setPendingChoices([]);
    previousBackgroundRef.current = undefined;
    previousMoodRef.current = undefined;
    continueStory();
  }, [story, continueStory]);

  const getState = useCallback(() => {
    return story.state.toJson();
  }, [story]);

  // Dev tool: jump directly to a knot by name
  const jumpTo = useCallback((knotName: string) => {
    story.ChoosePathString(knotName);
    setTextHistory([]);
    setNewBatchStartIndex(0);
    setChoices([]);
    setTags({});
    setIsEnded(false);
    setPendingText([]);
    setPendingTags({});
    setPendingChoices([]);
    previousBackgroundRef.current = undefined;
    previousMoodRef.current = undefined;
    continueStory();
  }, [story, continueStory]);

  const loadState = useCallback((savedState: string, background?: string, savedTextHistory?: string[]) => {
    story.state.LoadJson(savedState);
    // Clear pending state
    setNewBatchStartIndex(0);
    setIsEnded(false);
    setPendingText([]);
    setPendingTags({});
    setPendingChoices([]);

    // Restore background if provided
    if (background) {
      setTags({ background });
      previousBackgroundRef.current = background;
    } else {
      setTags({});
      previousBackgroundRef.current = undefined;
    }
    // Mood will be picked up from story tags on next continue
    previousMoodRef.current = undefined;

    // If story can continue, process content normally
    if (story.canContinue) {
      setTextHistory([]);
      setChoices([]);
      continueStory();
    } else {
      // At a choice point - restore saved text and populate choices
      setTextHistory(savedTextHistory ?? []);
      const currentChoices = story.currentChoices.map((choice) => ({
        text: choice.text,
        index: choice.index,
      }));
      setChoices(currentChoices);
      setIsEnded(currentChoices.length === 0);
    }
  }, [story, continueStory]);

  // Provide a stable function to read variables on demand
  const variables: VariableReader = useMemo(
    () => ({
      getVariable: (name: string) => story.variablesState.$(name),
    }),
    [story]
  );

  return {
    textHistory,
    newBatchStartIndex,
    choices,
    tags,
    variables,
    continue: continueStory,
    choose,
    reset,
    isEnded,
    hasPendingContent: pendingText.length > 0,
    getState,
    loadState,
    jumpTo,
  };
}
