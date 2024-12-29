import React, { useState } from 'react';

interface CustomAmountInputProps {
  maxAmount: number;
  onSubmit: (amount: number) => void;
}

export const CustomAmountInput: React.FC<CustomAmountInputProps> = ({ maxAmount, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (numAmount > maxAmount) {
      setError(`Amount cannot exceed $${maxAmount.toFixed(2)}`);
      return;
    }
    onSubmit(numAmount);
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
      <div className="flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError('');
          }}
          placeholder="Enter amount"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          step="0.01"
          min="0"
          max={maxAmount}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};