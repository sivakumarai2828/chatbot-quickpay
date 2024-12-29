import React from 'react';
import { PaymentPlan } from '../../types/chat';

interface PaymentPlanDetailsProps {
  plan: PaymentPlan;
  onClose: () => void;
}

export const PaymentPlanDetails: React.FC<PaymentPlanDetailsProps> = ({ plan, onClose }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-teal-600">{plan.label}</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <p className="text-gray-600 text-sm">{plan.details}</p>
    </div>
  );
};