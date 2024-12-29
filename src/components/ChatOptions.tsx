import React from 'react';
import { ChatOption } from '../types/chat';

interface ChatOptionsProps {
  options: ChatOption[];
  onSelect: (option: ChatOption) => void;
}

export const ChatOptions: React.FC<ChatOptionsProps> = ({ options, onSelect }) => {
  return (
    <div className="flex flex-col gap-2" role="list" aria-label="Chat options">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
          role="listitem"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};