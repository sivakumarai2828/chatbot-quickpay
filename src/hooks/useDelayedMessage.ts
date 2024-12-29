import { useState, useCallback } from 'react';
import { Message } from '../types/chat';
import { delay } from '../utils/delay';
import { createBotMessage } from '../utils/messageUtils';

interface UseDelayedMessageProps {
  addMessages: (messages: Message[]) => Promise<void>;
}

export const useDelayedMessage = ({ addMessages }: UseDelayedMessageProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const sendDelayedMessage = useCallback(async (
    message: string,
    delayMs: number = 4000
  ) => {
    setIsProcessing(true);
    await delay(delayMs);
    await addMessages([createBotMessage(message)]);
    setIsProcessing(false);
  }, [addMessages]);

  const sendDelayedMessages = useCallback(async (
    messages: string[],
    delayMs: number = 4000
  ) => {
    setIsProcessing(true);
    for (const message of messages) {
      await delay(delayMs);
      await addMessages([createBotMessage(message)]);
    }
    setIsProcessing(false);
  }, [addMessages]);

  return {
    isProcessing,
    sendDelayedMessage,
    sendDelayedMessages
  };
};