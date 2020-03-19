import { useEffect, useRef } from 'react';
import { Callback } from './types';

/**
 * Hook to run code block in interval time
 *
 * @export
 * @param {Callback} callback code block to be run
 * @param {number} [delay=-1] If you like to stop this timer, just set it to -1.
 * @param {boolean} [firstTick=false] whether callback will be triggered at the start of window time
 */
export default function useInterval(callback: Callback, delay = -1, firstTick = false) {
  const savedCallback = useRef<Callback>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay < 0) {
      return () => {};
    }
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (firstTick) {
      tick();
    }
    const id = setInterval(tick, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
}
