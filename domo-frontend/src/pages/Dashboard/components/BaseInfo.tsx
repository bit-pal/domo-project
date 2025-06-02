import React from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';

interface BaseInfoProps {}

const BaseInfo: React.FC<BaseInfoProps> = () => {
  return (
    <div className="bg-[#0F1123] rounded-lg p-6">
      <h2 className="text-xl text-gray-300 mb-4">Base Info</h2>
      
      {/* Base Level Section */}
      <div className="bg-[#151835] rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center mb-4">
          <HomeIcon className="w-16 h-16 text-blue-400" />
        </div>
        <div className="text-center">
          <p className="text-white mb-2">BASE LEVEL: 3</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full transition-colors">
            Upgrade Base
          </button>
        </div>
      </div>

      {/* DOMO Boss Section */}
      <div className="bg-[#151835] rounded-lg p-4">
        <h3 className="text-lg text-white mb-4">DOMO Boss</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400">Safe level</p>
            <div className="w-32 h-2 bg-gray-700 rounded-full mt-1">
              <div className="w-1/3 h-full bg-green-500 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-sm mt-1">13%</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">0,18</p>
            <p className="text-gray-400">0,18</p>
          </div>
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 1a1 1 0 0 1 .707.293l3 3a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414l9-9A1 1 0 0 1 12 1zm0 2.414L3.414 12 5 13.586 13.586 5 12 3.414z" clipRule="evenodd" />
          </svg>
          Increase base level to unlock
        </div>
      </div>
    </div>
  );
};

export default BaseInfo; 