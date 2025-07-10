import React, { useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    // Keyboard shortcut: Ctrl/Cmd + Shift + D
    const handleKeyboard = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        toggleTheme();
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [toggleTheme]);

  // Detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Only auto-switch if no manual preference is set
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon size={20} className="text-gray-300" />;
      case 'light':
        return <Sun size={20} className="text-gray-600" />;
      default:
        return <Monitor size={20} className="text-gray-600 dark:text-gray-300" />;
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 group"
      aria-label={`${t('switchTo')} ${theme === 'dark' ? t('lightMode') : t('darkMode')} (Ctrl+Shift+D)`}
      title={`${t('switchTo')} ${theme === 'dark' ? t('lightMode') : t('darkMode')} (Ctrl+Shift+D)`}
    >
      <div className="relative overflow-hidden">
        <div className={`transform transition-all duration-300 ${theme === 'dark' ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}`}>
          {theme === 'light' && <Sun size={20} className="text-gray-600" />}
        </div>
        <div className={`absolute inset-0 transform transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-180 scale-0'}`}>
          {theme === 'dark' && <Moon size={20} className="text-gray-300" />}
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {theme === 'dark' ? t('lightMode') : t('darkMode')}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
      </div>
    </button>
  );
};

export default ThemeToggle;