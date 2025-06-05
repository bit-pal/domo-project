import React from 'react';
import { FaCog, FaUser, FaBell, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa';

interface SettingsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      icon: FaUser,
      label: 'Profile Settings',
      onClick: () => console.log('Profile settings clicked'),
    },
    {
      icon: FaBell,
      label: 'Notification Preferences',
      onClick: () => console.log('Notifications clicked'),
    },
    {
      icon: FaShieldAlt,
      label: 'Security',
      onClick: () => console.log('Security clicked'),
    },
    {
      icon: FaQuestionCircle,
      label: 'Help & Support',
      onClick: () => console.log('Help clicked'),
    },
  ];

  return (
    <div className="absolute right-0 mt-2 w-64 bg-[#1A1A1A] rounded-lg shadow-lg border border-white/10 z-50">
      <div className="py-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                onClose();
              }}
              className="w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-white/5 transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsDropdown;