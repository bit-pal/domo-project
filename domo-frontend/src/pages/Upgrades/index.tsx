import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { RocketLaunchIcon, BoltIcon, CubeIcon } from '@heroicons/react/24/solid';

interface Upgrade {
  id: number;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  cost: number;
  category: 'base' | 'production' | 'efficiency';
  effect: string;
}

const upgrades: Upgrade[] = [
  {
    id: 1,
    name: 'Base Capacity',
    description: 'Increase maximum employee slots',
    level: 2,
    maxLevel: 5,
    cost: 500,
    category: 'base',
    effect: '+1 Employee Slot'
  },
  {
    id: 2,
    name: 'Mining Speed',
    description: 'Increase mining operation speed',
    level: 3,
    maxLevel: 10,
    cost: 750,
    category: 'production',
    effect: '+15% Mining Speed'
  },
  {
    id: 3,
    name: 'Energy Efficiency',
    description: 'Reduce energy consumption',
    level: 1,
    maxLevel: 5,
    cost: 300,
    category: 'efficiency',
    effect: '-10% Energy Cost'
  },
  {
    id: 4,
    name: 'Storage Capacity',
    description: 'Increase storage space',
    level: 2,
    maxLevel: 8,
    cost: 400,
    category: 'base',
    effect: '+50 Storage Slots'
  }
];

const UpgradesPage: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'base':
        return <CubeIcon className="w-6 h-6 text-blue-500" />;
      case 'production':
        return <RocketLaunchIcon className="w-6 h-6 text-green-500" />;
      case 'efficiency':
        return <BoltIcon className="w-6 h-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'base': return 'text-blue-500';
      case 'production': return 'text-green-500';
      case 'efficiency': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <PageLayout 
      title="Upgrades" 
      subtitle="Enhance your base capabilities and efficiency"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {upgrades.map(upgrade => (
          <div 
            key={upgrade.id}
            className="bg-[#151835] rounded-lg p-6 hover:bg-[#1a1f40] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-12 h-12 ${getCategoryColor(upgrade.category)}/20 rounded-lg flex items-center justify-center`}>
                  {getCategoryIcon(upgrade.category)}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-white">{upgrade.name}</h3>
                  <p className={`text-sm ${getCategoryColor(upgrade.category)}`}>
                    {upgrade.category.charAt(0).toUpperCase() + upgrade.category.slice(1)}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">{upgrade.description}</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Level {upgrade.level}/{upgrade.maxLevel}</span>
                  <span className="text-white">{upgrade.effect}</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full">
                  <div 
                    className={`h-full rounded-full ${getCategoryColor(upgrade.category)} transition-all`}
                    style={{ width: `${(upgrade.level / upgrade.maxLevel) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white font-medium">
                  {upgrade.cost} $DOMO
                </span>
                <button 
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    upgrade.level === upgrade.maxLevel
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}
                  disabled={upgrade.level === upgrade.maxLevel}
                >
                  {upgrade.level === upgrade.maxLevel ? 'Maxed' : 'Upgrade'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default UpgradesPage; 