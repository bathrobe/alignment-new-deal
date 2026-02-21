import SubstackSignup from "./SubstackSignup";
import ShareModal from "./ShareModal";
import { useState } from "react";

interface ResultsScreenProps {
  /** Raw Ink variable values - customize based on your story's variables */
  variables: Record<string, unknown>;
  onReset: () => void;
}

/**
 * Placeholder results screen.
 * TODO: Customize this for your story's ending.
 * Currently just displays raw Ink variables.
 */
function ResultsScreen({ variables, onReset }: ResultsScreenProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl font-bold text-center">The End</h1>

        <p className="text-center text-gray-400">
          Story complete. Customize this screen for your project.
        </p>

        {/* Raw variable dump - replace with your results UI */}
        <div className="bg-gray-800 p-4 rounded font-mono text-sm">
          <h2 className="text-gray-400 mb-2">Ink Variables:</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(variables, null, 2)}
          </pre>
        </div>

        <div className="flex flex-col items-center gap-4 pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 border border-white/30 rounded hover:bg-white/10"
          >
            Share
          </button>

          <button
            onClick={onReset}
            className="text-sm opacity-70 hover:opacity-100 underline"
          >
            Start over
          </button>
        </div>
      </div>

      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={() => {}}
        downloadStatus="idle"
      >
        <SubstackSignup />
      </ShareModal>
    </div>
  );
}

export default ResultsScreen;
