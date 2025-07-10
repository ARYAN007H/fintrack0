import React, { useState } from 'react';
import { Plus, Search, Filter, ArrowUpDown, ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from 'lucide-react';
import { SkeletonList } from '../components/ui/SkeletonLoader';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useData } from '../context/DataContext';
import { Transaction } from '../types/dataTypes';

const TransactionsPage: React.FC = () => {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { transactions, accounts, categories, addTransaction, isLoading } = useData();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    description: '',
    accountId: accounts[0]?.id || '',
    type: 'expense',
    category: 'other'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addTransaction(newTransaction);
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      description: '',
      accountId: accounts[0]?.id || '',
      type: 'expense',
      category: 'other'
    });
    setShowAddForm(false);
    setIsSubmitting(false);
  };

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
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getCategoryColor = (categoryId?: string) => {
    if (!categoryId) return '#78716C';
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : '#78716C';
  };

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(transaction => {
      // Search filter
      const matchesSearch = 
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getAccountName(transaction.accountId).toLowerCase().includes(searchQuery.toLowerCase());
      
      // Type filter
      const matchesType = filterType === 'all' || transaction.type === filterType;
      
      // Category filter
      const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-56 animate-pulse"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
          </div>
          <SkeletonList count={8} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('transactions')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('manage your income and expenses')}
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
            <span>{t('addTransaction')}</span>
          </button>
        </div>
      </div>
      
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 scale-in">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t('addTransaction')}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('description')}
                </label>
                <input
                  type="text"
                  required
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('amount')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('date')}
                </label>
                <input
                  type="date"
                  required
                  value={newTransaction.date.split('T')[0]}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('type')}
                </label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as any})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="expense">{t('expense')}</option>
                  <option value="income">{t('income')}</option>
                  <option value="transfer">{t('transfer')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('category')}
                </label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
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
                  {t('account')}
                </label>
                <select
                  value={newTransaction.accountId}
                  onChange={(e) => setNewTransaction({...newTransaction, accountId: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
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
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-3 justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Filter size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">{t('all types')}</option>
                <option value="expense">{t('expense')}</option>
                <option value="income">{t('income')}</option>
                <option value="transfer">{t('transfer')}</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">{t('all categories')}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {t(category.name)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowUpDown size={16} />
            <span>{sortOrder === 'desc' ? t('newest first') : t('oldest first')}</span>
          </button>
        </div>
        
        {filteredTransactions.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {getTransactionIcon(transaction)}
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
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
                      
                      {transaction.isRecurring && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          {t('recurring')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
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
                  
                  <div className="flex gap-2">
                    <button className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      {t('edit')}
                    </button>
                    <button className="p-1.5 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      {t('delete')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery || filterType !== 'all' || filterCategory !== 'all' 
                ? t('noTransactionsFound') 
                : t('noTransactionsYet')}
            </p>
            {!searchQuery && filterType === 'all' && filterCategory === 'all' && (
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                {t('addTransaction')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;