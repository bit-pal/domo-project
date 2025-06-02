import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  ArrowUpIcon,
  GiftIcon,
  TrophyIcon,
  NewspaperIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen?: boolean;
}

interface NavigationItem {
  id: number;
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface NavigationGroup {
  id: number;
  title: string;
  items: NavigationItem[];
}

const navigationGroups: NavigationGroup[] = [
  {
    id: 1,
    title: 'General',
    items: [
      {
        id: 1,
        title: 'Home',
        url: '/',
        icon: HomeIcon
      }
    ]
  },
  {
    id: 2,
    title: 'Management',
    items: [
      {
        id: 2,
        title: 'Employees',
        url: '/employees',
        icon: UsersIcon
      },
      {
        id: 3,
        title: 'Tasks',
        url: '/tasks',
        icon: ClipboardDocumentListIcon
      }
    ]
  },
  {
    id: 3,
    title: 'Economy',
    items: [
      {
        id: 4,
        title: 'Store',
        url: '/store',
        icon: ShoppingBagIcon
      },
      {
        id: 5,
        title: 'Marketplace',
        url: '/marketplace',
        icon: ShoppingCartIcon
      },
      {
        id: 6,
        title: 'Storage',
        url: '/storage',
        icon: ArchiveBoxIcon
      },
      {
        id: 7,
        title: 'Upgrades',
        url: '/upgrades',
        icon: ArrowUpIcon
      }
    ]
  },
  {
    id: 4,
    title: 'Social',
    items: [
      {
        id: 8,
        title: 'Referrals',
        url: '/referrals',
        icon: GiftIcon
      },
      {
        id: 9,
        title: 'Leaderboard',
        url: '/leaderboard',
        icon: TrophyIcon
      },
      {
        id: 10,
        title: 'Blog',
        url: '/blog',
        icon: NewspaperIcon
      }
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false }) => {
  const location = useLocation();
  
  return (
    <aside 
      className={`
        fixed top-16 left-0 bottom-0 bg-[#1A1A1A] border-r border-white/10
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-16'}
      `}
    >
      <nav className="h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
        {navigationGroups.map((group) => (
          <div key={group.id} className="mb-8 px-2 py-2">
            {isOpen && (
              <h3 className="px-2 mb-4 text-sm font-semibold text-[#6B1620] uppercase">
                {group.title}
              </h3>
            )}
            <div className="space-y-2">
              {group.items.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.url;
                
                return (
                  <Link
                    key={item.id}
                    to={item.url}
                    className={`
                      flex items-center gap-3 rounded-lg transition-colors relative group whitespace-nowrap
                      ${!isOpen ? 'justify-center px-2' : 'px-3'} py-2.5
                      ${isActive 
                        ? 'bg-[#9333EA] text-white' 
                        : 'text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <IconComponent 
                      className={`w-6 h-6 shrink-0 ${isActive ? 'text-white' : 'text-white'}`} 
                    />
                    {isOpen && (
                      <span className="text-base font-medium truncate">
                        {item.title}
                      </span>
                    )}
                    {!isOpen && (
                      <div className="
                        absolute left-full ml-2 px-2 py-1 bg-[#1A1A1A] text-white text-sm
                        rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible
                        transition-all duration-200 whitespace-nowrap z-50 border border-white/10
                      ">
                        {item.title}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar; 