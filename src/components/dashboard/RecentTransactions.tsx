import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from 'lucide-react';
import Button from '../ui/Button';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useData } from '../../context/DataContext';
import { Transaction } from '../../types/dataTypes';

const RecentTransactions: React.FC = () => {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { transactions, accounts, categories } = useData();

  // Get last 6 transactions, sorted by date (most recent first)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const getTransactionIcon = (transaction: Transaction) => {
    switch (transaction.type) {
      case 'income':
        return <ArrowDownLeft size={18} className="text-green-500" />;
      case 'expense':
        return <ArrowUpRight size={18} className="text-red-500" />;
      case 'transfer':
        return <ArrowLeftRight size={18} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getAccountName = (accountId: string) => {
    const account = accounts.find(a => a.id === accountId);
    return account ? account.name : 'Unknown Account';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const getCategoryColor = (categoryId?: string) => {
    if (!categoryId) return '#78716C';
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : '#78716C';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 card-hover">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{t('recentTransactions')}</h2>
          <Button variant="link" size="sm">
            {t('viewAll')}
          </Button>
        </div>
        
        {recentTransactions.length > 0 ? (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {getTransactionIcon(transaction)}
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getAccountName(transaction.accountId)}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(transaction.date)}
                      </span>
                      
                      {transaction.category && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                          <span 
                            className="text-xs px-1.5 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: getCategoryColor(transaction.category) }}
                          >
                            {t(transaction.category)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className={`font-semibold ${
                  transaction.type === 'expense' 
                    ? 'text-red-600 dark:text-red-400' 
                    : transaction.type === 'income'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-blue-600 dark:text-blue-400'
                }`}>
                  {transaction.type === 'expense' ? '-' : transaction.type === 'income' ? '+' : ''}
                  {formatAmount(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {t('noTransactionsYet')}
            </p>
            <Button variant="link" size="sm" className="mt-2">
              {t('addTransaction')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;