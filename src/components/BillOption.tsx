import React from 'react';
import { Bill } from '../types/interfaces';

interface BillOptionProps {
  bill: Bill;
  onSelect: (billId: string) => void;
}

export const BillOption: React.FC<BillOptionProps> = ({ bill, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(bill.id)}
      className="w-full p-4 text-left bg-gray-50 border rounded-lg hover:bg-blue-50 transition-colors"
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium">{bill.provider}</span>
        <span className="text-gray-600">Amount Due: ${bill.amount.toFixed(2)}</span>
      </div>
    </button>
  );
};