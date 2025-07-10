import React from 'react';
import { Menu, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import NotificationsDropdown from '../navigation/NotificationsDropdown';
import AccountDropdown from '../navigation/AccountDropdown';
import ThemeToggle from '../navigation/ThemeToggle';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  const { t } = useLanguage();
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden transition-colors"
            aria-label="Menu"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>

          <h1 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {showSearch ? (
            <div className="relative animate-fadeIn">
              <input
                type="text"
                placeholder={t('search')}
                className="w-full md:w-60 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
              <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          )}

          <ThemeToggle />

          <NotificationsDropdown />

          <AccountDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;