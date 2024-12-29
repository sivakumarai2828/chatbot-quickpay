import React from 'react';
import { TypingIndicator } from './TypingIndicator';

export const ProcessingState: React.FC = () => {
  return (
    <div className="flex items-center gap-2 my-4 ml-auto mr-4 w-[85%]">
      <div className="w-full p-3 bg-white border rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Processing</span>
          <TypingIndicator />
        </div>
      </div>
    </div>
  );
};