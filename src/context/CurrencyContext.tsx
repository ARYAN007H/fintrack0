import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchExchangeRates } from '../services/currencyService';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  exchangeRates: Record<CurrencyCode, number>;
  formatAmount: (amount: number, targetCurrency?: CurrencyCode) => string;
  convertAmount: (amount: number, from: CurrencyCode, to: CurrencyCode) => number;
  supportedCurrencies: { code: CurrencyCode; name: string; symbol: string }[];
}

const defaultRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.42,
  CAD: 1.25,
  AUD: 1.35
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    return (localStorage.getItem('currency') as CurrencyCode) || 'USD';
  });
  
  const [exchangeRates, setExchangeRates] = useState<Record<CurrencyCode, number>>(defaultRates);

  const supportedCurrencies = [
    { code: 'USD' as CurrencyCode, name: 'US Dollar', symbol: '$' },
    { code: 'EUR' as CurrencyCode, name: 'Euro', symbol: '€' },
    { code: 'GBP' as CurrencyCode, name: 'British Pound', symbol: '£' },
    { code: 'JPY' as CurrencyCode, name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD' as CurrencyCode, name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD' as CurrencyCode, name: 'Australian Dollar', symbol: 'A$' }
  ];

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  useEffect(() => {
    const loadExchangeRates = async () => {
      try {
        const rates = await fetchExchangeRates();
        setExchangeRates(rates);
      } catch (error) {
        console.error('Failed to load exchange rates:', error);
      }
    };
    
    loadExchangeRates();
    const interval = setInterval(loadExchangeRates, 24 * 60 * 60 * 1000); // Refresh daily
    
    return () => clearInterval(interval);
  }, []);

  const getCurrencySymbol = (code: CurrencyCode): string => {
    const currency = supportedCurrencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };

  const formatAmount = (amount: number, targetCurrency: CurrencyCode = currency): string => {
    const convertedAmount = convertAmount(amount, 'USD', targetCurrency);
    const symbol = getCurrencySymbol(targetCurrency);
    
    return `${symbol}${convertedAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const convertAmount = (amount: number, from: CurrencyCode, to: CurrencyCode): number => {
    if (from === to) return amount;
    
    // Convert from source currency to USD (base currency)
    const amountInUSD = from === 'USD' ? amount : amount / exchangeRates[from];
    
    // Convert from USD to target currency
    return to === 'USD' ? amountInUSD : amountInUSD * exchangeRates[to];
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        setCurrency, 
        exchangeRates, 
        formatAmount, 
        convertAmount,
        supportedCurrencies
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};