import React from 'react';
import { Bill, PaymentOption } from '../types/interfaces';

interface BillDisplayProps {
  bill: Bill;
  onSelectPayment: (billId: string, option: PaymentOption) => void;
}

export const BillDisplay: React.FC<BillDisplayProps> = ({ bill, onSelectPayment }) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="font-bold mb-2">{bill.provider}</h3>
      <p className="mb-2">Amount Due: ${bill.amount.toFixed(2)}</p>
      <div className="flex gap-2">
        {bill.paymentOptions.map((option: PaymentOption) => (
          <button
            key={option.id}
            onClick={() => onSelectPayment(bill.id, option)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};