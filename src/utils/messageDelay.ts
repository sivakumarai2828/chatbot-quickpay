import { delay } from './delay';
import { Message } from '../types/chat';
import { createBotMessage } from './messageUtils';

export const createDelayedBotMessage = async (
  text: string,
  delayMs: number = 5000
): Promise<Message[]> => {
  await delay(delayMs);
  return [createBotMessage(text)];
};

export const createFollowUpMessage = async (): Promise<Message[]> => {
  return createDelayedBotMessage(
    "Is there anything else I can help you with today?"
  );
};