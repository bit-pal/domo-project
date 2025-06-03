import React, { createContext, useContext, useState, ReactNode } from 'react';
import StarterPackModal from '../components/modals/StarterPackModal';

interface StarterPackContextType {
  showStarterPackModal: () => void;
}

const StarterPackContext = createContext<StarterPackContextType | undefined>(undefined);

export const useStarterPack = () => {
  const context = useContext(StarterPackContext);
  if (!context) {
    throw new Error('useStarterPack must be used within a StarterPackProvider');
  }
  return context;
};

interface StarterPackProviderProps {
  children: ReactNode;
}

export const StarterPackProvider: React.FC<StarterPackProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const starterPackPrice = 1; // Price in SOL

  const showStarterPackModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = async () => {
    try {
      // Handle purchase logic here
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to purchase starter pack:', error);
    }
  };

  return (
    <StarterPackContext.Provider value={{ showStarterPackModal }}>
      {children}
      <StarterPackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        price={starterPackPrice}
        onConfirm={handleConfirmPurchase}
      />
    </StarterPackContext.Provider>
  );
}; 