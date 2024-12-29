interface UtteranceCallbacks {
  onEnd?: () => void;
  onError?: (event: SpeechSynthesisErrorEvent) => void;
}

export const configureSpeechUtterance = (
  text: string,
  voices: SpeechSynthesisVoice[],
  callbacks?: UtteranceCallbacks
): SpeechSynthesisUtterance => {
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Find a suitable voice (prefer US English female voice)
  const preferredVoice = voices.find(voice => 
    voice.lang === 'en-US' && voice.name.includes('Female')
  ) || voices.find(voice => 
    voice.lang === 'en-US'
  ) || voices[0];

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  // Configure speech parameters
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Add event listeners
  if (callbacks?.onEnd) {
    utterance.onend = callbacks.onEnd;
  }
  if (callbacks?.onError) {
    utterance.onerror = callbacks.onError;
  }

  return utterance;
};