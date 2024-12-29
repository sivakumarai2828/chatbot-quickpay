import React from 'react';
import { IoClose, IoRemove } from 'react-icons/io5';
import { BotAvatar } from './BotAvatar';

interface ChatHeaderProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ title, onClose, onMinimize }) => {
  return (
    <div className="bg-teal-600 text-white p-3 flex justify-between items-center rounded-t-lg">
      <div className="flex items-center">
        <BotAvatar />
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={onMinimize} 
          className="hover:text-gray-300 transition-colors"
          aria-label="Minimize chat"
        >
          <IoRemove size={20} />
        </button>
        <button 
          onClick={onClose} 
          className="hover:text-gray-300 transition-colors"
          aria-label="Close chat"
        >
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
};