/**
 * Placeholder Substack signup embed.
 * TODO: Replace SUBSTACK_URL with actual publication URL once decided.
 */

// Placeholder - replace with actual Substack publication URL
const SUBSTACK_URL = "https://yourpublication.substack.com";

function SubstackSignup() {
  return (
    <div className="w-full max-w-sm">
      <p className="text-sm opacity-70 mb-3 text-center">
        Subscribe for updates
      </p>
      <iframe
        src={`${SUBSTACK_URL}/embed`}
        width="100%"
        height="150"
        style={{ border: "none", background: "transparent" }}
        frameBorder="0"
        scrolling="no"
        title="Substack signup"
      />
    </div>
  );
}

export default SubstackSignup;
