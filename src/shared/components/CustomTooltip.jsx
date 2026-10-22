export function CustomTooltip({ active, payload, label, LINE, prefix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl border px-3 py-2 shadow-lg"
      style={{ backgroundColor: "#FFFFFF", borderColor: LINE }}
    >
      {label && <p className="font-mono text-[10px] tracking-wider mb-1 text-[#66706B]">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="font-sans text-sm font-semibold text-[#17201C]">
          {p.name ? `${p.name}: ` : ""}
          {prefix}
          {p.value}
        </p>
      ))}
    </div>
  );
}
