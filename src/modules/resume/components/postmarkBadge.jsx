export const PostmarkBadge = ({ status }) => {
  const isPaid = status === "paid";
  const label = isPaid ? "UNLOCKED" : "DRAFT";
  const ring = isPaid ? "#0F6E63" : "#B3382C";
  return (
    <div
      className="absolute -top-3 -right-3 w-16 h-16 rounded-full flex items-center justify-center rotate-6 select-none"
      style={{
        border: `1.5px dashed ${ring}`,
        color: ring,
        backgroundColor: "#FFFFFF",
      }}
    >
      <div className="text-center leading-none">
        <div className="font-mono text-[8px] tracking-wider">{label}</div>
        <div className="w-6 h-px mx-auto my-0.5" style={{ backgroundColor: ring }} />
        <div className="font-mono text-[7px] tracking-wider opacity-70">
          {isPaid ? "PAID" : "PENDING"}
        </div>
      </div>
    </div>
  );
};
