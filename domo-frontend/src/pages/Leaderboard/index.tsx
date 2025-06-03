import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import {
  TrophyIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/solid';

interface LeaderboardEntry {
  id: number;
  rank: number;
  username: string;
  avatar: string;
  score: number;
  level: number;
  change: number;
  reward: string;
}

const leaderboardData: LeaderboardEntry[] = [
  {
    id: 1,
    rank: 1,
    username: "CryptoKing",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=1",
    score: 15750,
    level: 42,
    change: 2,
    reward: "10,000 $DOMO + Legendary NFT"
  },
  {
    id: 2,
    rank: 2,
    username: "DomoMaster",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=2",
    score: 14200,
    level: 38,
    change: -1,
    reward: "7,500 $DOMO"
  },
  {
    id: 3,
    rank: 3,
    username: "BlockchainPro",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=3",
    score: 13800,
    level: 35,
    change: 1,
    reward: "5,000 $DOMO"
  },
  {
    id: 4,
    rank: 4,
    username: "Web3Warrior",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=4",
    score: 12500,
    level: 33,
    change: 0,
    reward: "2,500 $DOMO"
  },
  {
    id: 5,
    rank: 5,
    username: "MetaPlayer",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=5",
    score: 11900,
    level: 31,
    change: -2,
    reward: "1,000 $DOMO"
  }
];

const timeframes = ['daily', 'weekly', 'monthly', 'all-time'] as const;
type Timeframe = typeof timeframes[number];

const LeaderboardPage: React.FC = () => {
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('weekly');
  const [userRank] = useState({ rank: 156, score: 4200, change: 23 });

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400 text-2xl';
      case 2: return 'text-gray-300 text-xl';
      case 3: return 'text-amber-600 text-xl';
      default: return 'text-gray-300';
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-emerald-400';
    if (change < 0) return 'text-rose-400';
    return 'text-gray-400';
  };

  const formatTokenAmount = (text: string) => {
    return text.split('$DOMO').map((part, index, array) => (
      <React.Fragment key={index}>
        <span className="text-gray-300">{part}</span>
        {index < array.length - 1 && <span className="text-blue-400">$DOMO</span>}
      </React.Fragment>
    ));
  };

  return (
    <PageLayout
      title="Leaderboard"
      subtitle="Compete with other players and earn rewards"
    >
      {/* Timeframe Selection */}
      <div className="flex space-x-4 mb-8">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => setActiveTimeframe(timeframe)}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
              activeTimeframe === timeframe
                ? 'bg-blue-500 text-white'
                : 'bg-[#151835] text-gray-300 hover:bg-[#1a1f40] hover:text-white'
            }`}
          >
            <ClockIcon className="w-5 h-5" />
            <span className="capitalize">{timeframe}</span>
          </button>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#151835] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrophyIcon className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-medium text-gray-300">Your Rank</h3>
          </div>
          <p className="text-3xl font-bold text-white">#{userRank.rank}</p>
          <p className="text-sm text-gray-400 mt-1">Top 10%</p>
        </div>

        <div className="bg-[#151835] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <ChartBarIcon className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-gray-300">Your Score</h3>
          </div>
          <p className="text-3xl font-bold text-white">{userRank.score}</p>
          <p className="text-sm text-gray-400 mt-1">Points this {activeTimeframe}</p>
        </div>

        <div className="bg-[#151835] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <ArrowTrendingUpIcon className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-medium text-gray-300">Rank Change</h3>
          </div>
          <p className={`text-3xl font-bold ${getChangeColor(userRank.change)}`}>
            {userRank.change > 0 ? '+' : ''}{userRank.change}
          </p>
          <p className="text-sm text-gray-400 mt-1">Positions this {activeTimeframe}</p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#151835] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1f40]">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Player</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Level</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Score</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Change</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Reward</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1f40]">
              {leaderboardData.map((entry) => (
                <tr key={entry.id} className="hover:bg-[#1a1f40] transition-colors">
                  <td className="px-6 py-4">
                    <span className={`font-bold ${getRankColor(entry.rank)}`}>
                      #{entry.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={entry.avatar}
                        alt={entry.username}
                        className="w-8 h-8 rounded-full bg-[#1a1f40]"
                      />
                      <span className="text-gray-300 font-medium">{entry.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400">Lvl {entry.level}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 font-medium">{entry.score.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${getChangeColor(entry.change)}`}>
                      {entry.change > 0 ? '+' : ''}{entry.change}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {formatTokenAmount(entry.reward)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default LeaderboardPage; 