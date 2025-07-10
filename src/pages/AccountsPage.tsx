import React, { useState } from 'react';
import { Plus, Search, CreditCard, Wallet, Landmark, DollarSign } from 'lucide-react';
import { SkeletonCard } from '../components/ui/SkeletonLoader';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useData } from '../context/DataContext';
import { Account } from '../types/dataTypes';

const AccountsPage: React.FC = () => {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { accounts, addAccount, isLoading } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAccount, setNewAccount] = useState<Omit<Account, 'id'>>({
    name: '',
    type: 'checking',
    balance: 0,
    currency: 'USD',
    color: '#7B61FF',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addAccount(newAccount);
    setNewAccount({
      name: '',
      type: 'checking',
      balance: 0,
      currency: 'USD',
      color: '#7B61FF',
    });
    setShowAddForm(false);
    setIsSubmitting(false);
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
      case 'savings':
        return <Landmark size={20} />;
      case 'credit':
        return <CreditCard size={20} />;
      case 'cash':
        return <DollarSign size={20} />;
      default:
        return <Wallet size={20} />;
    }
  };

  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            {t('accounts')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('totalBalance')}: {formatAmount(totalBalance)}
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
            <span>{t('addAccount')}</span>
          </button>
        </div>
      </div>
      
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 scale-in">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t('addAccount')}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('accountName')}
                </label>
                <input
                  type="text"
                  required
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('accountType')}
                </label>
                <select
                  value={newAccount.type}
                  onChange={(e) => setNewAccount({...newAccount, type: e.target.value as any})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="checking">{t('checking')}</option>
                  <option value="savings">{t('savings')}</option>
                  <option value="credit">{t('credit')}</option>
                  <option value="investment">{t('investment')}</option>
                  <option value="cash">{t('cash')}</option>
                  <option value="other">{t('other')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('balance')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newAccount.balance}
                  onChange={(e) => setNewAccount({...newAccount, balance: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('institution')} ({t('optional')})
                </label>
                <input
                  type="text"
                  value={newAccount.institution || ''}
                  onChange={(e) => setNewAccount({...newAccount, institution: e.target.value})}
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccounts.map((account) => (
          <div 
            key={account.id} 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 card-hover"
          >
            <div className="p-5">
              <div className="flex justify-between">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center" 
                  style={{ backgroundColor: account.color || '#7B61FF' }}
                >
                  <span className="text-white">
                    {getAccountIcon(account.type)}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <p className={`text-xl font-bold ${
                    account.balance < 0 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {formatAmount(account.balance)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {account.lastFour ? `•••• ${account.lastFour}` : ''}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {account.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t(account.type)}
                  </p>
                  {account.institution && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {account.institution}
                      </p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 text-center text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {t('edit')}
                </button>
                <button className="flex-1 py-2 text-center text-sm font-medium border border-purple-600 dark:border-purple-500 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                  {t('viewTransactions')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredAccounts.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery ? t('noAccountsFound') : t('noAccountsYet')}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              {t('addAccount')}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountsPage;