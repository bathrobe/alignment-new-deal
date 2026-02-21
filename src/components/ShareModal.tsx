interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  downloadStatus: "idle" | "downloading";
  children?: React.ReactNode;
}

/**
 * Modal overlay for sharing options after copying the card.
 * Shows success message, download button, and Substack signup.
 */
function ShareModal({
  isOpen,
  onClose,
  onDownload,
  downloadStatus,
  children,
}: ShareModalProps) {
  if (!isOpen) return null;

  function handleBackdropClick(e: React.MouseEvent) {
    // Only close if clicking the backdrop itself, not the content
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl leading-none"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Success message */}
        <p className="text-center text-lg font-medium mb-6">
          Copied to clipboard!
        </p>

        {/* Download link */}
        <div className="text-center mb-6">
          <button
            onClick={onDownload}
            disabled={downloadStatus === "downloading"}
            className="text-sm text-gray-300 hover:text-white underline"
          >
            {downloadStatus === "downloading"
              ? "Generating..."
              : "Download as Image"}
          </button>
        </div>

        {/* Substack signup (passed as children) */}
        {children}
      </div>
    </div>
  );
}

export default ShareModal;
