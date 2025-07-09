import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 px-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {currentYear} FinTrack. {t('all rights reserved')}
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            {t('privacy')}
          </a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            {t('terms')}
          </a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            {t('contact')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;