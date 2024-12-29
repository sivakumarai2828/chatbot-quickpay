import React from 'react';
import { FaRobot } from 'react-icons/fa';

export const BotAvatar: React.FC = () => {
  return (
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-md">
      <FaRobot className="text-white text-xs" />
    </div>
  );
};