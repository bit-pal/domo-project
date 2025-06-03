import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { TagIcon, ArrowsUpDownIcon } from '@heroicons/react/24/solid';

interface MarketItem {
  id: number;
  name: string;
  type: 'NFT' | 'Item' | 'Resource';
  seller: string;
  price: number;
  currency: 'SOL' | 'DOMO';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const marketItems: MarketItem[] = [
  {
    id: 1,
    name: 'Legendary Mining Drill',
    type: 'NFT',
    seller: 'DOMO_Master',
    price: 2.5,
    currency: 'SOL',
    rarity: 'legendary'
  },
  {
    id: 2,
    name: 'Resource Bundle',
    type: 'Resource',
    seller: 'ResourceKing',
    price: 500,
    currency: 'DOMO',
    rarity: 'common'
  },
  {
    id: 3,
    name: 'Epic Employee Card',
    type: 'NFT',
    seller: 'NFT_Trader',
    price: 1.2,
    currency: 'SOL',
    rarity: 'epic'
  },
  {
    id: 4,
    name: 'Rare Base Skin',
    type: 'Item',
    seller: 'SkinCollector',
    price: 1000,
    currency: 'DOMO',
    rarity: 'rare'
  }
];

const MarketplacePage: React.FC = () => {
  const [sortBy, setSortBy] = useState<'price' | 'rarity'>('price');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-500';
      case 'epic': return 'text-purple-500';
      case 'rare': return 'text-blue-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <PageLayout 
      title="Marketplace" 
      subtitle="Trade items and NFTs with other players"
    >
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setSortBy('price')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === 'price' 
                ? 'bg-blue-500 text-white' 
                : 'bg-[#151835] text-gray-400 hover:text-white'
            }`}
          >
            Sort by Price
          </button>
          <button
            onClick={() => setSortBy('rarity')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === 'rarity' 
                ? 'bg-blue-500 text-white' 
                : 'bg-[#151835] text-gray-400 hover:text-white'
            }`}
          >
            Sort by Rarity
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#151835] text-gray-400 hover:text-white rounded-lg transition-colors">
          <ArrowsUpDownIcon className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="space-y-4">
        {marketItems.map(item => (
          <div 
            key={item.id}
            className="bg-[#151835] rounded-lg p-6 hover:bg-[#1a1f40] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <TagIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">{item.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-400">{item.type}</span>
                    <span className={`text-sm font-medium ${getRarityColor(item.rarity)}`}>
                      {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-medium text-white">
                  {item.price} ${item.currency}
                </div>
                <div className="text-sm text-gray-400">
                  Seller: {item.seller}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button className="px-4 py-2 bg-[#1f2347] text-gray-300 hover:text-white rounded-lg transition-colors">
                Make Offer
              </button>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default MarketplacePage; 