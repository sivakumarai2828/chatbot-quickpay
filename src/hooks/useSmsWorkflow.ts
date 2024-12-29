import { useState } from 'react';
import { ConversationState } from '../types/interfaces';
import { createBotMessage, createUserMessage } from '../utils/messageUtils';
import { validatePhoneNumber, formatPhoneNumber } from '../utils/validation';
import { sendSms } from '../services/smsService';
import { logger } from '../utils/logger';

interface SmsWorkflowProps {
  addMessages: (messages: any[]) => Promise<void>;
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void;
  setCurrentOptions: (options: any[]) => void;
}

export const useSmsWorkflow = ({
  addMessages,
  setConversationState,
  setCurrentOptions
}: SmsWorkflowProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSmsInput = async (
    phone: string,
    conversationState: ConversationState
  ) => {
    if (isProcessing) {
      logger.warn('SMS processing already in progress');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      await addMessages([
        createBotMessage("Please enter a valid 10-digit phone number (e.g., 1234567890 or (123) 456-7890).")
      ]);
      return;
    }

    setIsProcessing(true);
    
    try {
      const formattedPhone = formatPhoneNumber(phone);
      
      await addMessages([
        createUserMessage(formattedPhone),
        createBotMessage("Processing your request...")
      ]);

      const receiptDetails = {
        confirmationNumber: conversationState.paymentFlow?.confirmationNumber || '',
        amount: conversationState.paymentFlow?.paymentSummary?.balance || 0,
        date: new Date().toLocaleDateString(),
        paymentMethod: conversationState.paymentFlow?.method || '',
        provider: conversationState.paymentFlow?.selectedBill?.provider || ''
      };

      const response = await sendSms(phone, receiptDetails);

      if (response.success) {
        await addMessages([
          createBotMessage(`Receipt has been sent successfully to ${formattedPhone}`),
          createBotMessage("Is there anything else I can help you with today?")
        ]);

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
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      logger.error(`SMS workflow error: ${errorMessage}`);

      await addMessages([
        createBotMessage("I apologize, but I couldn't send the receipt at this moment. Would you like to try again?")
      ]);

      setCurrentOptions([
        {
          id: 'retry_sms',
          label: 'Try Again',
          action: 'send_sms'
        },
        {
          id: 'skip_receipt',
          label: 'Skip Receipt',
          action: 'skip_receipt'
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    handleSmsInput
  };
};