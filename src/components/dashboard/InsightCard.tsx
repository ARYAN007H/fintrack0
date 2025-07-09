import React from 'react';
import { Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useData } from '../../context/DataContext';

const InsightCard: React.FC = () => {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { getTotalIncome, getTotalExpenses, transactions } = useData();
  
  // Calculate monthly income and expenses
  const monthlyIncome = getTotalIncome('month');
  const monthlyExpenses = getTotalExpenses('month');
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;
  
  // Get largest expense category this month
  const getTopExpenseCategory = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const expensesByCategory: Record<string, number> = {};
    
    transactions
      .filter(t => t.type === 'expense' && new Date(t.date) >= startOfMonth)
      .forEach(t => {
        const category = t.category || 'other';
        expensesByCategory[category] = (expensesByCategory[category] || 0) + t.amount;
      });
    
    let topCategory = 'other';
    let topAmount = 0;
    
    Object.entries(expensesByCategory).forEach(([category, amount]) => {
      if (amount > topAmount) {
        topCategory = category;
        topAmount = amount;
      }
    });
    
    return { category: topCategory, amount: topAmount };
  };
  
  const topExpense = getTopExpenseCategory();

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl overflow-hidden transition-all duration-300 card-hover">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-white">{t('monthlySummary')}</h2>
          <div className="p-2 bg-white/20 rounded-full">
            <Zap size={20} className="text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-indigo-100">{t('savings rate')}</p>
            <p className="text-2xl font-bold text-white mt-1">
              {savingsRate.toFixed(1)}%
            </p>
          </div>
          
          <div className="flex gap-8">
            <div>
              <p className="text-sm text-indigo-100">{t('monthlyExpenses')}</p>
              <p className="text-xl font-semibold text-white mt-1">
                {formatAmount(monthlyExpenses)}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-indigo-100">{t('top category')}</p>
              <p className="text-xl font-semibold text-white mt-1">
                {t(topExpense.category)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;