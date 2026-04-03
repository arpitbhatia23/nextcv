export const WatermarkLayer = () => (
  <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.06] select-none">
    <div className="flex flex-wrap content-center justify-center gap-28 w-[300%] h-[300%] -rotate-45 transform origin-center">
      {Array.from({ length: 30 }).map((_, i) => (
        <span
          key={i}
          className="text-lg md:text-xl font-black text-gray-950 whitespace-nowrap uppercase"
        >
          NextCV Preview
        </span>
      ))}
    </div>
  </div>
);
