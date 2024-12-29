import axios from 'axios';
import { TextToSpeechConfig, TextToSpeechResponse } from '../../types/elevenlabs';
import { defaultConfig, ELEVENLABS_API_URL } from './config';
import { logger } from '../../utils/logger';

export class ElevenLabsService {
  private config: TextToSpeechConfig;
  private audio: HTMLAudioElement | null = null;

  constructor(apiKey: string, config?: Partial<Omit<TextToSpeechConfig, 'apiKey'>>) {
    this.config = {
      ...defaultConfig,
      ...config,
      apiKey
    };
  }

  async synthesizeSpeech(text: string): Promise<TextToSpeechResponse> {
    try {
      const response = await axios.post(
        `${ELEVENLABS_API_URL}/text-to-speech/${this.config.voiceId}`,
        {
          text,
          model_id: this.config.model,
          voice_settings: {
            stability: this.config.stability,
            similarity_boost: this.config.similarityBoost
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': this.config.apiKey
          },
          responseType: 'blob'
        }
      );

      return {
        success: true,
        audioBlob: response.data
      };
    } catch (error) {
      logger.error('ElevenLabs API error', error);
      return {
        success: false,
        error: 'Failed to synthesize speech'
      };
    }
  }

  async speak(text: string): Promise<void> {
    try {
      const result = await this.synthesizeSpeech(text);
      
      if (!result.success || !result.audioBlob) {
        throw new Error(result.error || 'Failed to synthesize speech');
      }

      this.stop();

      const audioUrl = URL.createObjectURL(result.audioBlob);
      this.audio = new Audio(audioUrl);
      
      await this.audio.play();

      this.audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      logger.error('Speech playback error', error);
      throw error;
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
  }
}