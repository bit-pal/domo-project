import React from 'react';
import { FaUser, FaCrown, FaWallet, FaHistory } from 'react-icons/fa';

interface UserAvatarProps {
  publicKey: string;
  avatarUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ publicKey, avatarUrl, isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const menuItems = [
    {
      icon: FaUser,
      label: 'My Profile',
      onClick: () => console.log('Profile clicked'),
    },
    {
      icon: FaCrown,
      label: 'My Achievements',
      onClick: () => console.log('Achievements clicked'),
    },
    {
      icon: FaWallet,
      label: 'Transaction History',
      onClick: () => console.log('Transactions clicked'),
    },
    {
      icon: FaHistory,
      label: 'Activity Log',
      onClick: () => console.log('Activity clicked'),
    }
  ];

  return (
    <div className="relative">
          <div className="absolute right-0 mt-2 w-64 bg-[#1A1A1A] rounded-lg shadow-lg border border-white/10 z-50">
            <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400">
                    <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                    <FaUser className="w-5 h-5 text-white" />
                    </div>
                </div>
                <div>
                <div className="text-sm font-medium text-white">
                    {shortenAddress(publicKey)}
                </div>
                <div className="text-xs text-gray-400">Level 5 Boss</div>
                </div>
            </div>
          </div>

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
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-white"
                >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                </button>
                );
            })}
            </div>
        </div>
    </div>
  );
};

export default UserAvatar;