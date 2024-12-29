import { useState, useCallback } from 'react';
import { LoadingState } from './types';

export const useLoadingState = (): LoadingState => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading
  };
};