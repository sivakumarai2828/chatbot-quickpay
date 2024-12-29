import React, { useEffect, useRef } from 'react';
import { Message } from '../../../types/chat';
import { BotAvatar } from '../../BotAvatar';
import { useSpeech } from '../../../contexts/SpeechContext';

interface ChatMessageProps {
  message: Message;
  isLatest: boolean;
  onMessageDisplay?: (messageId: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isLatest,
  onMessageDisplay 
}) => {
  const isBot = message.sender === 'bot';
  const { speak } = useSpeech();
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (isLatest && isBot && !hasPlayedRef.current) {
      speak(message.text);
      hasPlayedRef.current = true;
    }
    if (isLatest && onMessageDisplay) {
      onMessageDisplay(message.id);
    }
  }, [isLatest, isBot, message.id, message.text, speak, onMessageDisplay]);

  return (
    <div 
      id={`message-${message.id}`}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      {isBot && <BotAvatar />}
      <div 
        className={`max-w-[70%] p-4 rounded-lg ${
          isBot ? 'bg-white shadow-sm' : 'bg-teal-600 text-white'
        }`}
      >
        <p className="break-words">{message.text}</p>
        <span className="text-xs text-gray-500 mt-2 block">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};