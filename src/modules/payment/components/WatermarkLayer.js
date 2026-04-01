export const WatermarkLayer = () => (
  <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden select-none opacity-[0.07]">
    <svg className="w-full h-full">
      <defs>
        <pattern
          id="watermark-pattern"
          width="250"
          height="150"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-30)"
        >
          <text
            x="0"
            y="50"
            className="text-[14px] font-black fill-slate-900 uppercase tracking-[0.2em]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            NextCV Premium
          </text>
          <text
            x="125"
            y="125"
            className="text-[14px] font-black fill-slate-900 uppercase tracking-[0.2em]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            NextCV Premium
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#watermark-pattern)" />
    </svg>
  </div>
);
