import { useState, useCallback } from 'react';
import { ElevenLabsService } from '../services/elevenlabs/textToSpeech';
import { ElevenLabsOptions } from '../types/elevenlabs';
import { logger } from '../utils/logger';

export const useElevenLabs = (apiKey: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const service = new ElevenLabsService(apiKey);

  const speak = useCallback(async (text: string, options?: ElevenLabsOptions) => {
    try {
      setError(null);
      options?.onStart?.();
      setIsPlaying(true);

      await service.speak(text);
      
      setIsPlaying(false);
      options?.onEnd?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Speech synthesis failed';
      logger.error('ElevenLabs error:', errorMessage);
      setError(errorMessage);
      setIsPlaying(false);
      options?.onError?.(errorMessage);
    }
  }, [service]);

  const stop = useCallback(() => {
    service.stop();
    setIsPlaying(false);
  }, [service]);

  return {
    speak,
    stop,
    isPlaying,
    error
  };
};