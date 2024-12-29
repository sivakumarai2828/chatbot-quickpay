import React, { createContext, useContext, useState } from 'react';
import { config } from '../config/env';

interface AudioContextType {
  isEnabled: boolean;
  toggleAudio: () => void;
  apiKey: string;
}

const AudioContext = createContext<AudioContextType>({
  isEnabled: true,
  toggleAudio: () => {},
  apiKey: ''
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleAudio = () => setIsEnabled(prev => !prev);

  return (
    <AudioContext.Provider value={{
      isEnabled,
      toggleAudio,
      apiKey: config.elevenLabsApiKey
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);