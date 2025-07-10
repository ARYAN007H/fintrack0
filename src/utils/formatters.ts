// Utility functions for consistent formatting across the application

import { CURRENCIES, UI_CONFIG } from './constants';
import type { CurrencyCode } from '../context/CurrencyContext';

/**
 * Format currency amounts with proper localization
 */
export const formatCurrency = (
  amount: number,
  currency: CurrencyCode = 'USD',
  locale: string = 'en-US'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback formatting
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${amount.toFixed(2)}`;
  }
};

/**
 * Get currency symbol for a given currency code
 */
export const getCurrencySymbol = (currency: CurrencyCode): string => {
  const symbols: Record<CurrencyCode, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
  };
  return symbols[currency] || '$';
};

/**
 * Format numbers with proper thousand separators
 */
export const formatNumber = (
  value: number,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    locale?: string;
  } = {}
): string => {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    locale = 'en-US',
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(value);
  } catch (error) {
    return value.toFixed(maximumFractionDigits);
  }
};

/**
 * Format percentages
 */
export const formatPercentage = (
  value: number,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    locale?: string;
  } = {}
): string => {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 1,
    locale = 'en-US',
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(value / 100);
  } catch (error) {
    return `${value.toFixed(maximumFractionDigits)}%`;
  }
};

/**
 * Format dates with consistent styling
 */
export const formatDate = (
  date: string | Date,
  options: {
    style?: 'short' | 'medium' | 'long' | 'full';
    locale?: string;
    includeTime?: boolean;
  } = {}
): string => {
  const { style = 'medium', locale = 'en-US', includeTime = false } = options;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  try {
    const formatOptions: Intl.DateTimeFormatOptions = {};
    
    switch (style) {
      case 'short':
        formatOptions.month = 'short';
        formatOptions.day = 'numeric';
        break;
      case 'medium':
        formatOptions.year = 'numeric';
        formatOptions.month = 'short';
        formatOptions.day = 'numeric';
        break;
      case 'long':
        formatOptions.year = 'numeric';
        formatOptions.month = 'long';
        formatOptions.day = 'numeric';
        break;
      case 'full':
        formatOptions.weekday = 'long';
        formatOptions.year = 'numeric';
        formatOptions.month = 'long';
        formatOptions.day = 'numeric';
        break;
    }

    if (includeTime) {
      formatOptions.hour = '2-digit';
      formatOptions.minute = '2-digit';
    }

    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  } catch (error) {
    return dateObj.toLocaleDateString();
  }
};

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 */
export const formatRelativeTime = (
  date: string | Date,
  options: {
    locale?: string;
    style?: 'long' | 'short' | 'narrow';
  } = {}
): string => {
  const { locale = 'en-US', style = 'long' } = options;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  // Handle invalid dates
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  // Use Intl.RelativeTimeFormat if available
  if ('RelativeTimeFormat' in Intl) {
    try {
      const rtf = new Intl.RelativeTimeFormat(locale, { style });
      
      const intervals = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 },
      ] as const;

      for (const interval of intervals) {
        const count = Math.floor(Math.abs(diffInSeconds) / interval.seconds);
        if (count >= 1) {
          return rtf.format(diffInSeconds > 0 ? -count : count, interval.unit);
        }
      }
      
      return rtf.format(0, 'second');
    } catch (error) {
      // Fallback to manual formatting
    }
  }

  // Fallback formatting
  const absSeconds = Math.abs(diffInSeconds);
  const isFuture = diffInSeconds < 0;
  
  if (absSeconds < 60) {
    return isFuture ? 'in a few seconds' : 'just now';
  } else if (absSeconds < 3600) {
    const minutes = Math.floor(absSeconds / 60);
    return isFuture ? `in ${minutes}m` : `${minutes}m ago`;
  } else if (absSeconds < 86400) {
    const hours = Math.floor(absSeconds / 3600);
    return isFuture ? `in ${hours}h` : `${hours}h ago`;
  } else {
    const days = Math.floor(absSeconds / 86400);
    return isFuture ? `in ${days}d` : `${days}d ago`;
  }
};

/**
 * Format file sizes
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (
  text: string,
  maxLength: number,
  options: {
    ellipsis?: string;
    wordBoundary?: boolean;
  } = {}
): string => {
  const { ellipsis = '...', wordBoundary = true } = options;
  
  if (text.length <= maxLength) {
    return text;
  }
  
  let truncated = text.slice(0, maxLength - ellipsis.length);
  
  if (wordBoundary) {
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      truncated = truncated.slice(0, lastSpace);
    }
  }
  
  return truncated + ellipsis;
};

/**
 * Format phone numbers
 */
export const formatPhoneNumber = (
  phoneNumber: string,
  countryCode: string = 'US'
): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format based on country code
  switch (countryCode) {
    case 'US':
      if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      } else if (cleaned.length === 11 && cleaned[0] === '1') {
        return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
      }
      break;
    // Add more country formats as needed
  }
  
  return phoneNumber; // Return original if no format matches
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (text: string): string => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Convert camelCase to Title Case
 */
export const camelToTitle = (text: string): string => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

/**
 * Format account numbers with masking
 */
export const formatAccountNumber = (
  accountNumber: string,
  options: {
    maskLength?: number;
    visibleDigits?: number;
    maskChar?: string;
  } = {}
): string => {
  const { maskLength = 4, visibleDigits = 4, maskChar = '•' } = options;
  
  if (accountNumber.length <= visibleDigits) {
    return accountNumber;
  }
  
  const visiblePart = accountNumber.slice(-visibleDigits);
  const mask = maskChar.repeat(maskLength);
  
  return `${mask}${visiblePart}`;
};

/**
 * Format validation errors consistently
 */
export const formatValidationError = (
  field: string,
  error: string
): string => {
  const fieldName = camelToTitle(field);
  return `${fieldName}: ${error}`;
};

/**
 * Format API error messages
 */
export const formatApiError = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  if (error?.error?.message) {
    return error.error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Format loading states consistently
 */
export const getLoadingText = (action: string): string => {
  const actionMap: Record<string, string> = {
    save: 'Saving...',
    load: 'Loading...',
    delete: 'Deleting...',
    update: 'Updating...',
    create: 'Creating...',
    upload: 'Uploading...',
    download: 'Downloading...',
    process: 'Processing...',
    convert: 'Converting...',
    calculate: 'Calculating...',
  };
  
  return actionMap[action.toLowerCase()] || `${capitalizeWords(action)}...`;
};