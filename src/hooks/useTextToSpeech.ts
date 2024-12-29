import { useState, useCallback, useEffect } from 'react';
import { logger } from '../utils/logger';
import { loadVoices } from '../utils/speech/voiceLoader';
import { configureSpeechUtterance } from '../utils/speech/utteranceConfig';
import { SpeechSynthesisManager } from '../utils/speech/speechSynthesisManager';
import { checkSpeechSupport } from '../utils/speech/browserSupport';

interface SpeechOptions {
  onEnd?: () => void;
  onError?: () => void;
}

export const useTextToSpeech = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isReady, setIsReady] = useState(false);
  const speechManager = SpeechSynthesisManager.getInstance();

  useEffect(() => {
    const supported = checkSpeechSupport();
    setIsSupported(supported);

    if (supported) {
      loadVoices()
        .then(loadedVoices => {
          setVoices(loadedVoices);
          setIsReady(true);
        })
        .catch(error => {
          logger.error('Failed to load voices:', error);
          setIsSupported(false);
        });
    }

    return () => {
      speechManager.cleanup();
    };
  }, []);

  const speak = useCallback((text: string, options?: SpeechOptions) => {
    try {
      if (!isSupported || !isReady || !voices.length) {
        options?.onError?.();
        return;
      }

      const utterance = configureSpeechUtterance(text, voices, {
        onEnd: options?.onEnd,
        onError: (event) => {
          logger.error('Speech synthesis error:', event);
          options?.onError?.();
        }
      });

      speechManager.speak(utterance);
    } catch (error) {
      logger.error('Text-to-speech error:', error);
      options?.onError?.();
    }
  }, [isSupported, isReady, voices]);

  return {
    speak,
    pause: useCallback(() => speechManager.pause(), []),
    resume: useCallback(() => speechManager.resume(), []),
    stop: useCallback(() => speechManager.cancel(), []),
    isSupported: isSupported && isReady && voices.length > 0
  };
};