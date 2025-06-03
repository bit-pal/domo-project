import React, { useState, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulate receiving a new message
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 30000); // Simulate new message every 30 seconds when closed

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <>
      <ChatBubble
        unreadCount={unreadCount}
        isOpen={isOpen}
        onClick={handleToggleChat}
      />
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Chat; 