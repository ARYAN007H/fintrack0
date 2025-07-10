import { useState, useCallback, useEffect } from 'react';
import { ValidationResult, validateForm, ValidationRule } from '../utils/validation';

interface FormField {
  value: any;
  error: string | null;
  touched: boolean;
  rules: ValidationRule<any>[];
}

interface UseFormValidationOptions {
  initialValues: Record<string, any>;
  validationSchema: Record<string, ValidationRule<any>[]>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
}

interface UseFormValidationReturn {
  values: Record<string, any>;
  errors: Record<string, string | null>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (field: string, value: any) => void;
  setError: (field: string, error: string | null) => void;
  setTouched: (field: string, touched: boolean) => void;
  validateField: (field: string) => void;
  validateForm: () => boolean;
  handleChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (field: string) => () => void;
  handleSubmit: (event: React.FormEvent) => void;
  reset: () => void;
  setValues: (values: Record<string, any>) => void;
  clearErrors: () => void;
}

export const useFormValidation = ({
  initialValues,
  validationSchema,
  validateOnChange = true,
  validateOnBlur = true,
  onSubmit,
}: UseFormValidationOptions): UseFormValidationReturn => {
  const [fields, setFields] = useState<Record<string, FormField>>(() => {
    const initialFields: Record<string, FormField> = {};
    
    Object.keys(initialValues).forEach(key => {
      initialFields[key] = {
        value: initialValues[key],
        error: null,
        touched: false,
        rules: validationSchema[key] || [],
      };
    });
    
    return initialFields;
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived state
  const values = Object.keys(fields).reduce((acc, key) => {
    acc[key] = fields[key].value;
    return acc;
  }, {} as Record<string, any>);

  const errors = Object.keys(fields).reduce((acc, key) => {
    acc[key] = fields[key].error;
    return acc;
  }, {} as Record<string, string | null>);

  const touched = Object.keys(fields).reduce((acc, key) => {
    acc[key] = fields[key].touched;
    return acc;
  }, {} as Record<string, boolean>);

  const isValid = Object.values(fields).every(field => !field.error);

  // Validate a single field
  const validateField = useCallback((fieldName: string) => {
    const field = fields[fieldName];
    if (!field) return;

    let error: string | null = null;
    
    for (const rule of field.rules) {
      if (!rule.validate(field.value)) {
        error = rule.message.replace('{field}', fieldName);
        break;
      }
    }

    setFields(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        error,
      },
    }));
  }, [fields]);

  // Validate entire form
  const validateFormFields = useCallback((): boolean => {
    const validation = validateForm(values, validationSchema);
    
    setFields(prev => {
      const updated = { ...prev };
      
      Object.keys(updated).forEach(key => {
        updated[key] = {
          ...updated[key],
          error: validation.errors[key]?.[0] || null,
        };
      });
      
      return updated;
    });
    
    return validation.isValid;
  }, [values, validationSchema]);

  // Set field value
  const setValue = useCallback((fieldName: string, value: any) => {
    setFields(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
      },
    }));

    if (validateOnChange) {
      // Validate after state update
      setTimeout(() => validateField(fieldName), 0);
    }
  }, [validateOnChange, validateField]);

  // Set field error
  const setError = useCallback((fieldName: string, error: string | null) => {
    setFields(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        error,
      },
    }));
  }, []);

  // Set field touched state
  const setTouched = useCallback((fieldName: string, touched: boolean) => {
    setFields(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        touched,
      },
    }));
  }, []);

  // Handle input change
  const handleChange = useCallback((fieldName: string) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { value, type, checked } = event.target as HTMLInputElement;
      const fieldValue = type === 'checkbox' ? checked : value;
      
      setValue(fieldName, fieldValue);
    };
  }, [setValue]);

  // Handle input blur
  const handleBlur = useCallback((fieldName: string) => {
    return () => {
      setTouched(fieldName, true);
      
      if (validateOnBlur) {
        validateField(fieldName);
      }
    };
  }, [validateOnBlur, validateField, setTouched]);

  // Handle form submission
  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!onSubmit) return;
    
    // Mark all fields as touched
    setFields(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        updated[key] = { ...updated[key], touched: true };
      });
      return updated;
    });

    // Validate form
    const isFormValid = validateFormFields();
    
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, values, validateFormFields]);

  // Reset form
  const reset = useCallback(() => {
    setFields(prev => {
      const reset: Record<string, FormField> = {};
      
      Object.keys(prev).forEach(key => {
        reset[key] = {
          ...prev[key],
          value: initialValues[key],
          error: null,
          touched: false,
        };
      });
      
      return reset;
    });
    
    setIsSubmitting(false);
  }, [initialValues]);

  // Set multiple values
  const setValues = useCallback((newValues: Record<string, any>) => {
    setFields(prev => {
      const updated = { ...prev };
      
      Object.keys(newValues).forEach(key => {
        if (updated[key]) {
          updated[key] = {
            ...updated[key],
            value: newValues[key],
          };
        }
      });
      
      return updated;
    });
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setFields(prev => {
      const updated = { ...prev };
      
      Object.keys(updated).forEach(key => {
        updated[key] = {
          ...updated[key],
          error: null,
        };
      });
      
      return updated;
    });
  }, []);

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setValue,
    setError,
    setTouched,
    validateField,
    validateForm: validateFormFields,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    clearErrors,
  };
};

export default useFormValidation;