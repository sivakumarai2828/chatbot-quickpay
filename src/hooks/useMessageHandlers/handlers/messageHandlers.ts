import { ConversationState } from '../../../types/interfaces';
import { createBotMessage, createUserMessage } from '../../../utils/messageUtils';
import { mainMenuOptions } from '../../../constants/quickOptions';

export const handleBillPayment = async (
  addMessages: (messages: any[]) => Promise<void>,
  setShowBills: (value: boolean) => void,
  setShowCustomAmount: (value: boolean) => void,
  startLoading: () => void,
  stopLoading: () => void
) => {
  startLoading();
  await addMessages([createBotMessage("Retrieving your bills...")]);
  await new Promise(resolve => setTimeout(resolve, 2000));
  stopLoading();
  await addMessages([createBotMessage("Please select the bill you'd like to pay:")]);
  setShowBills(true);
  setShowCustomAmount(false);
};

export const handlePaymentConfirmation = async (
  confirmationNumber: string,
  handleConfirmation: (confirmationNumber: string) => Promise<void>
) => {
  await handleConfirmation(confirmationNumber);
};

export const handleFollowUpResponse = async (
  wantsMoreHelp: boolean,
  addMessages: (messages: any[]) => Promise<void>,
  setCurrentOptions: (options: any[]) => void,
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void
) => {
  if (wantsMoreHelp) {
    await addMessages([
      createUserMessage("Yes"),
      createBotMessage("What would you like help with?")
    ]);
    
    setConversationState(prev => ({
      ...prev,
      context: 'main_menu'
    }));
    
    setCurrentOptions(mainMenuOptions);
  } else {
    await addMessages([
      createUserMessage("No"),
      createBotMessage("Thank you for using CareCredit QuickPayBot. Have a great day!")
    ]);
    
    setConversationState(prev => ({
      ...prev,
      context: 'completed'
    }));
    
    setCurrentOptions([]);
  }
};