import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { ArchiveBoxIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';

interface StorageItem {
  id: number;
  name: string;
  quantity: number;
  type: 'resource' | 'equipment' | 'consumable';
  rarity: 'common' | 'rare' | 'epic';
}

const storageItems: StorageItem[] = [
  {
    id: 1,
    name: 'Raw Ore',
    quantity: 1250,
    type: 'resource',
    rarity: 'common'
  },
  {
    id: 2,
    name: 'Mining Helmet',
    quantity: 3,
    type: 'equipment',
    rarity: 'rare'
  },
  {
    id: 3,
    name: 'Energy Drink',
    quantity: 10,
    type: 'consumable',
    rarity: 'common'
  },
  {
    id: 4,
    name: 'Epic Crystal',
    quantity: 5,
    type: 'resource',
    rarity: 'epic'
  }
];

const StoragePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'resource': return 'text-green-500';
      case 'equipment': return 'text-blue-500';
      case 'consumable': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'epic': return 'text-purple-500';
      case 'rare': return 'text-blue-500';
      default: return 'text-gray-400';
    }
  };

  const filteredItems = storageItems.filter(item => {
    if (selectedType !== 'all' && item.type !== selectedType) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <PageLayout 
      title="Storage" 
      subtitle="Manage your inventory and resources"
    >
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#151835] text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 bg-[#151835] text-gray-400 hover:text-white rounded-lg transition-colors">
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          {['all', 'resource', 'equipment', 'consumable'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === type 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-[#151835] text-gray-400 hover:text-white'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            className="bg-[#151835] rounded-lg p-4 hover:bg-[#1a1f40] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className={`w-10 h-10 ${getTypeColor(item.type)}/20 rounded-lg flex items-center justify-center`}>
                  <ArchiveBoxIcon className={`w-5 h-5 ${getTypeColor(item.type)}`} />
                </div>
                <div className="ml-3">
                  <h3 className="text-white font-medium">{item.name}</h3>
                  <p className={`text-sm ${getRarityColor(item.rarity)}`}>
                    {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">{item.quantity}</span>
                <p className="text-sm text-gray-400">in stock</p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded transition-colors">
                <TrashIcon className="w-4 h-4" />
              </button>
              <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors">
                Use
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default StoragePage; 