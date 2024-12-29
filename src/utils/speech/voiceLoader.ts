import { logger } from '../logger';
import { checkSpeechSupport } from './browserSupport';

export const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve, reject) => {
    if (!checkSpeechSupport()) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    try {
      // Check if voices are already loaded
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        return resolve(voices);
      }

      // Set a timeout to prevent hanging
      const timeout = setTimeout(() => {
        speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        reject(new Error('Voice loading timed out'));
      }, 5000);

      // Wait for voices to load
      const onVoicesChanged = () => {
        clearTimeout(timeout);
        const newVoices = speechSynthesis.getVoices();
        speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        
        if (newVoices.length === 0) {
          reject(new Error('No voices available'));
        } else {
          resolve(newVoices);
        }
      };

      speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    } catch (error) {
      logger.error('Failed to load voices:', error);
      reject(new Error('Failed to load speech synthesis voices'));
    }
  });
};