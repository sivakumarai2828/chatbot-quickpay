import { logger } from '../logger';
import { VoiceManager } from './voiceManager';

export class UtteranceManager {
  private static instance: UtteranceManager;
  private isSpeaking = false;
  private keepAliveInterval: number | null = null;
  private voiceManager: VoiceManager;

  private constructor() {
    this.voiceManager = VoiceManager.getInstance();
    this.startKeepAlive();
  }

  static getInstance(): UtteranceManager {
    if (!UtteranceManager.instance) {
      UtteranceManager.instance = new UtteranceManager();
    }
    return UtteranceManager.instance;
  }

  private startKeepAlive() {
    this.keepAliveInterval = window.setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 14000);
  }

  private stopKeepAlive() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }

  createUtterance(text: string): SpeechSynthesisUtterance | null {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = this.voiceManager.getPreferredVoice();
      
      if (!voice) {
        logger.error('No voice available for speech synthesis');
        return null;
      }

      utterance.voice = voice;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = voice.lang;

      return utterance;
    } catch (error) {
      logger.error('Failed to create utterance:', error);
      return null;
    }
  }

  speak(text: string): void {
    if (this.isSpeaking) {
      this.stop();
    }

    try {
      const utterance = this.createUtterance(text);
      if (!utterance) return;
      
      utterance.onstart = () => {
        this.isSpeaking = true;
        logger.info('Speech started:', text.substring(0, 50) + '...');
      };
      
      utterance.onend = () => {
        this.isSpeaking = false;
        logger.info('Speech ended successfully');
      };
      
      utterance.onerror = (event) => {
        this.isSpeaking = false;
        logger.error('Speech synthesis error:', event.error);
      };

      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      this.isSpeaking = false;
      logger.error('Failed to start speech:', error);
    }
  }

  stop(): void {
    try {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    } catch (error) {
      logger.error('Failed to stop speech:', error);
    }
  }

  cleanup(): void {
    this.stop();
    this.stopKeepAlive();
  }

  isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }
}