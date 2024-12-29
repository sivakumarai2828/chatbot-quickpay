import React from 'react';

interface QuickOption {
  id: string;
  label: string;
  action: string;
  details?: string;
}

interface QuickOptionsProps {
  options: QuickOption[];
  onSelect: (option: QuickOption) => void;
}

export const QuickOptions: React.FC<QuickOptionsProps> = ({ options, onSelect }) => {
  return (
    <div className="flex flex-col gap-2 my-4 ml-auto mr-4 w-[70%]">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          className="w-full p-3 text-left bg-white shadow-sm rounded-lg hover:bg-blue-50 transition-colors"
        >
          <div className="flex justify-between items-center">
            <span className="flex-1">{option.label}</span>
            {option.details && (
              <span className="text-sm text-teal-600 hover:underline ml-2">
                Learn more
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};