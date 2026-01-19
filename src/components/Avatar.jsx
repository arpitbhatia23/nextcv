import { Sparkles, CheckCircle } from "lucide-react";

export const Avatar = ({ type }) => {
  const isBot = type === "bot";
  const bgColor = isBot
    ? "bg-linear-to-br from-blue-500 to-purple-600"
    : "bg-linear-to-br from-green-500 to-emerald-600";
  const Icon = isBot ? Sparkles : CheckCircle;

  return (
    <div
      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${bgColor}`}
    >
      <Icon className="text-white" size={16} />
    </div>
  );
};
