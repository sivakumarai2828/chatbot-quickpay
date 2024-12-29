import React from 'react';
import { PaymentPlan } from '../../types/chat';

interface PaymentPlanOptionProps {
  plan: PaymentPlan;
  onSelect: (planId: string) => void;
  onLearnMore: (plan: PaymentPlan) => void;
}

export const PaymentPlanOption: React.FC<PaymentPlanOptionProps> = ({
  plan,
  onSelect,
  onLearnMore
}) => {
  return (
    <div className="w-full p-3 bg-white border rounded-lg hover:bg-blue-50 transition-colors">
      <div className="flex justify-between items-center">
        <button
          onClick={() => onSelect(plan.id)}
          className="flex-1 text-left"
        >
          <span className="font-medium">{plan.label}</span>
        </button>
        <button
          onClick={() => onLearnMore(plan)}
          className="ml-2 text-sm text-teal-600 hover:underline"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};