import { MessageBubble } from "@/components/MessageBubble";
import { QuickReplyButton } from "@/components/QuickReplyButton";
import { Avatar } from "./Avatar";
import { ThumbsUp, ThumbsDown, Forward, RefreshCw } from "lucide-react";
export const ChatMessage = ({
  message,
  isLatest,
  showYesNo,
  showSkip,
  showRetry,
  onRetry,
  onButtonClick,
}) => {
  const isBot = message?.sender === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex items-start gap-2 max-w-[80%] ${!isBot ? "flex-row-reverse" : ""}`}
      >
        <Avatar type={message?.sender} />
        <MessageBubble message={message}>
          {isBot && isLatest && (showYesNo || showSkip) && (
            <>
              {showYesNo && (
                <div className="flex gap-2 mt-2">
                  <QuickReplyButton
                    onClick={() => onButtonClick("Yes")}
                    variant="yes"
                    icon={ThumbsUp}
                  >
                    Yes
                  </QuickReplyButton>
                  <QuickReplyButton
                    onClick={() => onButtonClick("No")}
                    variant="no"
                    icon={ThumbsDown}
                  >
                    No
                  </QuickReplyButton>
                </div>
              )}
              {showSkip && (
                <div className="flex gap-2 mt-2">
                  <QuickReplyButton
                    onClick={() => onButtonClick("skip")}
                    variant="skip"
                    icon={Forward}
                  >
                    Skip
                  </QuickReplyButton>
                </div>
              )}
              {showRetry && (
                <div className="flex gap-2 mt-2">
                  <QuickReplyButton
                    onClick={onRetry}
                    variant="retry"
                    icon={RefreshCw}
                  >
                    Retry
                  </QuickReplyButton>
                </div>
              )}
            </>
          )}
        </MessageBubble>
      </div>
    </div>
  );
};
