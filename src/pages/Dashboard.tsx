import React, { useEffect } from 'react';
import BalanceCard from '../components/dashboard/BalanceCard';
import AccountsCard from '../components/dashboard/AccountsCard';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import InsightCard from '../components/dashboard/InsightCard';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Add animation classes to elements when component mounts
    const elements = document.querySelectorAll('.dashboard-item');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('fade-in');
      }, index * 100);
    });
  }, []);

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