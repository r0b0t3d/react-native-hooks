import { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import { Callback } from './types';

export default function useAndroidBack(callback: Callback, enable = true) {
  const savedCallback = useRef<any>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enable) return () => {};
    const subcriber = BackHandler.addEventListener('hardwareBackPress', () => {
      savedCallback.current();
      return true;
    });

    return () => {
      subcriber.remove();
    };
  }, [enable]);
}
