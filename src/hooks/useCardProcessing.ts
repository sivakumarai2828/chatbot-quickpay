import { useState } from 'react';
import { ConversationState } from '../types/interfaces';
import { createBotMessage, createUserMessage } from '../utils/messageUtils';
import { paymentPlans } from '../constants/paymentPlans';
import { 
  validateCardNumber, 
  validateCVV, 
  validateExpiryDate,
  maskCardNumber,
  maskCVV,
  maskExpiryDate
} from '../utils/cardValidation';
import { delay } from '../utils/delay';

export const useCardProcessing = (
  addMessages: (messages: any[]) => Promise<void>,
  setCurrentOptions: (options: any[]) => void,
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void
) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardState, setCardState] = useState<{
    cardNumber?: string;
    cvv?: string;
    expiryDate?: string;
  }>({});

  const handleCardLookup = async (text: string) => {
    setIsProcessing(true);
    setCurrentOptions([]);

    const currentContext = cardState.cardNumber ? 
      (cardState.cvv ? 'expiry_date' : 'cvv') : 
      'card_number';

    try {
      switch (currentContext) {
        case 'card_number':
          const isValidCard = validateCardNumber(text);
          if (isValidCard) {
            setCardState(prev => ({ ...prev, cardNumber: text }));
            await addMessages([
              createUserMessage(maskCardNumber(text)),
              createBotMessage("Please enter the 3-digit CVV number from the back of your card:")
            ]);
            setConversationState(prev => ({
              ...prev,
              context: 'payment_info',
              paymentFlow: { ...prev.paymentFlow, cardStep: 'cvv' }
            }));
          } else {
            await addMessages([
              createBotMessage("Invalid card number format. Please enter a valid 16-digit CareCredit card number.")
            ]);
          }
          break;

        case 'cvv':
          const isValidCVV = validateCVV(text);
          if (isValidCVV) {
            setCardState(prev => ({ ...prev, cvv: text }));
            await addMessages([
              createUserMessage(maskCVV()),
              createBotMessage("Please enter the expiry date (MM/YY):")
            ]);
            setConversationState(prev => ({
              ...prev,
              context: 'payment_info',
              paymentFlow: { ...prev.paymentFlow, cardStep: 'expiry_date' }
            }));
          } else {
            await addMessages([
              createBotMessage("Invalid CVV format. Please enter a valid 3-digit CVV number.")
            ]);
          }
          break;

        case 'expiry_date':
          const isValidExpiry = validateExpiryDate(text);
          if (isValidExpiry) {
            setCardState(prev => ({ ...prev, expiryDate: text }));
            
            // Show user input
            await addMessages([
              createUserMessage(maskExpiryDate(text))
            ]);

            // Add delay for card verification
            await delay(2000);
            
            // Show verification message and immediately set payment options
            await addMessages([
              createBotMessage("Card verified successfully. Choose a payment plan or select 'One-time payment' if paying in full.")
            ]);

            // Prepare payment options
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

            // Update state and show options
            setCurrentOptions(paymentOptions);
            setConversationState(prev => ({
              ...prev,
              context: 'payment_plan'
            }));
          } else {
            await addMessages([
              createBotMessage("Invalid expiry date format. Please enter the date in MM/YY format.")
            ]);
          }
          break;
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    handleCardLookup
  };
};