import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useData } from '../../context/DataContext';

const ExpenseChart: React.FC = () => {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { getExpensesByCategory, categories } = useData();
  const [period, setPeriod] = useState<'week' | 'month'>('month');
  const [animatedPercentages, setAnimatedPercentages] = useState<Record<string, number>>({});

  const expensesByCategory = getExpensesByCategory(period);
  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);

  useEffect(() => {
    // Initial render with 0% for animation
    setAnimatedPercentages({});
    
    // Animate to actual percentages
    const timer = setTimeout(() => {
      const percentages: Record<string, number> = {};
      Object.entries(expensesByCategory).forEach(([category, amount]) => {
        percentages[category] = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
      });
      setAnimatedPercentages(percentages);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [expensesByCategory, totalExpenses]);

  // Sort categories by expense amount (descending)
  const sortedCategories = Object.entries(expensesByCategory)
    .sort(([, amountA], [, amountB]) => amountB - amountA)
    .map(([categoryId]) => categoryId);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 card-hover">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {t('expenses')} {period === 'week' ? t('thisWeek') : t('thisMonth')}
          </h2>
          
          <div className="flex overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5">
            <button
              onClick={() => setPeriod('week')}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                period === 'week'
                  ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              {t('week')}
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                period === 'month'
                  ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              {t('month')}
            </button>
          </div>
        </div>
        
        {totalExpenses > 0 ? (
          <div className="space-y-4">
            {sortedCategories.map((categoryId) => {
              const category = categories.find(c => c.id === categoryId) || {
                id: categoryId,
                name: categoryId,
                color: '#78716C',
                icon: 'CircleDashed'
              };
              
              const amount = expensesByCategory[categoryId];
              const percentage = animatedPercentages[categoryId] || 0;
              
              return (
                <div key={categoryId}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t(category.name)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {percentage.toFixed(1)}%
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {formatAmount(amount)}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: category.color
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {t('noData')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;