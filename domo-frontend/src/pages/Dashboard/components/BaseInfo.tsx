import React, { useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import ClaimSafeModal from '../../../components/modals/ClaimSafeModal';
import UpgradeBaseLevelModal from '../../../components/modals/UpgradeBaseLevelModal';

interface BaseInfoProps {}

const BaseInfo: React.FC<BaseInfoProps> = () => {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isUpgradeBaseLevelModalOpen, setIsUpgradeBaseLevelModalOpen] = useState(false);
  const [baseLevel, setBaseLevel] = useState(3); // Example base level
  const safeAmount = 0.18; // Example amount

  const handleClaimConfirm = () => {
    // Handle claim logic here
    setIsClaimModalOpen(false);
  };

  const handleUpgradeBaseLevel = () => {
    setIsUpgradeBaseLevelModalOpen(true);
  };

  const handleConfirmBaseUpgrade = async () => {
    // Handle upgrade logic here
    setBaseLevel(prev => prev + 1);
    setIsUpgradeBaseLevelModalOpen(false);
  };

  const formatTokenAmount = (amount: number) => {
    return (
      <>
        <span className="text-gray-300">{amount} </span>
        <span className="text-blue-400">$DOMO</span>
      </>
    );
  };

  return (
    <>
      <div className="bg-[#0F1123] rounded-lg p-6">
        <h2 className="text-xl text-gray-300 mb-4">Base Info</h2>
        
        {/* Base Level Section */}
        <div className="bg-[#151835] rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center mb-4">
            <HomeIcon className="w-16 h-16 text-blue-400" />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-gray-300">BASE LEVEL:</span>
              <span className="text-blue-400 font-medium">{baseLevel}</span>
            </div>
            <button 
              onClick={handleUpgradeBaseLevel}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full transition-colors"
            >
              Upgrade Base
            </button>
          </div>
        </div>

        {/* DOMO Boss Section */}
        <div className="bg-[#151835] rounded-lg p-4">
          <h3 className="text-lg text-gray-300 mb-4">DOMO Boss</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-300">Safe level</p>
              <div className="w-32 h-2 bg-gray-700 rounded-full mt-1">
                <div className="w-1/3 h-full bg-emerald-400 rounded-full"></div>
              </div>
              <p className="text-emerald-400 text-sm mt-1">13%</p>
            </div>
            <div className="text-right">
              <p className="text-gray-300">{formatTokenAmount(safeAmount)}</p>
              <button
                onClick={() => setIsClaimModalOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
              >
                Claim
              </button>
            </div>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 1a1 1 0 0 1 .707.293l3 3a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414l9-9A1 1 0 0 1 12 1zm0 2.414L3.414 12 5 13.586 13.586 5 12 3.414z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-400">Increase base level to unlock</span>
          </div>
        </div>
      </div>

      <ClaimSafeModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        amount={safeAmount}
        onConfirm={handleClaimConfirm}
      />

      <UpgradeBaseLevelModal
        isOpen={isUpgradeBaseLevelModalOpen}
        onClose={() => setIsUpgradeBaseLevelModalOpen(false)}
        currentBaseLevel={baseLevel}
        cost={100} // Example cost, should come from configuration or API
        onConfirm={handleConfirmBaseUpgrade}
      />
    </>
  );
};

export default BaseInfo; 