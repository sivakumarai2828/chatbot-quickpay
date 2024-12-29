import { useState } from 'react';
import { ConversationState } from '../types/interfaces';
import { createBotMessage, createUserMessage } from '../utils/messageUtils';
import { createFollowUpMessage } from '../utils/messageDelay';
import { mainMenuOptions } from '../constants/quickOptions';

export const usePaymentConfirmation = (
  addMessages: (messages: any[]) => Promise<void>,
  setCurrentOptions: (options: any[]) => void,
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void,
  setShowOptions: (show: boolean) => void,
  setShowPaymentSummary: (show: boolean) => void
) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmation = async (confirmationNumber: string) => {
    setIsProcessing(true);
    setShowOptions(false);
    setShowPaymentSummary(false);
    
    await addMessages([
      createUserMessage("Yes, please proceed"),
      createBotMessage("Processing your payment...")
    ]);

    await new Promise(resolve => setTimeout(resolve, 2000));

    await addMessages([
      createBotMessage("Thank you! Your payment plan has been set up successfully, and your first payment is processed."),
      createBotMessage(`Here is your confirmation number: ${confirmationNumber}`)
    ]);

    const followUpMessage = await createFollowUpMessage();
    await addMessages(followUpMessage);

    setConversationState(prev => ({
      ...prev,
      context: 'follow_up'
    }));

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
    
    setShowOptions(true);
    setIsProcessing(false);
  };

  const handleFollowUp = async (wantsMoreHelp: boolean) => {
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

  return {
    isProcessing,
    handleConfirmation,
    handleFollowUp
  };
};