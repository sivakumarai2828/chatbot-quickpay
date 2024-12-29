import React from 'react';
import { PaymentPlan } from '../../types/chat';
import { PaymentPlanOption } from './PaymentPlanOption';

interface PaymentPlanOptionsProps {
  plans: PaymentPlan[];
  onSelect: (planId: string) => void;
  onLearnMore: (plan: PaymentPlan) => void;
}

export const PaymentPlanOptions: React.FC<PaymentPlanOptionsProps> = ({
  plans,
  onSelect,
  onLearnMore
}) => {
  return (
    <div className="flex flex-col gap-2 my-4">
      {plans.map((plan) => (
        <PaymentPlanOption
          key={plan.id}
          plan={plan}
          onSelect={onSelect}
          onLearnMore={onLearnMore}
        />
      ))}
      <button
        onClick={() => onSelect('one_time_payment')}
        className="w-full p-3 text-left bg-gray-50 border rounded-lg hover:bg-blue-50 transition-colors"
      >
        <span className="font-medium">One-time payment</span>
      </button>
    </div>
  );
};