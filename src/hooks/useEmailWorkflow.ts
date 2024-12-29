import { useState } from 'react';
import { ConversationState } from '../types/interfaces';
import { createBotMessage, createUserMessage } from '../utils/messageUtils';
import { validateEmail } from '../utils/validation';
import { sendEmail } from '../services/emailService';
import { logger } from '../utils/logger';

interface EmailWorkflowProps {
  addMessages: (messages: any[]) => Promise<void>;
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void;
  setCurrentOptions: (options: any[]) => void;
}

export const useEmailWorkflow = ({
  addMessages,
  setConversationState,
  setCurrentOptions
}: EmailWorkflowProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEmailInput = async (
    email: string,
    conversationState: ConversationState
  ) => {
    if (isProcessing) {
      logger.warn('Email processing already in progress');
      return;
    }

    if (!validateEmail(email)) {
      await addMessages([
        createBotMessage("Please enter a valid email address (e.g., example@domain.com).")
      ]);
      return;
    }

    setIsProcessing(true);
    
    try {
      await addMessages([
        createUserMessage(email),
        createBotMessage("Processing your request...")
      ]);

      const receiptDetails = {
        confirmationNumber: conversationState.paymentFlow?.confirmationNumber || '',
        amount: conversationState.paymentFlow?.paymentSummary?.balance || 0,
        date: new Date().toLocaleDateString(),
        paymentMethod: conversationState.paymentFlow?.method || '',
        provider: conversationState.paymentFlow?.selectedBill?.provider || ''
      };

      const response = await sendEmail(email, receiptDetails);

      if (response.success) {
        await addMessages([
          createBotMessage(`Receipt has been sent successfully to ${email}`),
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
      logger.error(`Email workflow error: ${errorMessage}`);

      await addMessages([
        createBotMessage("I apologize, but I couldn't send the receipt at this moment. Would you like to try again?")
      ]);

      setCurrentOptions([
        {
          id: 'retry_email',
          label: 'Try Again',
          action: 'send_email'
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
    handleEmailInput
  };
};