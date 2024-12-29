import React from 'react';
import { IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';
import { useSpeech } from '../../contexts/SpeechContext';

export const SpeechToggle: React.FC = () => {
  const { isEnabled, toggleSpeech } = useSpeech();

  return (
    <button
      onClick={toggleSpeech}
      className="p-2 text-white hover:text-gray-300 transition-colors"
      aria-label={isEnabled ? 'Disable speech' : 'Enable speech'}
      title={isEnabled ? 'Disable speech' : 'Enable speech'}
    >
      {isEnabled ? <IoVolumeHigh size={20} /> : <IoVolumeMute size={20} />}
    </button>
  );
};