import { useRef, useEffect } from 'react';
import { Keyboard, KeyboardEventListener, KeyboardEventName, KeyboardEvent } from 'react-native';

export default function useKeyboardEvent(eventName: KeyboardEventName, callback: KeyboardEventListener) {
  const savedCallback = useRef<KeyboardEventListener>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function listener(event: KeyboardEvent) {
      if (savedCallback.current) {
        savedCallback.current(event);
      }
    }
    const unsubcribe = Keyboard.addListener(eventName, listener);
    return () => {
      unsubcribe.remove();
    };
  }, []);
}
