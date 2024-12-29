import { TextToSpeechConfig } from '../../types/elevenlabs';

export const defaultConfig: Omit<TextToSpeechConfig, 'apiKey'> = {
  voiceId: 'pNInz6obpgDQGcFmaJgB',
  model: 'eleven_monolingual_v1',
  stability: 0.5,
  similarityBoost: 0.75
};

export const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';