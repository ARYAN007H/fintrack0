import React from 'react';
import { useAuth } from '../context/AuthContext';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import AccountsPage from '../pages/AccountsPage';
import TransactionsPage from '../pages/TransactionsPage';
import BudgetsPage from '../pages/BudgetsPage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Layout from '../components/layout/Layout';
import CurrencyConverter from '../pages/CurrencyConverter';

// Simple router implementation since we don't have react-router available
const AppRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = React.useState<string>('dashboard');
  const [authPage, setAuthPage] = React.useState<'landing' | 'login' | 'register'>('landing');

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-indigo-950">
        {authPage === 'landing' ? (
          <LandingPage 
            onGetStarted={() => setAuthPage('register')} 
            onLogin={() => setAuthPage('login')} 
          />
        ) : authPage === 'login' ? (
          <LoginPage onNavigate={() => setAuthPage('register')} />
        ) : (
          <RegisterPage onNavigate={() => setAuthPage('login')} />
        )}
      </div>
    );
  }

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
      {currentPage === 'accounts' && <AccountsPage />}
      {currentPage === 'transactions' && <TransactionsPage />}
      {currentPage === 'budgets' && <BudgetsPage />}
      {currentPage === 'reports' && <ReportsPage />}
      {currentPage === 'settings' && <SettingsPage />}
      {currentPage === 'converter' && <CurrencyConverter />}
    </Layout>
  );
};

export default AppRouter;