import React from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface ChatBubbleProps {
  unreadCount: number;
  isOpen: boolean;
  onClick: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ unreadCount, isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-40 flex items-center justify-center w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transition-all duration-200 group"
    >
      {isOpen ? (
        <XMarkIcon className="w-6 h-6 text-white" />
      ) : (
        <>
          <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full">
              {unreadCount}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default ChatBubble; 