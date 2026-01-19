export const MessageBubble = ({ message, children }) => {
  const safeMessage = message || {};
  const { sender = "bot", text = "" } = safeMessage;
  const isBot = sender === "bot";
  const bubbleStyle = isBot
    ? "bg-white border border-gray-200 text-gray-800"
    : "bg-linear-to-r from-blue-500 to-purple-600 text-white";

  return (
    <div>
      <div className={`px-4 py-3 rounded-2xl shadow-sm ${bubbleStyle}`}>
        <p className="text-sm leading-relaxed">{text}</p>
      </div>
      {children}
    </div>
  );
};
