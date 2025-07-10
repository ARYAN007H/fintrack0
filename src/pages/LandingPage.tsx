import React from 'react';
import { 
  ArrowRight, 
  Shield, 
  BarChart3, 
  Wallet, 
  PieChart, 
  TrendingUp, 
  Globe, 
  Smartphone,
  CheckCircle,
  DollarSign,
  CreditCard,
  Target
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const features = [
    {
      icon: <Wallet size={24} />,
      title: t('multipleAccounts'),
      description: t('connect and manage all your bank accounts, credit cards, and digital wallets in one place')
    },
    {
      icon: <BarChart3 size={24} />,
      title: t('smartBudgeting'),
      description: t('set intelligent budgets and track your spending with real-time alerts and insights')
    },
    {
      icon: <PieChart size={24} />,
      title: t('expenseTracking'),
      description: t('categorize and analyze your expenses with beautiful charts and detailed reports')
    },
    {
      icon: <TrendingUp size={24} />,
      title: t('financialInsights'),
      description: t('get personalized insights and recommendations to improve your financial health')
    },
    {
      icon: <Globe size={24} />,
      title: t('multiCurrency'),
      description: t('support for multiple currencies with real-time exchange rates and conversion')
    },
    {
      icon: <Shield size={24} />,
      title: t('bankLevelSecurity'),
      description: t('your data is protected with enterprise-grade security and encryption')
    }
  ];

  const benefits = [
    t('track expenses automatically'),
    t('set and achieve financial goals'),
    t('get spending insights'),
    t('manage multiple currencies'),
    t('secure data encryption'),
    t('beautiful reports and charts')
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
      {/* Header */}
      <header className="relative z-10 px-4 py-6 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <DollarSign size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              FinTrack
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {t('features')}
            </a>
            <a href="#benefits" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {t('benefits')}
            </a>
            <a href="#security" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {t('security')}
            </a>
          </nav>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
             className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {t('login')}
            </button>
            <button
              onClick={onGetStarted}
             className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {t('getStarted')}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                All your{' '}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  money
                </span>
                <br />
                in one place
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t('heroDescription')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onGetStarted}
                 className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  {t('getStarted')}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={onLogin}
                 className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-600 dark:hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  {t('login')}
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{t('totalBalance')}</h3>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">$32,549.00</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('checking')}</span>
                    <span className="font-medium text-gray-800 dark:text-white">$12,450.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('savings')}</span>
                    <span className="font-medium text-gray-800 dark:text-white">$18,299.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('investment')}</span>
                    <span className="font-medium text-gray-800 dark:text-white">$1,800.00</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-4 shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                <CreditCard size={24} className="text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <TrendingUp size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-16 md:py-24 md:px-6 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('powerfulFeatures')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('featuresDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="px-4 py-16 md:py-24 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('whyChooseFinTrack')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t('benefitsDescription')}
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <Target size={32} />
                  <div>
                    <h3 className="text-xl font-semibold">{t('monthlyGoal')}</h3>
                    <p className="text-purple-100">{t('savingsTarget')}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>$2,400 / $3,000</span>
                    <span>80%</span>
                  </div>
                  <div className="h-3 bg-purple-800 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full w-4/5 transition-all duration-1000"></div>
                  </div>
                </div>
                
                <p className="text-purple-100 text-sm">
                  {t('goalProgress')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="px-4 py-16 md:py-24 md:px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <Shield size={48} className="mx-auto text-purple-600 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('bankLevelSecurity')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('securityDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('encryption')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('encryptionDescription')}
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('twoFactorAuth')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('twoFactorDescription')}
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('compliance')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('complianceDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24 md:px-6 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('readyToStart')}
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            {t('ctaDescription')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
             className="group px-8 py-4 bg-white text-purple-600 hover:bg-gray-50 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
            >
              {t('startFree')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={onLogin}
             className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
            >
              {t('signIn')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 md:px-6 bg-gray-900 dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <DollarSign size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">FinTrack</span>
            </div>
            
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">{t('privacy')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('terms')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('contact')}</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 FinTrack. {t('all rights reserved')}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;