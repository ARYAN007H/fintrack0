import React from 'react';
import { Palette, Globe, Bell, Shield, Download, CreditCard } from 'lucide-react';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';

const SettingsPage: React.FC = () => {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency, supportedCurrencies } = useCurrency();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('settings')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('customize your experience')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Palette size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t('theme')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('choose between light and dark mode')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('darkMode')}
              </label>
              <Button
                onClick={toggleTheme}
                variant="ghost"
                className="relative inline-flex items-center px-0.5 py-0.5 rounded-full w-11 h-6 bg-gray-200 dark:bg-purple-600 transition-all duration-300 min-h-[24px]"
                aria-label={t('toggle theme')}
              >
                <span
                  className={`absolute left-0.5 transform transition-transform duration-300 inline-block w-5 h-5 rounded-full bg-white shadow-sm ${
                    theme === 'dark' ? 'translate-x-5' : ''
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Globe size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t('language')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('select your preferred language')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('selectLanguage')}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CreditCard size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t('currencySettings')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('select your preferred currency')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('selectCurrency')}
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {supportedCurrencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.symbol} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Bell size={20} className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t('notifications')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('manage your notification preferences')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('emailNotifications')}
              </label>
              <Button
                variant="ghost"
                className="relative inline-flex items-center px-0.5 py-0.5 rounded-full w-11 h-6 bg-gray-200 dark:bg-purple-600 transition-all duration-300 min-h-[24px]"
                aria-label={t('toggle email notifications')}
              >
                <span
                  className="absolute left-0.5 transform transition-transform duration-300 inline-block w-5 h-5 rounded-full bg-white shadow-sm translate-x-5"
                />
              </Button>
            </div>
            
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('pushNotifications')}
              </label>
              <Button
                variant="ghost"
                className="relative inline-flex items-center px-0.5 py-0.5 rounded-full w-11 h-6 bg-gray-200 dark:bg-gray-700 transition-all duration-300 min-h-[24px]"
                aria-label={t('toggle push notifications')}
              >
                <span
                  className="absolute left-0.5 transform transition-transform duration-300 inline-block w-5 h-5 rounded-full bg-white shadow-sm"
                />
              </Button>
            </div>
            
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('budgetAlerts')}
              </label>
              <Button
                variant="ghost"
                className="relative inline-flex items-center px-0.5 py-0.5 rounded-full w-11 h-6 bg-gray-200 dark:bg-purple-600 transition-all duration-300 min-h-[24px]"
                aria-label={t('toggle budget alerts')}
              >
                <span
                  className="absolute left-0.5 transform transition-transform duration-300 inline-block w-5 h-5 rounded-full bg-white shadow-sm translate-x-5"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Shield size={20} className="text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t('security')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('manage your security settings')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <Button variant="secondary" className="w-full justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('changePassword')}
              </span>
              <span className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                {t('recommended')}
              </span>
            </Button>
            
            <Button variant="secondary" className="w-full justify-start">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('twoFactorAuthentication')}
              </span>
            </Button>
            
            <Button variant="secondary" className="w-full justify-start">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('sessionManagement')}
              </span>
            </Button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <Download size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t('exportData')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('export your financial data')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <Button variant="secondary" className="w-full justify-start">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('exportAllData')}
              </span>
            </Button>
            
            <Button variant="secondary" className="w-full justify-start">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('exportTransactions')}
              </span>
            </Button>
            
            <Button variant="destructive" className="w-full justify-start bg-transparent text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300">
              <span className="text-sm font-medium">
                {t('requestAccountDeletion')}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;