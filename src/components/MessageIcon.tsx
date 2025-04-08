import { EnvelopeIcon } from "@heroicons/react/24/outline";

interface MessageIconProps {
  unreadCount: number;
  className?: string;
}

const MessageIcon: React.FC<MessageIconProps> = ({ unreadCount, className }) => {
  return (
    <div className={`relative w-8 h-8 ${className ?? ""}`}>
      <EnvelopeIcon className="w-8 h-8 text-gray-700" />

      {unreadCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center leading-none">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </div>
  );
};

export default MessageIcon;