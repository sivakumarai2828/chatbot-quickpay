import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm">
      <div className="w-6 h-6 border-2 border-teal-600 rounded-full border-t-transparent animate-spin mb-2" />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
};