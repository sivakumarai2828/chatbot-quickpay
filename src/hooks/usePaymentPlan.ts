import { useState } from 'react';
import { Bill, ConversationState } from '../types/interfaces';
import { createBotMessage } from '../utils/messageUtils';
import { paymentPlans } from '../constants/paymentPlans';
import { generatePaymentSummary, generateConfirmationNumber } from '../utils/paymentUtils';
import { createDelayedBotMessage } from '../utils/messageDelay';

export const usePaymentPlan = (
  addMessages: (messages: any[]) => Promise<void>,
  setCurrentOptions: (options: any[]) => void,
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void
) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlanSelection = async (planId: string, selectedBill: Bill) => {
    setIsProcessing(true);
    setCurrentOptions([]);

    if (planId === 'one_time_payment') {
      await addMessages([
        createBotMessage("How would you like to pay?")
      ]);
      setConversationState((prev: ConversationState) => ({
        ...prev,
        context: 'payment_method'
      }));
      setIsProcessing(false);
      return;
    }

    const selectedPlan = paymentPlans.find(plan => plan.id === planId);
    if (!selectedPlan) {
      setIsProcessing(false);
      return;
    }

    const paymentSummary = generatePaymentSummary(selectedBill.amount, selectedPlan);
    const confirmationNumber = generateConfirmationNumber();

    await addMessages([
      createBotMessage(selectedPlan.details)
    ]);

    const delayedMessage = await createDelayedBotMessage(
      "Please review your payment details below. Would you like to confirm and process this payment plan?"
    );
    
    await addMessages(delayedMessage);

    setConversationState((prev: ConversationState) => ({
      ...prev,
      context: 'payment_confirmation',
      paymentFlow: {
        ...prev.paymentFlow,
        selectedPlan,
        paymentSummary,
        confirmationNumber
      }
    }));

    const paymentOptions = [
      {
        id: 'confirm_plan',
        label: 'Yes, please proceed',
        action: 'confirm_plan'
      },
      {
        id: 'change_plan',
        label: "I'd like to make changes",
        action: 'change_plan'
      }
    ];

    setCurrentOptions(paymentOptions);
    setIsProcessing(false);
  };

  return {
    isProcessing,
    handlePlanSelection
  };
};