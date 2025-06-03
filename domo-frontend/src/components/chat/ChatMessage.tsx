import React from 'react';

interface ChatMessageProps {
  message: string;
  timestamp: string;
  isUser: boolean;
  avatar?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  timestamp,
  isUser,
  avatar = '👤'
}) => {
  return (
    <div className={`flex items-start gap-2 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full text-sm">
        {avatar}
      </div>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
            isUser
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-[#151835] text-gray-200 rounded-bl-none'
          }`}
        >
          {message}
        </div>
        <span className="text-xs text-gray-500 mt-1">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessage; 