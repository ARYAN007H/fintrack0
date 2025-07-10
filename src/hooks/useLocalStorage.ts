import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = T | ((val: T) => T);

interface UseLocalStorageOptions {
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
}

/**
 * Custom hook for managing localStorage with React state synchronization
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {}
): [T, (value: SetValue<T>) => void, () => void] {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = options;

  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        // Save state
        setStoredValue(valueToStore);
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serialize(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serialize, storedValue]
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserialize(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserialize]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for managing multiple localStorage keys as a single object
 */
export function useLocalStorageObject<T extends Record<string, any>>(
  key: string,
  initialValue: T
): [T, (updates: Partial<T>) => void, () => void] {
  const [value, setValue, removeValue] = useLocalStorage(key, initialValue);

  const updateValue = useCallback(
    (updates: Partial<T>) => {
      setValue(prev => ({ ...prev, ...updates }));
    },
    [setValue]
  );

  return [value, updateValue, removeValue];
}

/**
 * Hook for managing localStorage with expiration
 */
export function useLocalStorageWithExpiry<T>(
  key: string,
  initialValue: T,
  ttl: number // Time to live in milliseconds
): [T, (value: SetValue<T>) => void, () => void] {
  const serialize = useCallback(
    (value: T) => {
      const item = {
        value,
        expiry: Date.now() + ttl,
      };
      return JSON.stringify(item);
    },
    [ttl]
  );

  const deserialize = useCallback(
    (value: string) => {
      const item = JSON.parse(value);
      
      // Check if item has expired
      if (Date.now() > item.expiry) {
        // Remove expired item
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(key);
        }
        return initialValue;
      }
      
      return item.value;
    },
    [key, initialValue]
  );

  return useLocalStorage(key, initialValue, { serialize, deserialize });
}

/**
 * Hook for managing localStorage arrays with utility methods
 */
export function useLocalStorageArray<T>(
  key: string,
  initialValue: T[] = []
): [
  T[],
  {
    add: (item: T) => void;
    remove: (index: number) => void;
    update: (index: number, item: T) => void;
    clear: () => void;
    set: (items: T[]) => void;
  }
] {
  const [items, setItems] = useLocalStorage(key, initialValue);

  const add = useCallback(
    (item: T) => {
      setItems(prev => [...prev, item]);
    },
    [setItems]
  );

  const remove = useCallback(
    (index: number) => {
      setItems(prev => prev.filter((_, i) => i !== index));
    },
    [setItems]
  );

  const update = useCallback(
    (index: number, item: T) => {
      setItems(prev => prev.map((existingItem, i) => (i === index ? item : existingItem)));
    },
    [setItems]
  );

  const clear = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const set = useCallback(
    (newItems: T[]) => {
      setItems(newItems);
    },
    [setItems]
  );

  return [
    items,
    {
      add,
      remove,
      update,
      clear,
      set,
    },
  ];
}

export default useLocalStorage;