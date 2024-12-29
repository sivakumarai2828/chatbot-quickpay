import { logger } from '../logger';

export interface VoiceConfig {
  lang: string;
  pitch: number;
  rate: number;
  volume: number;
}

const defaultConfig: VoiceConfig = {
  lang: 'en-US',
  pitch: 1.1,    // Slightly higher pitch for younger female voice (reduced from 1.2 for more natural sound)
  rate: 0.95,    // Slightly slower rate for clearer articulation (changed from 1.1)
  volume: 1.0    // Full volume
};

export const initializeVoices = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const checkVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(true);
        return;
      }
      speechSynthesis.addEventListener('voiceschanged', () => resolve(true), { once: true });
    };
    checkVoices();
  });
};

export const configureVoice = (utterance: SpeechSynthesisUtterance): void => {
  try {
    const voices = speechSynthesis.getVoices();
    
    // Prioritize Google female voice
    const voice = voices.find(v => 
      v.name === 'Google US English Female' ||
      (v.name === 'Google US English' && !v.name.toLowerCase().includes('male')) ||
      (v.lang === 'en-US' && v.name.toLowerCase().includes('female'))
    );

    if (!voice) {
      logger.warn('Preferred voice not found, falling back to default');
      return;
    }

    // Apply voice settings
    utterance.voice = voice;
    utterance.lang = defaultConfig.lang;
    utterance.pitch = defaultConfig.pitch;
    utterance.rate = defaultConfig.rate;
    utterance.volume = defaultConfig.volume;

    logger.info(`Using voice: ${voice.name}`);
  } catch (error) {
    logger.error('Error configuring voice:', error);
  }
};