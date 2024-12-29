import React, { useState } from 'react';
import { parseAmount, formatCurrencyAmount } from '../../utils/payment/amountFormatter';
import { validatePaymentAmount } from '../../utils/payment/paymentSummaryGenerator';
import type { CustomAmountInputProps } from './types';

export const CustomAmountInput = React.memo(function CustomAmountInput({
  maxAmount,
  onCustomAmount
}: CustomAmountInputProps) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseAmount(amount);
    
    if (!parsedAmount) {
      setError('Please enter a valid amount');
      return;
    }

    if (!validatePaymentAmount(parsedAmount, maxAmount)) {
      setError(`Amount must be between $0.01 and ${formatCurrencyAmount(maxAmount)}`);
      return;
    }

    onCustomAmount(parsedAmount);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
      <div className="flex gap-2">
        <input
          type="text"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError('');
          }}
          placeholder="Enter amount"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Payment amount"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
});