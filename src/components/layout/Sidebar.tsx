import React from 'react';
import { 
  X, 
  LayoutDashboard, 
  CreditCard, 
  Receipt, 
  PieChart, 
  BarChart3, 
  Settings,
  LogOut,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  onNavigate, 
  isOpen, 
  onClose 
}) => {
  const { t } = useLanguage();
  const { logout } = useAuth();

  const menuItems = [
    { 
      id: 'dashboard', 
      label: t('dashboard'), 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      id: 'accounts', 
      label: t('accounts'), 
      icon: <CreditCard size={20} /> 
    },
    { 
      id: 'transactions', 
      label: t('transactions'), 
      icon: <Receipt size={20} /> 
    },
    { 
      id: 'budgets', 
      label: t('budgets'), 
      icon: <PieChart size={20} /> 
    },
    { 
      id: 'reports', 
      label: t('reports'), 
      icon: <BarChart3 size={20} /> 
    },
    {
      id: 'converter',
      label: t('currencyConverter'),
      icon: <DollarSign size={20} />
    },
    { 
      id: 'settings', 
      label: t('settings'), 
      icon: <Settings size={20} /> 
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:static lg:z-auto transition-transform duration-300 ease-in-out
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <DollarSign size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                FinTrack
              </h1>
            </div>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
                  ${currentPage === item.id
                    ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span className={currentPage === item.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <span className="text-gray-500 dark:text-gray-400">
                <LogOut size={20} />
              </span>
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;