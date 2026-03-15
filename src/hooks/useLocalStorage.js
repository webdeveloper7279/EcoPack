import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const toStore = value instanceof Function ? value(stored) : value;
        setStored(toStore);
        window.localStorage.setItem(key, JSON.stringify(toStore));
      } catch (e) {
        console.warn('useLocalStorage setItem error', e);
      }
    },
    [key, stored]
  );

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key && e.newValue) setStored(JSON.parse(e.newValue));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  return [stored, setValue];
}
