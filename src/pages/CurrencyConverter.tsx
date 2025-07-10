import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency, CurrencyCode } from '../context/CurrencyContext';

const CurrencyConverter: React.FC = () => {
  const { t } = useLanguage();
  const { supportedCurrencies, exchangeRates, convertAmount } = useCurrency();
  
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  useEffect(() => {
    handleConvert();
  }, [fromCurrency, toCurrency]); // Auto-convert when currencies change

  const handleConvert = () => {
    setIsConverting(true);
    
    // Add a small delay to show the loading indicator
    setTimeout(() => {
      const amountNum = parseFloat(amount) || 0;
      const result = convertAmount(amountNum, fromCurrency, toCurrency);
      setConvertedAmount(result);
      setIsConverting(false);
    }, 500);
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const getCurrencySymbol = (code: CurrencyCode): string => {
    const currency = supportedCurrencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('currencyConverter')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('convert between different currencies')}
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('amount')}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                  />
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('from')}
                    </label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value as CurrencyCode)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {supportedCurrencies.map((curr) => (
                        <option key={curr.code} value={curr.code}>
                          {curr.symbol} - {curr.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-end justify-center pb-1.5">
                    <Button
                      onClick={handleSwapCurrencies}
                      variant="secondary"
                      size="sm"
                      className="p-2 rounded-full"
                      aria-label={t('swap currencies')}
                    >
                      <ArrowRight size={20} className="text-gray-500 dark:text-gray-400" />
                    </Button>
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('to')}
                    </label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value as CurrencyCode)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {supportedCurrencies.map((curr) => (
                        <option key={curr.code} value={curr.code}>
                          {curr.symbol} - {curr.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Button
                  onClick={handleConvert}
                  disabled={isConverting}
                  loading={isConverting}
                  variant="primary"
                  className="w-full mt-2"
                >
                  <RefreshCw size={20} className={isConverting ? 'animate-spin' : ''} />
                  {isConverting ? t('converting') : t('convert')}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 pt-6 lg:pt-0 lg:pl-8">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {t('converted amount')}
                </h3>
                
                <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 md:p-8">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {isConverting ? (
                      <span className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></span>
                    ) : (
                      <>
                        {getCurrencySymbol(toCurrency)}{convertedAmount.toFixed(2)}
                      </>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    1 {fromCurrency} = {exchangeRates[toCurrency] / exchangeRates[fromCurrency]} {toCurrency}
                  </p>
                  
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {t('rates last updated')}: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t('popular currency pairs')}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { from: 'USD', to: 'EUR' },
              { from: 'USD', to: 'GBP' },
              { from: 'EUR', to: 'GBP' },
              { from: 'USD', to: 'JPY' },
              { from: 'EUR', to: 'USD' },
              { from: 'GBP', to: 'USD' }
            ].map((pair, index) => {
              const rate = exchangeRates[pair.to as CurrencyCode] / exchangeRates[pair.from as CurrencyCode];
              
              return (
                <div 
                  key={index}
                  className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
                  tabIndex={0}
                  role="button"
                  onClick={() => {
                    setFromCurrency(pair.from as CurrencyCode);
                    setToCurrency(pair.to as CurrencyCode);
                  }}
                >
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-800 dark:text-white">{pair.from}</span>
                    <ArrowRight size={16} className="mx-2 text-gray-400" />
                    <span className="text-lg font-medium text-gray-800 dark:text-white">{pair.to}</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{rate.toFixed(4)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;