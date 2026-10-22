export function MetricCard({ title, value, icon: Icon, LINE }) {
  return (
    <div
      className="rounded-2xl border p-4 sm:p-5 shadow-[0_2px_12px_rgba(23,32,28,0.04)]"
      style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-[10px] tracking-wider uppercase text-[#66706B]">{title}</p>
        <div className="w-7 h-7 rounded-lg bg-[#EEF0F7] flex items-center justify-center text-[#465B9E]">
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="font-display text-xl sm:text-2xl font-semibold text-[#17201C]">{value}</div>
    </div>
  );
}
