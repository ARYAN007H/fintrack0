import React, { useEffect } from 'react';
import QuickActions from '../components/ui/QuickActions';
import { SkeletonCard, SkeletonChart } from '../components/ui/SkeletonLoader';
import BalanceCard from '../components/dashboard/BalanceCard';
import AccountsCard from '../components/dashboard/AccountsCard';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import InsightCard from '../components/dashboard/InsightCard';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { isLoading } = useData();

  useEffect(() => {
    // Add animation classes to elements when component mounts
    const elements = document.querySelectorAll('.dashboard-item');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('fade-in');
      }, index * 100);
    });
  }, []);

  const handleQuickAction = (action: string) => {
    if (onNavigate) {
      switch (action) {
        case 'add-account':
          onNavigate('accounts');
          break;
        case 'add-transaction':
          onNavigate('transactions');
          break;
        case 'add-budget':
          onNavigate('budgets');
          break;
        case 'view-reports':
          onNavigate('reports');
          break;
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="fade-in">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SkeletonCard className="lg:col-span-2" />
          <SkeletonCard />
        </div>

        <SkeletonChart />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="fade-in">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Hello, {user?.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Here's an overview of your finances
        </p>
      </div>

      <div className="dashboard-item opacity-0">
        <QuickActions
          onAddAccount={() => handleQuickAction('add-account')}
          onAddTransaction={() => handleQuickAction('add-transaction')}
          onAddBudget={() => handleQuickAction('add-budget')}
          onViewReports={() => handleQuickAction('view-reports')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="dashboard-item opacity-0">
          <BalanceCard />
        </div>
        <div className="dashboard-item opacity-0">
          <BudgetProgress />
        </div>
        <div className="dashboard-item opacity-0">
          <InsightCard />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="dashboard-item opacity-0 lg:col-span-2">
          <RecentTransactions />
        </div>
        <div className="dashboard-item opacity-0">
          <AccountsCard />
        </div>
      </div>

      <div className="dashboard-item opacity-0">
        <ExpenseChart />
      </div>
    </div>
  );
};

export default Dashboard;