import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isUser: boolean;
  avatar?: string;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      timestamp: '12:00 PM',
      isUser: false,
      avatar: '🤖'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message! Our team will get back to you soon.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false,
        avatar: '🤖'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div
      className={`fixed bottom-20 right-4 w-96 bg-[#0F1123] rounded-lg shadow-xl transition-all duration-300 transform ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">DOMO Support</h3>
        <p className="text-sm text-gray-400">We typically reply within a few hours</p>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message.text}
            timestamp={message.timestamp}
            isUser={message.isUser}
            avatar={message.avatar}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-[#151835] text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow; 