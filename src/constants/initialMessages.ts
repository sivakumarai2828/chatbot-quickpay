import { Message } from '../types/chat';

export const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm here to help with your healthcare needs. How can I assist you today? You can ask about bill payments, check your balance, or get help with other services.",
    sender: 'bot',
    timestamp: new Date()
  }
];