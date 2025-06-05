import React, { useState } from 'react';
import { FaBell, FaCheck } from 'react-icons/fa';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Task Completed',
      message: 'Your employee John completed the assigned task.',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      title: 'Storage Update',
      message: 'Your storage capacity has been upgraded.',
      timestamp: '1 day ago',
      read: false,
    },
    {
      id: '3',
      title: 'New Achievement',
      message: 'You\'ve reached Level 5! New rewards unlocked.',
      timestamp: '2 days ago',
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-[#1A1A1A] rounded-lg shadow-lg border border-white/10 z-50">
      <div className="p-4 border-b border-white/10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Notifications</h3>
          <button
            onClick={markAllAsRead}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Mark all as read
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-white/10 hover:bg-white/5 transition-colors ${
                notification.read ? 'opacity-70' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                  <span className="text-xs text-gray-500 mt-2 block">{notification.timestamp}</span>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-3 text-center border-t border-white/10">
        <button className="text-sm text-purple-400 hover:text-purple-300">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;