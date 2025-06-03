import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface TopBoss {
  id: number;
  name: string;
  score: number;
  avatar: string;
}

const Invitations: React.FC = () => {
  const topBosses: TopBoss[] = [
    { id: 1, name: 'Dan', score: 325.4, avatar: '👨‍💼' },
    { id: 2, name: 'Marti', score: 127.8, avatar: '👩‍💼' },
    { id: 3, name: 'KM', score: 119.3, avatar: '👨‍💼' },
    { id: 4, name: 'Alex', score: 5, avatar: '👨‍💼' },
    { id: 5, name: 'Asmod', score: 5, avatar: '👨‍💼' },
  ];

  const formatTokenAmount = (text: string) => {
    return text.split('$DOMO').map((part, index, array) => (
      <React.Fragment key={index}>
        <span className="text-gray-300">{part}</span>
        {index < array.length - 1 && <span className="text-blue-400">$DOMO</span>}
      </React.Fragment>
    ));
  };

  return (
    <div className="bg-[#0F1123] rounded-lg p-6">
      <h2 className="text-xl text-gray-300 mb-6">Invitations & Referrals</h2>

      {/* Invite Friends Section */}
      <div className="bg-[#151835] rounded-lg p-4 mb-6">
        <h3 className="text-gray-300 font-medium mb-4">Invite friends</h3>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value="referrallink"
            readOnly
            className="flex-1 bg-[#0F1123] text-gray-300 px-3 py-2 rounded"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors">
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-400 text-sm">
          +1 slot for each invited friend who buys a starter pack
        </p>
      </div>

      {/* Top HR Bosses Section */}
      <div className="bg-[#151835] rounded-lg p-4">
        <h3 className="text-gray-300 font-medium mb-4">TOP HR BOSSES THIS WEEK</h3>
        <div className="space-y-3">
          {topBosses.map(boss => (
            <div key={boss.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{boss.avatar}</span>
                <span className="text-gray-300">{boss.name}</span>
              </div>
              <span className="text-blue-400 font-medium">{boss.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invitations; 