import React from 'react';
import { PaymentSummary as PaymentSummaryType } from '../../types/interfaces';
import { formatCurrencyAmount } from '../../utils/payment/amountFormatter';

interface PaymentSummaryProps {
  summary: PaymentSummaryType;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ summary }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-bold mb-3 text-teal-600">Payment Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Amount Being Financed:</span>
          <span className="font-medium" data-testid="amount-financed">
            {formatCurrencyAmount(summary.balance)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Payment Plan:</span>
          <span className="font-medium">{summary.planType}</span>
        </div>
        <div className="flex justify-between">
          <span>Monthly Payment:</span>
          <span className="font-medium">{formatCurrencyAmount(summary.monthlyPayment)}</span>
        </div>
        <div className="flex justify-between">
          <span>Duration:</span>
          <span className="font-medium">{summary.totalMonths} months</span>
        </div>
        <div className="flex justify-between">
          <span>First Payment Date:</span>
          <span className="font-medium">{summary.firstPaymentDate}</span>
        </div>
      </div>
    </div>
  );
};