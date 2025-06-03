import React, { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import {
  CalendarDaysIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';

interface Task {
  id: number;
  title: string;
  description: string;
  reward: string;
  progress: number;
  total: number;
  category: 'daily' | 'weekly' | 'special';
  completed: boolean;
  expires?: string;
}

const tasks: Task[] = [
  {
    id: 1,
    title: 'Mine Resources',
    description: 'Mine 100 resources from your base',
    reward: '50 $DOMO',
    progress: 45,
    total: 100,
    category: 'daily',
    completed: false,
    expires: '12h 30m',
  },
  {
    id: 2,
    title: 'Complete Trades',
    description: 'Complete 5 marketplace trades',
    reward: '100 $DOMO',
    progress: 3,
    total: 5,
    category: 'daily',
    completed: false,
    expires: '12h 30m',
  },
  {
    id: 3,
    title: 'Upgrade Base',
    description: 'Perform 3 base upgrades',
    reward: '500 $DOMO',
    progress: 3,
    total: 3,
    category: 'weekly',
    completed: true,
    expires: '5d 12h',
  },
  {
    id: 4,
    title: 'Recruit Employees',
    description: 'Hire 2 new employees',
    reward: '200 $DOMO',
    progress: 1,
    total: 2,
    category: 'weekly',
    completed: false,
    expires: '5d 12h',
  },
  {
    id: 5,
    title: 'Launch Event',
    description: 'Participate in the spring launch event',
    reward: '1000 $DOMO + Special NFT',
    progress: 0,
    total: 1,
    category: 'special',
    completed: false,
    expires: '14d',
  },
];

const TasksPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'daily' | 'weekly' | 'special'>('daily');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'daily':
        return <CalendarDaysIcon className="w-6 h-6 text-blue-500" />;
      case 'weekly':
        return <ClockIcon className="w-6 h-6 text-purple-500" />;
      case 'special':
        return <StarIcon className="w-6 h-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  const filteredTasks = tasks.filter(task => task.category === activeCategory);

  return (
    <PageLayout 
      title="Tasks" 
      subtitle="Complete tasks to earn rewards"
    >
      {/* Task Categories */}
      <div className="flex space-x-4 mb-8">
        {['daily', 'weekly', 'special'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category as 'daily' | 'weekly' | 'special')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
              activeCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-[#151835] text-gray-400 hover:bg-[#1a1f40]'
            }`}
          >
            {getCategoryIcon(category)}
            <span className="capitalize">{category}</span>
          </button>
        ))}
      </div>

      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#151835] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-medium text-white">Completed Tasks</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {tasks.filter(t => t.completed).length}/{tasks.length}
          </p>
          <p className="text-sm text-gray-400 mt-1">Total progress</p>
        </div>

        <div className="bg-[#151835] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <ArrowPathIcon className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium text-white">Active Tasks</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            {tasks.filter(t => !t.completed).length}
          </p>
          <p className="text-sm text-gray-400 mt-1">Tasks in progress</p>
        </div>

        <div className="bg-[#151835] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <StarIcon className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-medium text-white">Potential Rewards</h3>
          </div>
          <p className="text-3xl font-bold text-white">2,150</p>
          <p className="text-sm text-gray-400 mt-1">$DOMO available</p>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div 
            key={task.id}
            className="bg-[#151835] rounded-lg p-6 hover:bg-[#1a1f40] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  {task.title}
                  {task.completed && (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  )}
                </h3>
                <p className="text-gray-400 text-sm">{task.description}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{task.reward}</p>
                <p className="text-sm text-gray-400">Expires in {task.expires}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{task.progress}/{task.total}</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div 
                  className={`h-full rounded-full ${
                    task.completed ? 'bg-green-500' : 'bg-blue-500'
                  } transition-all`}
                  style={{ width: `${(task.progress / task.total) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-4">
              <button 
                className={`px-4 py-2 rounded-lg transition-colors ${
                  task.completed
                    ? 'bg-green-500 cursor-not-allowed'
                    : task.progress === task.total
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-600 cursor-not-allowed'
                } text-white`}
                disabled={task.completed || task.progress < task.total}
              >
                {task.completed ? 'Claimed' : task.progress === task.total ? 'Claim Reward' : 'In Progress'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default TasksPage; 