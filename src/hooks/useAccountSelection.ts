import { useState } from 'react';
import { ConversationState, Bill, CareAccount } from '../types/chat';
import { createBotMessage } from '../utils/messageUtils';
import { parseAccountSearchParams } from '../utils/accountUtils';
import { useAccountLookup } from './useAccountLookup';
import { paymentPlans } from '../constants/paymentPlans';
import { createDelayedBotMessage } from '../utils/messageDelay';

export const useAccountSelection = (
  addMessages: (messages: any[]) => Promise<void>,
  setCurrentOptions: (options: any[]) => void,
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void,
  setCareAccounts: (accounts: CareAccount[]) => void
) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { lookupAccounts, isLoading, error } = useAccountLookup({
    addMessages,
    setCurrentOptions,
    setCareAccounts
  });

  const handleAccountLookup = async (text: string) => {
    setIsProcessing(true);
    const params = parseAccountSearchParams(text);

    if (!params) {
      await addMessages([
        createBotMessage("Please enter your information in the following format:\n\n• First and Last Name, followed by a comma\n• 10-digit Phone Number")
      ]);
      setIsProcessing(false);
      return;
    }

    await lookupAccounts(params);
    
    setConversationState(prev => ({
      ...prev,
      context: error ? 'error' : 'account_selection'
    }));
    
    setIsProcessing(false);
  };

  const handleAccountSelection = async (accountId: string, accounts: CareAccount[], bill: Bill) => {
    setIsProcessing(true);
    setCurrentOptions([]);
    
    const account = accounts.find(acc => acc.id === accountId);
    
    if (account) {
      await addMessages([
        createBotMessage(`Selected account ending in ${account.lastFour}`)
      ]);

      const delayedMessage = await createDelayedBotMessage(
        "Choose a payment plan or select 'One-time payment' if paying in full."
      );
      
      await addMessages(delayedMessage);

      const paymentOptions = [
        ...paymentPlans.map(plan => ({
          id: plan.id,
          label: plan.label,
          action: `plan_${plan.id}`,
          details: plan.details
        })),
        {
          id: 'one_time',
          label: 'One-time payment',
          action: 'one_time_payment'
        }
      ];

      setCurrentOptions(paymentOptions);
      setConversationState(prev => ({
        ...prev,
        context: 'payment_plan',
        paymentFlow: {
          ...prev.paymentFlow,
          selectedAccount: accountId,
          selectedBill: bill
        }
      }));
    }
    setIsProcessing(false);
  };

  return {
    isProcessing: isProcessing || isLoading,
    handleAccountLookup,
    handleAccountSelection,
    error
  };
};