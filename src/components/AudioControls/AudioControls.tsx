import React from 'react';
import { IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';

interface AudioControlsProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ isEnabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 text-white hover:text-gray-200 transition-colors"
      aria-label={isEnabled ? 'Disable audio' : 'Enable audio'}
      title={isEnabled ? 'Disable audio' : 'Enable audio'}
    >
      {isEnabled ? <IoVolumeHigh size={20} /> : <IoVolumeMute size={20} />}
    </button>
  );
};