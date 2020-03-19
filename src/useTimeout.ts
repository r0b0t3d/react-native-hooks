import { useEffect, useRef } from 'react';
import { Callback } from './types';

export default function useTimeout(callback: Callback, duration = -1) {
  const savedCallback = useRef<Callback>();
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (!duration || duration < 0) {
      return () => {};
    }
    const id = setTimeout(savedCallback.current, duration);
    return () => clearTimeout(id);
  }, [duration]);
}
