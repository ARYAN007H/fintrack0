// Account Types
export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'cash' | 'other';
  balance: number;
  currency: string;
  color?: string;
  icon?: string;
  institution?: string;
  lastFour?: string;
  isHidden?: boolean;
}

// Transaction Types
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  category?: string;
  accountId: string;
  type: 'income' | 'expense' | 'transfer';
  isRecurring?: boolean;
  notes?: string;
  tags?: string[];
}

// Budget Types
export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: string;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: string;
  endDate?: string;
  color?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  parentId?: string;
}

// Financial Goal Types
export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  category: string;
  color?: string;
  icon?: string;
}

// Recurring Transaction
export interface RecurringTransaction {
  id: string;
  name: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate?: string;
  category: string;
  accountId: string;
  type: 'income' | 'expense';
}

// Chart Data Types
export interface ChartDataPoint {
  date: string;
  value: number;
  category?: string;
}

export interface PieChartData {
  label: string;
  value: number;
  color: string;
}

export interface LineChartData {
  label: string;
  data: ChartDataPoint[];
}

export interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}