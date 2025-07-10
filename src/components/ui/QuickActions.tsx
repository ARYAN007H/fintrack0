import React from 'react';
import { Plus, CreditCard, Receipt, PieChart, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface QuickActionsProps {
  onAddAccount: () => void;
  onAddTransaction: () => void;
  onAddBudget: () => void;
  onViewReports: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onAddAccount,
  onAddTransaction,
  onAddBudget,
  onViewReports
}) => {
  const { t } = useLanguage();

  const actions = [
    {
      id: 'add-transaction',
      label: t('addTransaction'),
      icon: <Receipt size={20} />,
      onClick: onAddTransaction,
      color: 'bg-green-500 hover:bg-green-600',
      description: t('record income or expense')
    },
    {
      id: 'add-account',
      label: t('addAccount'),
      icon: <CreditCard size={20} />,
      onClick: onAddAccount,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: t('connect a new account')
    },
    {
      id: 'add-budget',
      label: t('addBudget'),
      icon: <PieChart size={20} />,
      onClick: onAddBudget,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: t('set spending limits')
    },
    {
      id: 'view-reports',
      label: t('viewReports'),
      icon: <TrendingUp size={20} />,
      onClick: onViewReports,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: t('analyze your finances')
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {t('quickActions')}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {action.icon}
              </div>
              <h3 className="font-medium text-gray-800 dark:text-white mb-1">
                {action.label}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;