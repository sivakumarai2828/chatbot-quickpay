import { ConversationState } from '../types/chat';
import { createBotMessage } from '../utils/messageUtils';
import { delay } from '../utils/delay';

export const usePaymentMethod = (
  addMessages: (messages: any[]) => Promise<void>,
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void,
  setCurrentOptions: (options: any[]) => void
) => {
  const handlePaymentMethodSelect = async (method: string) => {
    if (method === 'account_lookup') {
      await addMessages([
        createBotMessage("Please enter your information in the following format:\n\n• First and Last Name, followed by a comma\n• 10-digit Phone Number")
      ]);
      setConversationState(prev => ({
        ...prev,
        context: 'payment_info',
        paymentFlow: { ...prev.paymentFlow, method }
      }));
    } else if (method === 'carecredit_card') {
      await addMessages([
        createBotMessage("Please enter your CareCredit card number.")
      ]);
      setConversationState(prev => ({
        ...prev,
        context: 'payment_info',
        paymentFlow: { ...prev.paymentFlow, method, cardStep: 'card_number' }
      }));
    } else if (method === 'apply_carecredit') {
      await addMessages([
        createBotMessage("To apply for a new card, Click the following URL:")
      ]);
      
      await delay(500);
      
      await addMessages([
        createBotMessage("https://www.mycharthealthsystem.com/apply")
      ]);
      
      await delay(1000);
      
      await addMessages([
        createBotMessage("Is there anything else I can help you with today?")
      ]);
      
      setCurrentOptions([
        {
          id: 'yes_more_help',
          label: 'Yes',
          action: 'yes_more_help'
        },
        {
          id: 'no_more_help',
          label: 'No',
          action: 'no_more_help'
        }
      ]);

      setConversationState(prev => ({
        ...prev,
        context: 'follow_up'
      }));
    }
  };

  return {
    handlePaymentMethodSelect
  };
};