import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import BaseInfo from './components/BaseInfo';
import EmployeeSlots from './components/EmployeeSlots';
import Invitations from './components/Invitations';

const Dashboard: React.FC = () => {
  const { publicKey } = useWallet();

  if (!publicKey) {
    return null; // This shouldn't happen as the route will be protected
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BaseInfo />
        <EmployeeSlots />
        <Invitations />
      </div>
    </div>
  );
};

export default Dashboard; 