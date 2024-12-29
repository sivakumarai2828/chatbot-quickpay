import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SpeechQueue } from '../utils/speech/speechQueue';
import { initializeVoices } from '../utils/speech/voiceConfig';
import { logger } from '../utils/logger';

interface SpeechContextType {
  isEnabled: boolean;
  toggleSpeech: () => void;
  speak: (text: string) => Promise<void>;
  isReady: boolean;
  isSupported: boolean;
}

const SpeechContext = createContext<SpeechContextType>({
  isEnabled: true,
  toggleSpeech: () => {},
  speak: async () => {},
  isReady: false,
  isSupported: false
});

export const SpeechProvider = React.memo(function SpeechProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const speechQueue = SpeechQueue.getInstance();

  useEffect(() => {
    const init = async () => {
      try {
        const supported = 'speechSynthesis' in window;
        setIsSupported(supported);
        
        if (supported) {
          await initializeVoices();
          setIsReady(true);
        }
      } catch (error) {
        logger.error('Failed to initialize voices', error);
      }
    };
    init();
  }, []);

  const toggleSpeech = useCallback(() => {
    setIsEnabled(prev => !prev);
    speechQueue.clear();
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!isEnabled || !isReady || !isSupported) return;
    try {
      await speechQueue.add(text);
    } catch (error) {
      logger.error('Speech error', error);
    }
  }, [isEnabled, isReady, isSupported]);

  return (
    <SpeechContext.Provider 
      value={{
        isEnabled,
        toggleSpeech,
        speak,
        isReady,
        isSupported
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
});

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
};