export const PostmarkBadge = ({ status }) => {
  const isPaid = status === "paid";

  const label = isPaid ? "UNLOCKED" : "DRAFT";
  const subLabel = isPaid ? "PAID" : "PENDING";

  const ring = isPaid ? "#465B9E" : "#8A908B";

  return (
    <div
      className="
        absolute
        -top-3
        -right-3
        flex
        h-16
        w-16
        rotate-6
        select-none
        items-center
        justify-center
        rounded-full
        bg-white
      "
      style={{
        border: `1.5px dashed ${ring}`,
        color: ring,
      }}
      aria-label={isPaid ? "Resume unlocked and paid" : "Resume draft with payment pending"}
    >
      <div className="text-center leading-none">
        <div
          className="
            font-mono
            text-[8px]
            font-medium
            tracking-[0.12em]
          "
        >
          {label}
        </div>

        <div
          className="mx-auto my-1 h-px w-6"
          style={{
            backgroundColor: ring,
          }}
        />

        <div
          className="
            font-mono
            text-[7px]
            tracking-[0.12em]
            text-[#66706B]
          "
        >
          {subLabel}
        </div>
      </div>
    </div>
  );
};
