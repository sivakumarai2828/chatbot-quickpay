import { useRef, useCallback } from 'react';

export const useMessageDisplay = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const highlightedMessageRef = useRef<string | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const highlightMessage = useCallback((messageId: string) => {
    if (highlightedMessageRef.current) {
      const prevMessage = document.getElementById(`message-${highlightedMessageRef.current}`);
      prevMessage?.classList.remove('bg-teal-50', 'transition-colors', 'duration-500');
    }

    const messageElement = document.getElementById(`message-${messageId}`);
    if (messageElement) {
      messageElement.classList.add('bg-teal-50', 'transition-colors', 'duration-500');
      setTimeout(() => {
        messageElement.classList.remove('bg-teal-50', 'transition-colors', 'duration-500');
      }, 1000);
    }
    highlightedMessageRef.current = messageId;
  }, []);

  return {
    messagesEndRef,
    scrollToBottom,
    highlightMessage
  };
};