export const QuickReplyButton = ({
  onClick,
  variant = "default",
  icon: Icon,
  children,
}) => {
  const variants = {
    yes: "bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    no: "bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700",
    skip: "bg-linear-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 ${variants[variant]} text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all`}
    >
      <Icon size={16} />
      {children}
    </button>
  );
};
