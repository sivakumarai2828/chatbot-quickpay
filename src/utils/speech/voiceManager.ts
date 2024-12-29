import { logger } from '../logger';

export class VoiceManager {
  private static instance: VoiceManager;
  private voices: SpeechSynthesisVoice[] = [];
  private isReady = false;

  private constructor() {}

  static getInstance(): VoiceManager {
    if (!VoiceManager.instance) {
      VoiceManager.instance = new VoiceManager();
    }
    return VoiceManager.instance;
  }

  async initialize(): Promise<boolean> {
    try {
      if (!window.speechSynthesis) {
        logger.error('Speech synthesis not supported in this browser');
        return false;
      }

      // Reset speech synthesis state
      window.speechSynthesis.cancel();

      // Load voices with a longer timeout and better error handling
      await Promise.race([
        new Promise<void>((resolve, reject) => {
          const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
              this.voices = voices;
              window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
              logger.info(`Loaded ${voices.length} voices`);
              resolve();
            }
          };

          // Try immediate load first
          const initialVoices = window.speechSynthesis.getVoices();
          if (initialVoices.length > 0) {
            this.voices = initialVoices;
            logger.info(`Initially loaded ${initialVoices.length} voices`);
            resolve();
            return;
          }
          
          // If no voices yet, listen for the voiceschanged event
          window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Voice loading timed out after 5 seconds')), 5000)
        )
      ]);

      this.isReady = true;
      return true;
    } catch (error) {
      logger.error('Failed to initialize voice manager:', error);
      return false;
    }
  }

  getPreferredVoice(): SpeechSynthesisVoice | null {
    if (!this.isReady || this.voices.length === 0) {
      logger.warn('No voices available yet');
      return null;
    }

    // Try to find a good English voice in order of preference
    const voice = 
      this.voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) ||
      this.voices.find(v => v.lang === 'en-US' && !v.name.includes('Microsoft')) ||
      this.voices.find(v => v.lang.startsWith('en-')) ||
      this.voices[0];

    if (voice) {
      logger.info(`Selected voice: ${voice.name} (${voice.lang})`);
    } else {
      logger.warn('No suitable voice found');
    }

    return voice;
  }

  isInitialized(): boolean {
    return this.isReady && this.voices.length > 0;
  }
}