import { CurrencyCode } from '../context/CurrencyContext';

// Mocked exchange rates for development
const mockedRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.42,
  CAD: 1.25,
  AUD: 1.35
};

// In a real app, this would fetch from an API like Open Exchange Rates or Fixer.io
export const fetchExchangeRates = async (): Promise<Record<CurrencyCode, number>> => {
  try {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockedRates);
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return mockedRates; // Fallback to mocked rates
  }
};

export const convertCurrency = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  rates: Record<CurrencyCode, number>
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert from source currency to USD (base currency)
  const amountInUSD = fromCurrency === 'USD' ? amount : amount / rates[fromCurrency];
  
  // Convert from USD to target currency
  return toCurrency === 'USD' ? amountInUSD : amountInUSD * rates[toCurrency];
};