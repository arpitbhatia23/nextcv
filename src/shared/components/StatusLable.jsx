export function StatusLabel({ children, positive = false }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-wide ${
        positive
          ? "border-emerald-200 text-emerald-800 bg-emerald-50"
          : "border-[#E3E2DC] text-[#5B625C] bg-[#F8F7F3]"
      }`}
    >
      {children}
    </span>
  );
}
