import React, { useEffect } from 'react';
import { Message } from '../../../types/interfaces';
import { ChatMessage } from '../ChatMessage';
import { ProcessingState } from '../../ProcessingState';
import { useMessageDisplay } from '../../../hooks/useMessageDisplay';

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
  }, [messages, scrollToBottom]);

  const handleMessageDisplay = (messageId: string) => {
    highlightMessage(messageId);
  };

  const showProcessing = isTyping || isProcessing || isAccountProcessing || isPlanProcessing;

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
      {showProcessing && <ProcessingState />}
      <div ref={messagesEndRef} />
    </div>
  );
};