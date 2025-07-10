// Comprehensive validation utilities

import { VALIDATION_CONFIG } from './constants';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ValidationRule<T = any> {
  validate: (value: T) => boolean;
  message: string;
}

/**
 * Email validation
 */
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else {
    if (email.length > VALIDATION_CONFIG.email.maxLength) {
      errors.push(`Email must be less than ${VALIDATION_CONFIG.email.maxLength} characters`);
    }
    
    if (!VALIDATION_CONFIG.email.pattern.test(email)) {
      errors.push('Please enter a valid email address');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Password validation
 */
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  const config = VALIDATION_CONFIG.password;
  
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < config.minLength) {
      errors.push(`Password must be at least ${config.minLength} characters long`);
    }
    
    if (password.length > config.maxLength) {
      errors.push(`Password must be less than ${config.maxLength} characters long`);
    }
    
    if (config.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (config.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (config.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (config.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Name validation
 */
export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];
  const config = VALIDATION_CONFIG.name;
  
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  } else {
    const trimmedName = name.trim();
    
    if (trimmedName.length < config.minLength) {
      errors.push(`Name must be at least ${config.minLength} character long`);
    }
    
    if (trimmedName.length > config.maxLength) {
      errors.push(`Name must be less than ${config.maxLength} characters long`);
    }
    
    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    if (!/^[a-zA-Z\s\-']+$/.test(trimmedName)) {
      errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Currency amount validation
 */
export const validateAmount = (amount: number | string): ValidationResult => {
  const errors: string[] = [];
  const config = VALIDATION_CONFIG.currency;
  
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    errors.push('Please enter a valid amount');
  } else {
    if (numericAmount < config.minAmount) {
      errors.push(`Amount cannot be less than ${config.minAmount}`);
    }
    
    if (numericAmount > config.maxAmount) {
      errors.push(`Amount cannot be greater than ${config.maxAmount}`);
    }
    
    // Check decimal places
    const decimalPlaces = (numericAmount.toString().split('.')[1] || '').length;
    if (decimalPlaces > config.decimalPlaces) {
      errors.push(`Amount can have at most ${config.decimalPlaces} decimal places`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Required field validation
 */
export const validateRequired = (value: any, fieldName: string): ValidationResult => {
  const errors: string[] = [];
  
  if (value === null || value === undefined || value === '') {
    errors.push(`${fieldName} is required`);
  } else if (typeof value === 'string' && value.trim().length === 0) {
    errors.push(`${fieldName} is required`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Date validation
 */
export const validateDate = (date: string | Date, options: {
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  fieldName?: string;
} = {}): ValidationResult => {
  const errors: string[] = [];
  const { required = false, minDate, maxDate, fieldName = 'Date' } = options;
  
  if (!date) {
    if (required) {
      errors.push(`${fieldName} is required`);
    }
    return { isValid: errors.length === 0, errors };
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    errors.push(`Please enter a valid ${fieldName.toLowerCase()}`);
  } else {
    if (minDate && dateObj < minDate) {
      errors.push(`${fieldName} cannot be before ${minDate.toLocaleDateString()}`);
    }
    
    if (maxDate && dateObj > maxDate) {
      errors.push(`${fieldName} cannot be after ${maxDate.toLocaleDateString()}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * URL validation
 */
export const validateUrl = (url: string, options: {
  required?: boolean;
  protocols?: string[];
} = {}): ValidationResult => {
  const errors: string[] = [];
  const { required = false, protocols = ['http', 'https'] } = options;
  
  if (!url) {
    if (required) {
      errors.push('URL is required');
    }
    return { isValid: errors.length === 0, errors };
  }
  
  try {
    const urlObj = new URL(url);
    
    if (!protocols.includes(urlObj.protocol.slice(0, -1))) {
      errors.push(`URL must use one of these protocols: ${protocols.join(', ')}`);
    }
  } catch {
    errors.push('Please enter a valid URL');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Phone number validation
 */
export const validatePhoneNumber = (phone: string, options: {
  required?: boolean;
  countryCode?: string;
} = {}): ValidationResult => {
  const errors: string[] = [];
  const { required = false, countryCode = 'US' } = options;
  
  if (!phone) {
    if (required) {
      errors.push('Phone number is required');
    }
    return { isValid: errors.length === 0, errors };
  }
  
  // Remove all non-digit characters for validation
  const cleaned = phone.replace(/\D/g, '');
  
  switch (countryCode) {
    case 'US':
      if (cleaned.length !== 10 && !(cleaned.length === 11 && cleaned[0] === '1')) {
        errors.push('Please enter a valid US phone number');
      }
      break;
    default:
      // Basic validation for other countries
      if (cleaned.length < 7 || cleaned.length > 15) {
        errors.push('Please enter a valid phone number');
      }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Generic validation function that applies multiple rules
 */
export const validateField = <T>(
  value: T,
  rules: ValidationRule<T>[],
  fieldName: string
): ValidationResult => {
  const errors: string[] = [];
  
  for (const rule of rules) {
    if (!rule.validate(value)) {
      errors.push(rule.message.replace('{field}', fieldName));
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate entire form object
 */
export const validateForm = (
  data: Record<string, any>,
  schema: Record<string, ValidationRule<any>[]>
): { isValid: boolean; errors: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};
  let isValid = true;
  
  for (const [fieldName, rules] of Object.entries(schema)) {
    const fieldValue = data[fieldName];
    const fieldValidation = validateField(fieldValue, rules, fieldName);
    
    if (!fieldValidation.isValid) {
      errors[fieldName] = fieldValidation.errors;
      isValid = false;
    }
  }
  
  return { isValid, errors };
};

/**
 * Common validation rules
 */
export const validationRules = {
  required: <T>(fieldName: string): ValidationRule<T> => ({
    validate: (value: T) => {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      return true;
    },
    message: `${fieldName} is required`,
  }),
  
  minLength: (min: number): ValidationRule<string> => ({
    validate: (value: string) => !value || value.length >= min,
    message: `{field} must be at least ${min} characters long`,
  }),
  
  maxLength: (max: number): ValidationRule<string> => ({
    validate: (value: string) => !value || value.length <= max,
    message: `{field} must be less than ${max} characters long`,
  }),
  
  pattern: (regex: RegExp, message: string): ValidationRule<string> => ({
    validate: (value: string) => !value || regex.test(value),
    message,
  }),
  
  min: (min: number): ValidationRule<number> => ({
    validate: (value: number) => value >= min,
    message: `{field} must be at least ${min}`,
  }),
  
  max: (max: number): ValidationRule<number> => ({
    validate: (value: number) => value <= max,
    message: `{field} must be at most ${max}`,
  }),
  
  email: (): ValidationRule<string> => ({
    validate: (value: string) => !value || VALIDATION_CONFIG.email.pattern.test(value),
    message: 'Please enter a valid email address',
  }),
  
  numeric: (): ValidationRule<string> => ({
    validate: (value: string) => !value || !isNaN(Number(value)),
    message: '{field} must be a valid number',
  }),
  
  integer: (): ValidationRule<string> => ({
    validate: (value: string) => !value || (Number.isInteger(Number(value)) && !value.includes('.')),
    message: '{field} must be a whole number',
  }),
  
  positive: (): ValidationRule<number> => ({
    validate: (value: number) => value > 0,
    message: '{field} must be a positive number',
  }),
  
  nonNegative: (): ValidationRule<number> => ({
    validate: (value: number) => value >= 0,
    message: '{field} cannot be negative',
  }),
};

/**
 * Debounced validation for real-time form validation
 */
export const createDebouncedValidator = (
  validator: (value: any) => ValidationResult,
  delay: number = 300
) => {
  let timeoutId: NodeJS.Timeout;
  
  return (value: any, callback: (result: ValidationResult) => void) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const result = validator(value);
      callback(result);
    }, delay);
  };
};