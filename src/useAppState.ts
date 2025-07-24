import { AppState, AppStateStatus, Platform } from 'react-native';
import { useEffect, useRef } from 'react';

/**
 * Use AppState to detect app state changes
 *
 * On Android, when checking permisions, the app trigger background state
 * If the permission was blocked, app instanly trigger active state
 * This behavior sometime causing loop if we continue checking permission on app state change,
 * so we add a delay to prevent the callback from being called too often
 *
 * @param callback - The callback to call when the app state changes
 * @param delay - Android only: The delay in milliseconds to prevent the callback from being called too often
 */
export default function useAppState(callback: (state: AppStateStatus) => void, delay = 1000) {
  const savedCallback = useRef<any>();
  const lastUpdatedAt = useRef<number>(-1);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      // On Android, when checking permisions, the app trigger background state
      // If the permission was blocked, app instanly trigger active state
      // This behavior sometime causing loop if we continue checking permission on app state change
      if (
        Platform.OS === 'android' &&
        lastUpdatedAt.current > 0 &&
        Date.now() - lastUpdatedAt.current < delay
      ) {
        return;
      }
      lastUpdatedAt.current = Date.now();
      savedCallback.current?.(state);
    });

    return () => {
      subscription.remove();
    };
  }, []);
}
