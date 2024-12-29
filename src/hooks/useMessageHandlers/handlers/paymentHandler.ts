import { PaymentFlowProps } from '../types';

export const handlePaymentFlow = async ({
  option,
  selectedBill,
  handlePlanSelection,
  setIsProcessing
}: PaymentFlowProps) => {
  try {
    const planId = option.action.replace('plan_', '');
    if (selectedBill) {
      await handlePlanSelection(planId, selectedBill);
    }
  } finally {
    setIsProcessing(false);
  }
};