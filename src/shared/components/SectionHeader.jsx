import { Download } from "lucide-react";

export function SectionHeader({ icon: Icon, title, onExport, LINE }) {
  return (
    <div
      className="flex items-center justify-between mb-5 pb-3 border-b"
      style={{ borderColor: LINE }}
    >
      <h2 className="font-sans text-sm font-semibold tracking-wide flex items-center gap-2 text-[#17201C]">
        <Icon className="h-4 w-4 text-[#465B9E]" />
        {title}
      </h2>
      <button
        onClick={onExport}
        className="flex items-center gap-1.5 border border-[#E3E2DC] rounded-xl px-3 py-1.5 font-sans text-xs font-medium transition hover:bg-[#F1F0EB] text-[#17201C] bg-white shadow-xs"
      >
        <Download className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Export</span>
      </button>
    </div>
  );
}
