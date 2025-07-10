import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useData } from '../context/DataContext';

const ReportsPage: React.FC = () => {
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();
  const { transactions, categories, getTotalIncome, getTotalExpenses } = useData();
  
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [chartType, setChartType] = useState<'income-expense' | 'categories'>('income-expense');
  
  // Mocked chart data - in a real app, we would use a chart library like Chart.js or Recharts
  const getMonthNames = () => {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  };
  
  const getWeekDays = () => {
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  };
  
  const getPeriodLabels = () => {
    switch (period) {
      case 'week':
        return getWeekDays();
      case 'year':
        return getMonthNames();
      default:
        // For month, use last 30 days in 5-day increments
        return ['1', '5', '10', '15', '20', '25', '30'];
    }
  };

  const labels = getPeriodLabels();
  
  // Mock data for charts
  const incomeData = [4200, 3800, 5100, 4700, 5300, 6200, 5800];
  const expenseData = [3200, 3500, 2900, 3700, 3100, 2800, 3400];
  
  const getCategoryData = () => {
    return categories
      .filter(category => category.id !== 'income')
      .map(category => ({
        id: category.id,
        name: t(category.name),
        color: category.color,
        value: Math.floor(Math.random() * 2000) + 500 // Random data for demo
      }))
      .sort((a, b) => b.value - a.value);
  };
  
  const categoryData = getCategoryData();
  
  const getTotalIncomePeriod = () => {
    return getTotalIncome(period);
  };
  
  const getTotalExpensesPeriod = () => {
    return getTotalExpenses(period);
  };
  
  const getSavings = () => {
    return getTotalIncomePeriod() - getTotalExpensesPeriod();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('reports')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('analyze your financial data')}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-between">
        <div className="flex items-center">
          <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5">
            <button
              onClick={() => setChartType('income-expense')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                chartType === 'income-expense'
                  ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              {t('income')} & {t('expenses')}
            </button>
            <button
              onClick={() => setChartType('categories')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                chartType === 'categories'
                  ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              {t('categories')}
            </button>
          </div>
        </div>
        
        <div className="flex overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5">
          <button
            onClick={() => setPeriod('week')}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
              period === 'week'
                ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm transform scale-105'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-600/50'
            }`}
          >
            {t('week')}
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
              period === 'month'
                ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm transform scale-105'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-600/50'
            }`}
          >
            {t('month')}
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
              period === 'year'
                ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm transform scale-105'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-600/50'
            }`}
          >
            {t('year')}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t('income')}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatAmount(getTotalIncomePeriod())}
          </p>
          <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
            <span className="font-medium">+12.5%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">vs {t('previous')} {t(period)}</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t('expenses')}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatAmount(getTotalExpensesPeriod())}
          </p>
          <div className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400">
            <span className="font-medium">+5.2%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">vs {t('previous')} {t(period)}</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t('savings')}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatAmount(getSavings())}
          </p>
          <div className="mt-2 flex items-center text-sm text-blue-600 dark:text-blue-400">
            <span className="font-medium">+7.3%</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">vs {t('previous')} {t(period)}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden p-6 transition-all duration-300 hover:shadow-md">
        {chartType === 'income-expense' ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
              {t('income')} & {t('expenses')}
            </h3>
            
            <div className="h-80 chart-container">
              {/* In a real app, this would be a chart component */}
              <div className="h-full flex items-end justify-between gap-2">
                {labels.map((label, index) => (
                  <div key={label} className="flex flex-col items-center">
                    <div className="w-full flex flex-col items-center gap-1">
                      <div 
                        className="w-8 bg-green-500 dark:bg-green-400 rounded-t transition-all duration-500" 
                        style={{ height: `${(incomeData[index] / 6500) * 100}%` }}
                      ></div>
                      <div 
                        className="w-8 bg-red-500 dark:bg-red-400 rounded-t transition-all duration-500" 
                        style={{ height: `${(expenseData[index] / 6500) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-400"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{t('income')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 dark:bg-red-400"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{t('expenses')}</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
              {t('expenses by category')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80 chart-container">
                {/* In a real app, this would be a pie chart component */}
                <div className="relative h-full w-full flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {categoryData.map((category, index) => {
                        const total = categoryData.reduce((sum, c) => sum + c.value, 0);
                        const percentage = (category.value / total) * 100;
                        
                        // For a simple visualization, just showing colored segments
                        const startAngle = index === 0 ? 0 : categoryData.slice(0, index).reduce((sum, c) => sum + (c.value / total) * 360, 0);
                        const endAngle = startAngle + (category.value / total) * 360;
                        
                        // Convert angles to radians and calculate points
                        const startRad = (startAngle - 90) * Math.PI / 180;
                        const endRad = (endAngle - 90) * Math.PI / 180;
                        
                        const x1 = 50 + 40 * Math.cos(startRad);
                        const y1 = 50 + 40 * Math.sin(startRad);
                        const x2 = 50 + 40 * Math.cos(endRad);
                        const y2 = 50 + 40 * Math.sin(endRad);
                        
                        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                        
                        return (
                          <path 
                            key={category.id}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={category.color}
                            className="transition-all duration-500"
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {categoryData.map((category) => {
                  const total = categoryData.reduce((sum, c) => sum + c.value, 0);
                  const percentage = ((category.value / total) * 100).toFixed(1);
                  
                  return (
                    <div key={category.id}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {category.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {percentage}%
                          </span>
                          <span className="text-sm font-medium text-gray-800 dark:text-white">
                            {formatAmount(category.value)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: category.color
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {t('export options')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-sm">
            <p className="font-medium text-gray-800 dark:text-white">{t('export as CSV')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('for spreadsheets')}</p>
          </button>
          
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-sm">
            <p className="font-medium text-gray-800 dark:text-white">{t('export as PDF')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('for printing')}</p>
          </button>
          
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-sm">
            <p className="font-medium text-gray-800 dark:text-white">{t('monthly report')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('detailed summary')}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;