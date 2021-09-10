import { AppState, AppStateStatus } from 'react-native';
import { useEffect, useRef } from 'react';

export default function useAppState(callback: (state: AppStateStatus) => void) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function onAppStateChange(nextAppState: AppStateStatus) {
      savedCallback.current(nextAppState);
    }

    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);
}
