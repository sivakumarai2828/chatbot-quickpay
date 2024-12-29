import { checkSpeechSupport, isSafari } from './browserSupport';
import { logger } from '../logger';

export class SpeechSynthesisManager {
  private static instance: SpeechSynthesisManager;
  private isInitialized = false;
  private resumeTimer: number | null = null;

  private constructor() {
    if (checkSpeechSupport()) {
      this.initSpeechSynthesis();
    }
  }

  static getInstance(): SpeechSynthesisManager {
    if (!SpeechSynthesisManager.instance) {
      SpeechSynthesisManager.instance = new SpeechSynthesisManager();
    }
    return SpeechSynthesisManager.instance;
  }

  private initSpeechSynthesis() {
    try {
      if (!this.isInitialized) {
        // Safari requires a user gesture to initialize speech synthesis
        if (isSafari()) {
          speechSynthesis.speak(new SpeechSynthesisUtterance(''));
        }

        // Keep speech alive in Chrome
        this.startKeepAliveTimer();
        
        this.isInitialized = true;
      }
    } catch (error) {
      logger.error('Failed to initialize speech synthesis:', error);
    }
  }

  private startKeepAliveTimer() {
    this.resumeTimer = window.setInterval(() => {
      if (speechSynthesis.speaking) {
        speechSynthesis.pause();
        speechSynthesis.resume();
      }
    }, 14000);
  }

  private stopKeepAliveTimer() {
    if (this.resumeTimer) {
      clearInterval(this.resumeTimer);
      this.resumeTimer = null;
    }
  }

  speak(utterance: SpeechSynthesisUtterance): void {
    try {
      if (!checkSpeechSupport()) return;

      this.cancel();

      if (speechSynthesis.paused) {
        speechSynthesis.resume();
      }

      speechSynthesis.speak(utterance);
    } catch (error) {
      logger.error('Speech synthesis speak error:', error);
      // Create error event with required initialization object
      utterance.onerror?.(new SpeechSynthesisErrorEvent('error', { error: 'synthesis-failed' }));
    }
  }

  pause(): void {
    try {
      if (checkSpeechSupport()) {
        speechSynthesis.pause();
      }
    } catch (error) {
      logger.error('Speech synthesis pause error:', error);
    }
  }

  resume(): void {
    try {
      if (checkSpeechSupport()) {
        speechSynthesis.resume();
      }
    } catch (error) {
      logger.error('Speech synthesis resume error:', error);
    }
  }

  cancel(): void {
    try {
      if (checkSpeechSupport()) {
        speechSynthesis.cancel();
      }
    } catch (error) {
      logger.error('Speech synthesis cancel error:', error);
    }
  }

  cleanup(): void {
    this.stopKeepAliveTimer();
    this.cancel();
  }
}