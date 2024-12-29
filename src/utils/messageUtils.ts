import { Message } from '../types/chat';
import { delay } from './delay';

let messageCounter = 0;

const generateMessageId = (): string => {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
};

export const createMessage = (text: string, sender: 'bot' | 'user'): Message => ({
  id: generateMessageId(),
  text,
  sender,
  timestamp: new Date()
});

export const createUserMessage = (text: string): Message => 
  createMessage(text, 'user');

export const createBotMessage = (text: string): Message => 
  createMessage(text, 'bot');

export const createDelayedMessages = async (
  messages: string[],
  delayMs: number = 4000
): Promise<Message[]> => {
  const botMessages: Message[] = [];
  
  for (let i = 0; i < messages.length; i++) {
    if (i > 0) {
      await delay(delayMs);
    }
    botMessages.push(createBotMessage(messages[i]));
  }
  
  return botMessages;
};