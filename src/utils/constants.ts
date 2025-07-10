// Application Constants

export const APP_CONFIG = {
  name: 'FinTrack',
  version: '1.0.0',
  description: 'Personal Finance Manager',
  author: 'FinTrack Team',
  website: 'https://fintrack.app',
  supportEmail: 'support@fintrack.app',
} as const;

export const API_CONFIG = {
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
} as const;

export const UI_CONFIG = {
  // Animation durations (in milliseconds)
  animations: {
    fast: 150,
    normal: 200,
    slow: 300,
    slower: 500,
  },
  
  // Breakpoints (in pixels)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  
  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },
  
  // Common spacing values (in rem)
  spacing: {
    xs: 0.25,
    sm: 0.5,
    md: 1,
    lg: 1.5,
    xl: 2,
    '2xl': 3,
    '3xl': 4,
  },
} as const;

export const VALIDATION_CONFIG = {
  password: {
    minLength: 6,
    maxLength: 128,
    requireUppercase: false,
    requireLowercase: false,
    requireNumbers: false,
    requireSpecialChars: false,
  },
  
  email: {
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  
  name: {
    minLength: 1,
    maxLength: 100,
  },
  
  currency: {
    minAmount: -999999999.99,
    maxAmount: 999999999.99,
    decimalPlaces: 2,
  },
} as const;

export const STORAGE_KEYS = {
  theme: 'theme',
  language: 'language',
  currency: 'currency',
  accounts: 'accounts',
  transactions: 'transactions',
  budgets: 'budgets',
  notificationPreferences: 'notificationPreferences',
  userPreferences: 'userPreferences',
} as const;

export const ROUTES = {
  dashboard: 'dashboard',
  accounts: 'accounts',
  transactions: 'transactions',
  budgets: 'budgets',
  reports: 'reports',
  settings: 'settings',
  converter: 'converter',
} as const;

export const NOTIFICATION_TYPES = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
} as const;

export const TRANSACTION_TYPES = {
  income: 'income',
  expense: 'expense',
  transfer: 'transfer',
} as const;

export const ACCOUNT_TYPES = {
  checking: 'checking',
  savings: 'savings',
  credit: 'credit',
  investment: 'investment',
  cash: 'cash',
  other: 'other',
} as const;

export const BUDGET_PERIODS = {
  weekly: 'weekly',
  monthly: 'monthly',
  yearly: 'yearly',
} as const;

export const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  CAD: 'CAD',
  AUD: 'AUD',
} as const;

export const PRIORITY_LEVELS = {
  low: 'low',
  medium: 'medium',
  high: 'high',
} as const;

export const NOTIFICATION_CATEGORIES = {
  alerts: 'alerts',
  messages: 'messages',
  updates: 'updates',
  system: 'system',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection and try again.',
  unauthorized: 'You are not authorized to perform this action.',
  forbidden: 'Access denied. Please contact support if you believe this is an error.',
  notFound: 'The requested resource was not found.',
  serverError: 'Server error. Please try again later.',
  validationError: 'Please check your input and try again.',
  rateLimitExceeded: 'Too many requests. Please wait before trying again.',
  sessionExpired: 'Your session has expired. Please log in again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  accountCreated: 'Account created successfully!',
  accountUpdated: 'Account updated successfully!',
  accountDeleted: 'Account deleted successfully!',
  transactionAdded: 'Transaction added successfully!',
  transactionUpdated: 'Transaction updated successfully!',
  transactionDeleted: 'Transaction deleted successfully!',
  budgetCreated: 'Budget created successfully!',
  budgetUpdated: 'Budget updated successfully!',
  budgetDeleted: 'Budget deleted successfully!',
  settingsSaved: 'Settings saved successfully!',
  dataExported: 'Data exported successfully!',
  passwordChanged: 'Password changed successfully!',
  profileUpdated: 'Profile updated successfully!',
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  enableNotifications: true,
  enableDarkMode: true,
  enableMultiCurrency: true,
  enableExport: true,
  enableBudgets: true,
  enableReports: true,
  enableGoals: false, // Future feature
  enableInvestments: false, // Future feature
  enableBankSync: false, // Future feature
} as const;

// Performance thresholds
export const PERFORMANCE_CONFIG = {
  maxTransactionsPerPage: 50,
  maxNotificationsPerPage: 20,
  maxAccountsPerUser: 20,
  maxBudgetsPerUser: 50,
  maxCategoriesPerUser: 30,
  debounceDelay: 300, // milliseconds
  cacheTimeout: 300000, // 5 minutes in milliseconds
} as const;