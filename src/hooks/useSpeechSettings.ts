import { useState, useCallback } from 'react';

export const useSpeechSettings = () => {
  const [autoplay, setAutoplay] = useState(true);

  const toggleAutoplay = useCallback(() => {
    setAutoplay(prev => !prev);
  }, []);

  return {
    autoplay,
    toggleAutoplay
  };
};