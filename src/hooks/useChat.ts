import { useState, useCallback } from 'react';
import { Message, ConversationState, CareAccount } from '../types/interfaces';
import { createBotMessage } from '../utils/messageUtils';
import { mainMenuOptions } from '../constants/quickOptions';
import { delay } from '../utils/delay';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<any[]>([]);
  const [conversationState, setConversationState] = useState<ConversationState>({
    context: 'main_menu'
  });
  const [careAccounts, setCareAccounts] = useState<CareAccount[]>([]);

  const addMessages = useCallback(async (newMessages: Message | Message[]) => {
    const messagesToAdd = Array.isArray(newMessages) ? newMessages : [newMessages];
    
    for (const message of messagesToAdd) {
      if (message.sender === 'bot') {
        setIsTyping(true);
        await delay(1000);
        setMessages(prev => [...prev, message]);
        setIsTyping(false);
      } else {
        setMessages(prev => [...prev, message]);
      }
    }
  }, []);

  const initializeChat = useCallback(async () => {
    setIsTyping(true);
    await delay(1000);
    await setMessages([
      createBotMessage("Hello! I'm CareCredit QuickPayBot, here to help with your bill payments. How can I assist you today?")
    ]);
    setIsTyping(false);
    setCurrentOptions(mainMenuOptions);
  }, []);

  return {
    messages,
    isTyping,
    currentOptions,
    conversationState,
    careAccounts,
    setCurrentOptions,
    setConversationState,
    setCareAccounts,
    addMessages,
    initializeChat
  };
};