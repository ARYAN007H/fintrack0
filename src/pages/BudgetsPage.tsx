import React, { useState } from 'react';
import { Plus, Search, Wallet } from 'lucide-react';
import { SkeletonCard } from '../components/ui/SkeletonLoader';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useData } from '../context/DataContext';
import { Budget } from '../types/dataTypes';

const BudgetsPage: React.FC = () => {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { budgets, categories, addBudget, isLoading } = useData();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newBudget, setNewBudget] = useState<Omit<Budget, 'id'>>({
    name: '',
    amount: 0,
    spent: 0,
    category: categories[0]?.id || 'other',
    period: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    color: '#7B61FF'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addBudget(newBudget);
    setNewBudget({
      name: '',
      amount: 0,
      spent: 0,
      category: categories[0]?.id || 'other',
      period: 'monthly',
      startDate: new Date().toISOString().split('T')[0],
      color: '#7B61FF'
    });
    setShowAddForm(false);
    setIsSubmitting(false);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? t(category.name) : t('other');
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : '#78716C';
  };

  const filteredBudgets = budgets.filter(budget => 
    budget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getCategoryName(budget.category).toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('budgets')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('track your spending limits')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span>{t('addBudget')}</span>
          </button>
        </div>
      </div>
      
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 scale-in">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t('addBudget')}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('budgetName')}
                </label>
                <input
                  type="text"
                  required
                  value={newBudget.name}
                  onChange={(e) => setNewBudget({...newBudget, name: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('budgetAmount')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget({...newBudget, amount: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('category')}
                </label>
                <select
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {t(category.name)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('period')}
                </label>
                <select
                  value={newBudget.period}
                  onChange={(e) => setNewBudget({...newBudget, period: e.target.value as any})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="weekly">{t('weekly')}</option>
                  <option value="monthly">{t('monthly')}</option>
                  <option value="yearly">{t('yearly')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('startDate')}
                </label>
                <input
                  type="date"
                  required
                  value={newBudget.startDate.split('T')[0]}
                  onChange={(e) => setNewBudget({...newBudget, startDate: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:hover:bg-purple-600 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>{t('saving')}...</span>
                  </>
                ) : (
                  t('save')
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBudgets.map((budget) => {
          const percentage = (budget.spent / budget.amount) * 100;
          const isOverBudget = percentage > 100;
          
          let statusColor = 'bg-green-500';
          if (percentage > 85) statusColor = 'bg-yellow-500';
          if (isOverBudget) statusColor = 'bg-red-500';
          
          return (
            <div 
              key={budget.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 card-hover"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {budget.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t(budget.period)}: {getCategoryName(budget.category)}
                    </p>
                  </div>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: getCategoryColor(budget.category) }}
                  >
                    <Wallet size={18} className="text-white" />
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800 dark:text-white">
                        {formatAmount(budget.spent)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        / {formatAmount(budget.amount)}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isOverBudget 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                        : percentage > 85
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    }`}>
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                  
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${statusColor} transition-all duration-500 ease-out`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatAmount(0)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatAmount(budget.amount)}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 text-center text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    {t('edit')}
                  </button>
                  <button className="flex-1 py-2 text-center text-sm font-medium border border-purple-600 dark:border-purple-500 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                    {t('details')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredBudgets.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery ? t('noBudgetsFound') : t('noBudgetsYet')}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              {t('addBudget')}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetsPage;