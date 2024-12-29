import React, { useState } from 'react';
import { IoVolumeHigh, IoPause } from 'react-icons/io5';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

interface AudioPlayerProps {
  text: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { speak, pause, isSupported } = useTextToSpeech();

  if (!isSupported) return null;

  const handleTogglePlay = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      speak(text, {
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false)
      });
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={handleTogglePlay}
      className="p-1 text-teal-600 hover:text-teal-700 transition-colors"
      aria-label={isPlaying ? 'Pause speech' : 'Play speech'}
    >
      {isPlaying ? <IoPause size={16} /> : <IoVolumeHigh size={16} />}
    </button>
  );
};