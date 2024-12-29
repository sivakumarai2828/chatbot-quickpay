import React, { useEffect } from 'react';
import { Message } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { ProcessingState } from './ProcessingState';
import { useMessageDisplay } from '../hooks/useMessageDisplay';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  isProcessing: boolean;
  isAccountProcessing: boolean;
  isPlanProcessing: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping,
  isProcessing,
  isAccountProcessing,
  isPlanProcessing
}) => {
  const { messagesEndRef, scrollToBottom, highlightMessage } = useMessageDisplay();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageDisplay = (messageId: string) => {
    highlightMessage(messageId);
  };

  return (
    <div className="flex flex-col">
      {messages.map((message, index) => (
        <ChatMessage 
          key={`${message.id}-${index}`} 
          message={message} 
          isLatest={index === messages.length - 1}
          onMessageDisplay={handleMessageDisplay}
        />
      ))}
      {(isTyping || isProcessing || isAccountProcessing || isPlanProcessing) && (
        <ProcessingState />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};