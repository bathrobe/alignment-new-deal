const SAVE_KEY = "visual-novel-save"; // TODO: customize for your project

export interface GameSave {
  inkState: string;
  background?: string;
  textHistory?: string[];
}

export function saveGame(inkState: string, background?: string, textHistory?: string[]): void {
  const save: GameSave = { inkState, background, textHistory };
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

export function loadGame(): GameSave | null {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as GameSave;
  } catch {
    // Handle old format (raw ink state string) for backwards compatibility
    return { inkState: raw };
  }
}

export function hasSavedGame(): boolean {
  return localStorage.getItem(SAVE_KEY) !== null;
}

export function clearSave(): void {
  localStorage.removeItem(SAVE_KEY);
}
