import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { mockAccounts, mockTransactions, mockBudgets } from '../data/mockData';
import { Account, Transaction, Budget, Category } from '../types/dataTypes';
import { useAuth } from './AuthContext';

interface DataContextType {
  isLoading: boolean;
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  categories: Category[];
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  getTotalBalance: () => number;
  getTotalIncome: (period?: 'day' | 'week' | 'month' | 'year') => number;
  getTotalExpenses: (period?: 'day' | 'week' | 'month' | 'year') => number;
  getExpensesByCategory: (period?: 'day' | 'week' | 'month' | 'year') => Record<string, number>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  
  const categories: Category[] = [
    { id: 'housing', name: 'Housing', color: '#7B61FF', icon: 'Home' },
    { id: 'transportation', name: 'Transportation', color: '#3D5AF1', icon: 'Car' },
    { id: 'food', name: 'Food & Dining', color: '#22C55E', icon: 'UtensilsCrossed' },
    { id: 'utilities', name: 'Utilities', color: '#F97316', icon: 'Lightbulb' },
    { id: 'entertainment', name: 'Entertainment', color: '#EC4899', icon: 'Film' },
    { id: 'healthcare', name: 'Healthcare', color: '#06B6D4', icon: 'Heart' },
    { id: 'shopping', name: 'Shopping', color: '#8B5CF6', icon: 'ShoppingBag' },
    { id: 'personal', name: 'Personal', color: '#F43F5E', icon: 'User' },
    { id: 'education', name: 'Education', color: '#10B981', icon: 'GraduationCap' },
    { id: 'income', name: 'Income', color: '#22C55E', icon: 'ArrowDownLeft' },
    { id: 'savings', name: 'Savings', color: '#6366F1', icon: 'PiggyBank' },
    { id: 'other', name: 'Other', color: '#78716C', icon: 'CircleDashed' },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      // Load saved data from localStorage
      const savedAccounts = localStorage.getItem('accounts');
      const savedTransactions = localStorage.getItem('transactions');
      const savedBudgets = localStorage.getItem('budgets');
      
      setAccounts(savedAccounts ? JSON.parse(savedAccounts) : []);
      setTransactions(savedTransactions ? JSON.parse(savedTransactions) : []);
      setBudgets(savedBudgets ? JSON.parse(savedBudgets) : []);
      
      // Simulate loading delay
      setTimeout(() => setIsLoading(false), 500);
    } else {
      // Clear data on logout
      setAccounts([]);
      setTransactions([]);
      setBudgets([]);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('accounts', JSON.stringify(accounts));
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('budgets', JSON.stringify(budgets));
    }
  }, [accounts, transactions, budgets, isAuthenticated]);

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount: Account = {
      ...account,
      id: Date.now().toString()
    };
    setAccounts(prev => [...prev, newAccount]);
    toast.success('Account added successfully!');
  };

  const updateAccount = (id: string, updates: Partial<Account>) => {
    setAccounts(prev => prev.map(account => 
      account.id === id ? { ...account, ...updates } : account
    ));
    toast.success('Account updated successfully!');
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
    // Also delete associated transactions
    setTransactions(prev => prev.filter(transaction => transaction.accountId !== id));
    toast.success('Account deleted successfully!');
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || new Date().toISOString()
    };
    setTransactions(prev => [...prev, newTransaction]);
    
    // Update account balance
    const amount = transaction.type === 'expense' ? -transaction.amount : transaction.amount;
    updateAccount(transaction.accountId, {
      balance: (accounts.find(a => a.id === transaction.accountId)?.balance || 0) + amount
    });
    toast.success('Transaction added successfully!');
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    const oldTransaction = transactions.find(t => t.id === id);
    if (!oldTransaction) return;

    setTransactions(prev => prev.map(transaction => 
      transaction.id === id ? { ...transaction, ...updates } : transaction
    ));

    // Update account balance if amount or type changed
    if (updates.amount !== undefined || updates.type !== undefined) {
      const oldAmount = oldTransaction.type === 'expense' ? -oldTransaction.amount : oldTransaction.amount;
      const newAmount = (updates.type || oldTransaction.type) === 'expense' ? 
        -(updates.amount || oldTransaction.amount) : 
        (updates.amount || oldTransaction.amount);
      
      updateAccount(oldTransaction.accountId, {
        balance: (accounts.find(a => a.id === oldTransaction.accountId)?.balance || 0) - oldAmount + newAmount
      });
    }
    toast.success('Transaction updated successfully!');
  };

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    setTransactions(prev => prev.filter(t => t.id !== id));
    
    // Update account balance
    const amount = transaction.type === 'expense' ? transaction.amount : -transaction.amount;
    updateAccount(transaction.accountId, {
      balance: (accounts.find(a => a.id === transaction.accountId)?.balance || 0) + amount
    });
    toast.success('Transaction deleted successfully!');
  };

  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget: Budget = {
      ...budget,
      id: Date.now().toString()
    };
    setBudgets(prev => [...prev, newBudget]);
    toast.success('Budget created successfully!');
  };

  const updateBudget = (id: string, updates: Partial<Budget>) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === id ? { ...budget, ...updates } : budget
    ));
    toast.success('Budget updated successfully!');
  };

  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(budget => budget.id !== id));
    toast.success('Budget deleted successfully!');
  };

  const getTotalBalance = (): number => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getDateFilter = (period?: 'day' | 'week' | 'month' | 'year'): Date => {
    const now = new Date();
    
    if (!period) return new Date(0);
    
    switch (period) {
      case 'day':
        return new Date(now.setHours(0, 0, 0, 0));
      case 'week':
        const day = now.getDay();
        return new Date(now.setDate(now.getDate() - day));
      case 'month':
        return new Date(now.setDate(1));
      case 'year':
        return new Date(now.setMonth(0, 1));
      default:
        return new Date(0);
    }
  };

  const getTotalIncome = (period?: 'day' | 'week' | 'month' | 'year'): number => {
    const dateFilter = getDateFilter(period);
    
    return transactions
      .filter(t => t.type === 'income' && new Date(t.date) >= dateFilter)
      .reduce((total, t) => total + t.amount, 0);
  };

  const getTotalExpenses = (period?: 'day' | 'week' | 'month' | 'year'): number => {
    const dateFilter = getDateFilter(period);
    
    return transactions
      .filter(t => t.type === 'expense' && new Date(t.date) >= dateFilter)
      .reduce((total, t) => total + t.amount, 0);
  };

  const getExpensesByCategory = (period?: 'day' | 'week' | 'month' | 'year'): Record<string, number> => {
    const dateFilter = getDateFilter(period);
    
    return transactions
      .filter(t => t.type === 'expense' && new Date(t.date) >= dateFilter)
      .reduce((acc, t) => {
        const category = t.category || 'other';
        acc[category] = (acc[category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);
  };

  return (
    <DataContext.Provider value={{
      isLoading,
      accounts,
      transactions,
      budgets,
      categories,
      addAccount,
      updateAccount,
      deleteAccount,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addBudget,
      updateBudget,
      deleteBudget,
      getTotalBalance,
      getTotalIncome,
      getTotalExpenses,
      getExpensesByCategory
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};