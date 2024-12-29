import { useCallback, useEffect, useState } from 'react';
import { VoiceManager } from '../utils/speech/voiceManager';
import { UtteranceManager } from '../utils/speech/utteranceManager';
import { logger } from '../utils/logger';

export const useSpeechSynthesis = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const voiceManager = VoiceManager.getInstance();
  const utteranceManager = UtteranceManager.getInstance();

  useEffect(() => {
    const init = async () => {
      try {
        const success = await voiceManager.initialize();
        setIsInitialized(success);
      } catch (error) {
        logger.error('Failed to initialize speech synthesis:', error);
        setIsInitialized(false);
      }
    };

    init();

    return () => {
      utteranceManager.stop();
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!isInitialized) {
      logger.warn('Speech synthesis not initialized yet');
      return;
    }

    utteranceManager.speak(text);
  }, [isInitialized]);

  return { speak, isInitialized };
};