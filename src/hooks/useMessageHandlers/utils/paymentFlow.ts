import { PaymentFlowProps } from '../types';

export const handlePaymentFlow = async ({
  option,
  selectedBill,
  handlePlanSelection,
  setIsProcessing
}: PaymentFlowProps) => {
  const planId = option.action.replace('plan_', '');
  if (selectedBill) {
    await handlePlanSelection(planId, selectedBill);
  }
  setIsProcessing(false);
};