import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useData } from '../../context/DataContext';

const AccountsCard: React.FC = () => {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { accounts } = useData();

  // Show only top 3 accounts by balance
  const topAccounts = [...accounts]
    .sort((a, b) => Math.abs(b.balance) - Math.abs(a.balance))
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 card-hover">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{t('accounts')}</h2>
          <button className="text-sm text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
            <PlusCircle size={16} />
            <span>{t('addAccount')}</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {topAccounts.map((account) => (
            <div 
              key={account.id} 
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center" 
                  style={{ backgroundColor: account.color || '#7B61FF' }}
                >
                  <span className="text-white font-medium">
                    {account.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {account.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t(account.type)}{account.lastFour ? ` •••• ${account.lastFour}` : ''}
                  </p>
                </div>
              </div>
              <p className={`font-semibold ${account.balance < 0 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-gray-900 dark:text-white'}`}
              >
                {formatAmount(account.balance)}
              </p>
            </div>
          ))}
        </div>
        
        {accounts.length > 3 && (
          <button className="mt-4 text-center w-full py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
            {t('viewAll')} ({accounts.length})
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountsCard;