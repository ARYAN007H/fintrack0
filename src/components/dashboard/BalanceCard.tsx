import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useData } from '../../context/DataContext';

const BalanceCard: React.FC = () => {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { getTotalBalance, getTotalIncome, getTotalExpenses } = useData();
  
  const totalBalance = getTotalBalance();
  const monthlyIncome = getTotalIncome('month');
  const monthlyExpenses = getTotalExpenses('month');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 card-hover">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{t('totalBalance')}</h2>
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <Wallet size={20} className="text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatAmount(totalBalance)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t('across all accounts')}
          </p>
        </div>
        
        <div className="flex gap-x-8">
          <div>
            <div className="flex items-center gap-1.5">
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('income')}
              </span>
            </div>
            <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
              {formatAmount(monthlyIncome)}
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-1.5">
              <TrendingDown size={16} className="text-red-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('expenses')}
              </span>
            </div>
            <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
              {formatAmount(monthlyExpenses)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
    </div>
  );
};

export default BalanceCard;