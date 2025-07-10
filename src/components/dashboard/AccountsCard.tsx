import React from 'react';
import { TrendingUp } from 'lucide-react';
import Button from '../ui/Button';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useData } from '../../context/DataContext';

const BudgetProgress: React.FC = () => {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { budgets } = useData();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 card-hover">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{t('monthlyBudget')}</h2>
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        {budgets.length > 0 ? (
          <div className="space-y-4">
            {budgets.slice(0, 2).map((budget) => {
              const percentage = (budget.spent / budget.amount) * 100;
              const isOverBudget = percentage > 100;
              
              let statusColor = 'bg-green-500';
              if (percentage > 85) statusColor = 'bg-yellow-500';
              if (isOverBudget) statusColor = 'bg-red-500';
              
              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{budget.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatAmount(budget.spent)} / {formatAmount(budget.amount)}
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          isOverBudget 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                            : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        }`}>
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: budget.color }}></div>
                  </div>
                  
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${statusColor} transition-all duration-500 ease-out`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">{t('noBudgetsYet')}</p>
            <Button variant="link" size="sm" className="mt-2">
              {t('createBudget')}
            </Button>
          </div>
        )}
        
        {budgets.length > 2 && (
          <Button variant="link" size="sm" className="w-full mt-4">
          </Button>
          </Button>
        )}
      </div>
    </div>
  );
};

export default BudgetProgress;