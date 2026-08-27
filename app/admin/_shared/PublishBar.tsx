export default function PublishBar({
  onPublish,
  publishing,
  result,
}: {
  onPublish: () => void;
  publishing: boolean;
  result: "success" | "error" | null;
}) {
  return (
    <div className="flex gap-[10px] items-center mt-6">
      <button
        type="button"
        onClick={onPublish}
        disabled={publishing}
        className="bg-[#181818] text-white rounded-md px-5 py-[10px] text-[13px] font-semibold disabled:opacity-60"
      >
        {publishing ? "Publishing…" : "Publish"}
      </button>
      {result === "success" && <span className="text-xs text-[#2a7a3e]">Published — live in about a minute.</span>}
      {result === "error" && <span className="text-xs text-[#b33]">Something went wrong publishing. Try again.</span>}
    </div>
  );
}
