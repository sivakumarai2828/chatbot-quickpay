import { useState } from 'react';

export const useProcessingState = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startProcessing = () => setIsProcessing(true);
  const stopProcessing = () => setIsProcessing(false);
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isProcessing,
    isLoading,
    startProcessing,
    stopProcessing,
    startLoading,
    stopLoading
  };
};