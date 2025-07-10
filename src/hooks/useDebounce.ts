import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook that debounces a value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook that debounces a callback function
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);

  // Update callback ref when dependencies change
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...deps]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    }) as T,
    [delay]
  );

  return debouncedCallback;
}

/**
 * Hook for debounced search functionality
 */
export function useDebouncedSearch(
  searchFunction: (query: string) => void | Promise<void>,
  delay: number = 300
) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    if (debouncedQuery) {
      setIsSearching(true);
      
      const performSearch = async () => {
        try {
          await searchFunction(debouncedQuery);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsSearching(false);
        }
      };

      performSearch();
    } else {
      setIsSearching(false);
    }
  }, [debouncedQuery, searchFunction]);

  return {
    query,
    setQuery,
    debouncedQuery,
    isSearching,
  };
}

/**
 * Hook for debounced form validation
 */
export function useDebouncedValidation<T>(
  value: T,
  validator: (value: T) => { isValid: boolean; errors: string[] },
  delay: number = 300
) {
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors: string[];
  }>({ isValid: true, errors: [] });
  
  const [isValidating, setIsValidating] = useState(false);
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    if (debouncedValue !== undefined && debouncedValue !== null) {
      setIsValidating(true);
      
      // Simulate async validation
      setTimeout(() => {
        const result = validator(debouncedValue);
        setValidationResult(result);
        setIsValidating(false);
      }, 0);
    }
  }, [debouncedValue, validator]);

  return {
    ...validationResult,
    isValidating,
  };
}

export default useDebounce;