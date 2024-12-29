import React from 'react';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { FaCreditCard } from 'react-icons/fa';

interface MessengerIconProps {
  onClick: () => void;
  isMinimized: boolean;
}

export const MessengerIcon: React.FC<MessengerIconProps> = ({ onClick, isMinimized }) => {
  if (!isMinimized) return null;
  
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-gradient-to-br from-teal-500 to-teal-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-chat"
      aria-label="Open chat"
    >
      <div className="relative">
        <IoChatbubbleEllipses className="text-white w-6 h-6" />
        <div className="absolute -top-1 -right-1 bg-white rounded-full p-1">
          <FaCreditCard className="text-teal-600 w-3 h-3" />
        </div>
      </div>
    </button>
  );
};