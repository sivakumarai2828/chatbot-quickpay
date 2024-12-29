import { logger } from '../logger';
import { configureVoice } from './voiceConfig';

interface QueueItem {
  text: string;
  resolve: () => void;
}

export class SpeechQueue {
  private static instance: SpeechQueue;
  private queue: QueueItem[] = [];
  private isPlaying = false;

  private constructor() {}

  static getInstance(): SpeechQueue {
    if (!SpeechQueue.instance) {
      SpeechQueue.instance = new SpeechQueue();
    }
    return SpeechQueue.instance;
  }

  async add(text: string): Promise<void> {
    return new Promise((resolve) => {
      this.queue.push({ text, resolve });
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.isPlaying || this.queue.length === 0) return;

    this.isPlaying = true;
    const item = this.queue[0];

    try {
      const utterance = new SpeechSynthesisUtterance(item.text);
      configureVoice(utterance);
      
      utterance.onend = () => {
        this.isPlaying = false;
        this.queue.shift();
        item.resolve();
        this.processQueue();
      };

      utterance.onerror = (event) => {
        logger.error('Speech synthesis error:', event);
        this.isPlaying = false;
        this.queue.shift();
        item.resolve();
        this.processQueue();
      };

      speechSynthesis.speak(utterance);
    } catch (error) {
      logger.error('Speech queue error:', error);
      this.isPlaying = false;
      this.queue.shift();
      item.resolve();
      this.processQueue();
    }
  }

  clear(): void {
    this.queue = [];
    this.isPlaying = false;
    speechSynthesis.cancel();
  }
}