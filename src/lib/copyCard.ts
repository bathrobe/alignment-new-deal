import { domToPng } from "modern-screenshot";

const SCREENSHOT_CONFIG = {
  backgroundColor: "#F5F0E6", // TODO: customize to match your results screen
  scale: 2,
  font: {
    preferredFormat: "woff2" as const,
  },
};

/**
 * Captures a DOM element as a PNG and copies it to the clipboard.
 * Returns true on success, false on failure.
 */
export async function copyElementAsImage(
  element: HTMLElement
): Promise<boolean> {
  try {
    const dataUrl = await domToPng(element, SCREENSHOT_CONFIG);

    // Fetch and create a strictly-typed Blob
    const res = await fetch(dataUrl);
    const blob = await res.blob();

    // Explicitly enforce the MIME type in a new Blob
    const pngBlob = new Blob([blob], { type: "image/png" });

    const item = new ClipboardItem({ "image/png": pngBlob });
    await navigator.clipboard.write([item]);

    return true;
  } catch (error) {
    console.error("[copyCard] Failed:", error);
    return false;
  }
}

/**
 * Downloads a DOM element as a PNG image.
 */
export async function downloadElementAsImage(
  element: HTMLElement,
  filename = "character-card.png"
): Promise<boolean> {
  try {
    const dataUrl = await domToPng(element, SCREENSHOT_CONFIG);

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();

    return true;
  } catch (error) {
    console.error("[downloadCard] Failed:", error);
    return false;
  }
}
