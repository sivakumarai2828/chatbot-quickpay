export interface TextToSpeechConfig {
  apiKey: string;
  voiceId?: string;
  model?: string;
  stability?: number;
  similarityBoost?: number;
}

export interface TextToSpeechResponse {
  success: boolean;
  audioBlob?: Blob;
  error?: string;
}

export interface ElevenLabsOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}