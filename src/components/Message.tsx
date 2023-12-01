import { formatMessageTime } from "../libs/utils";
import Avatar from "./Avatar";

function Message({ message, reversed }: { message: any; reversed: boolean }) {
  return (
    <div
      className={`flex gap-x-2 items-start ${reversed && "flex-row-reverse"}`}
    >
      <Avatar avatar={message.author.avatar || undefined} size="lg" />
      <span>{message.author.username}</span>
      <div
        className={`flex items-end gap-x-2 ${reversed && "flex-row-reverse"}`}
      >
        <div className="px-2 py-1 rounded-lg border bg-blue-300 dark:bg-blue-500 max-w-sm">
          <span className="break-all">{message.payload}</span>
        </div>
        <span className="text-xs text-gray-400">
          {formatMessageTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}

export default Message;
