import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { ShoppingBagIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface StoreItem {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: 'DOMO' | 'SOL';
  category: 'boost' | 'cosmetic' | 'utility';
  featured?: boolean;
}

const storeItems: StoreItem[] = [
  {
    id: 1,
    name: 'XP Boost',
    description: '2x XP for all employees for 24 hours',
    price: 100,
    currency: 'DOMO',
    category: 'boost',
    featured: true
  },
  {
    id: 2,
    name: 'Mining Kit',
    description: 'Increases mining efficiency by 25%',
    price: 250,
    currency: 'DOMO',
    category: 'utility'
  },
  {
    id: 3,
    name: 'Golden Name Tag',
    description: 'Special cosmetic for your profile',
    price: 0.1,
    currency: 'SOL',
    category: 'cosmetic'
  },
  {
    id: 4,
    name: 'Extra Storage',
    description: '+5 storage slots for your inventory',
    price: 150,
    currency: 'DOMO',
    category: 'utility'
  }
];

const StorePage: React.FC = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'boost': return 'text-purple-500';
      case 'cosmetic': return 'text-yellow-500';
      case 'utility': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <PageLayout 
      title="Store" 
      subtitle="Purchase items and upgrades for your base"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {storeItems.map(item => (
          <div 
            key={item.id} 
            className={`relative bg-[#151835] rounded-lg p-6 hover:bg-[#1a1f40] transition-colors ${
              item.featured ? 'border-2 border-yellow-500/50' : ''
            }`}
          >
            {item.featured && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                <SparklesIcon className="w-3 h-3 mr-1" />
                Featured
              </div>
            )}
            
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 ${getCategoryColor(item.category)}/20 rounded-lg flex items-center justify-center`}>
                <ShoppingBagIcon className={`w-6 h-6 ${getCategoryColor(item.category)}`} />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-white">{item.name}</h3>
                <p className={`text-sm ${getCategoryColor(item.category)}`}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              {item.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-white font-medium">
                {item.price} ${item.currency}
              </span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default StorePage; 