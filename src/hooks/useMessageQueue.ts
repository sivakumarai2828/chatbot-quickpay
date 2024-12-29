import { useCallback } from 'react';
import { Message } from '../types/chat';
import { useSpeech } from '../contexts/SpeechContext';

export const useMessageQueue = () => {
  const { speak } = useSpeech();

  const addMessages = useCallback(async (messages: Message[]) => {
    for (const message of messages) {
      if (message.sender === 'bot') {
        await speak(message.text);
      }
    }
  }, [speak]);

  return { addMessages };
};