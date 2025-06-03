import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { UserPlusIcon, ClipboardDocumentIcon, GiftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface ReferralReward {
  id: number;
  milestone: number;
  reward: string;
  claimed: boolean;
}

interface ReferralHistory {
  id: number;
  username: string;
  date: string;
  status: 'pending' | 'active' | 'rewarded';
  reward?: string;
}

const rewards: ReferralReward[] = [
  { id: 1, milestone: 5, reward: '100 $DOMO', claimed: true },
  { id: 2, milestone: 10, reward: '250 $DOMO', claimed: false },
  { id: 3, milestone: 25, reward: '1000 $DOMO + Special NFT', claimed: false },
  { id: 4, milestone: 50, reward: '5000 $DOMO + Legendary Item', claimed: false },
];

const history: ReferralHistory[] = [
  { id: 1, username: 'CryptoMaster', date: '2024-03-15', status: 'rewarded', reward: '20 $DOMO' },
  { id: 2, username: 'BlockchainPro', date: '2024-03-14', status: 'active' },
  { id: 3, username: 'Web3Enthusiast', date: '2024-03-13', status: 'pending' },
  { id: 4, username: 'DOMOPlayer', date: '2024-03-12', status: 'active' },
];

const ReferralsPage: React.FC = () => {
  const [referralLink] = useState('https://domo.game/ref/abc123');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rewarded': return 'text-green-500';
      case 'active': return 'text-blue-500';
      case 'pending': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <PageLayout 
      title="Referrals" 
      subtitle="Invite friends and earn rewards"
    >
      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#151835] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <UserPlusIcon className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium text-white">Total Referrals</h3>
          </div>
          <p className="text-3xl font-bold text-white">7</p>
          <p className="text-sm text-gray-400 mt-1">3 active, 4 pending</p>
        </div>

        <div className="bg-[#151835] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <GiftIcon className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-medium text-white">Total Earnings</h3>
          </div>
          <p className="text-3xl font-bold text-white">120 $DOMO</p>
          <p className="text-sm text-gray-400 mt-1">+45 $DOMO this week</p>
        </div>

        <div className="bg-[#151835] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardDocumentIcon className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-medium text-white">Your Referral Link</h3>
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 bg-[#0F1123] text-gray-300 px-3 py-2 rounded-lg text-sm"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Milestones */}
        <div>
          <h3 className="text-xl font-medium text-white mb-4">Reward Milestones</h3>
          <div className="space-y-4">
            {rewards.map(reward => (
              <div 
                key={reward.id}
                className="bg-[#151835] rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-500 font-medium">{reward.milestone}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {reward.milestone} Referrals
                    </p>
                    <p className="text-sm text-gray-400">{reward.reward}</p>
                  </div>
                </div>
                {reward.claimed ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <button 
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={true}
                  >
                    Claim
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div>
          <h3 className="text-xl font-medium text-white mb-4">Recent Referrals</h3>
          <div className="space-y-4">
            {history.map(item => (
              <div 
                key={item.id}
                className="bg-[#151835] rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-medium">{item.username}</p>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </p>
                  {item.reward && (
                    <p className="text-sm text-gray-400">{item.reward}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReferralsPage; 