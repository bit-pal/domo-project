import React from 'react';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-gray-400">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default PageLayout; 