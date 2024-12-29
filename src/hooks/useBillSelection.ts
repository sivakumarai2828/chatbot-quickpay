import { Bill, ConversationState } from '../types/interfaces';
import { createBotMessage, createUserMessage } from '../utils/messageUtils';
import { generatePaymentOptions } from '../utils/payment/optionsGenerator';
import { calculatePaymentPlan, generatePaymentSummary } from '../utils/payment/paymentCalculator';
import { logger } from '../utils/logger';
import { paymentMethods } from '../constants/paymentOptions';

export const useBillSelection = (
  setIsProcessing: (value: boolean) => void,
  setCurrentOptions: (options: any[]) => void,
  setShowBills: (value: boolean) => void,
  setShowCustomAmount: (value: boolean) => void,
  setSelectedBill: (bill: Bill | null) => void,
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void,
  addMessages: (messages: any[]) => Promise<void>,
  bills: Bill[]
) => {
  const handleBillSelect = async (billId: string) => {
    try {
      setIsProcessing(true);
      setCurrentOptions([]);
      
      const bill = bills.find(b => b.id === billId);
      if (bill) {
        setSelectedBill(bill);
        await addMessages([
          createUserMessage(`Selected bill: ${bill.provider}`),
          createBotMessage(`You've selected the bill from ${bill.provider} for $${bill.amount.toFixed(2)}. How would you like to pay?`)
        ]);
        setShowBills(false);

        const paymentOptions = generatePaymentOptions();
        setCurrentOptions(paymentOptions);

        const defaultPaymentPlan = calculatePaymentPlan({
          amount: bill.amount,
          months: 6,
          type: 'no_interest',
          label: 'Full Payment',
          details: 'No interest if paid in full within 6 months'
        });

        setConversationState(prev => ({
          ...prev,
          context: 'payment_method',
          paymentFlow: {
            ...prev.paymentFlow,
            selectedBill: bill,
            customAmount: null,
            paymentSummary: generatePaymentSummary(bill.amount, defaultPaymentPlan)
          }
        }));
      }
    } catch (error) {
      logger.error('Error in handleBillSelect:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCustomAmount = async (amount: number) => {
    try {
      setIsProcessing(true);
      setShowCustomAmount(false);
      
      await addMessages([
        createUserMessage(`Custom amount: $${amount.toFixed(2)}`),
        createBotMessage("Which payment method would you like to use?")
      ]);

      setCurrentOptions(paymentMethods);
      setConversationState(prev => ({
        ...prev,
        context: 'payment_method',
        paymentFlow: {
          ...prev.paymentFlow,
          customAmount: amount
        }
      }));
    } catch (error) {
      logger.error('Error in handleCustomAmount:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleBillSelect,
    handleCustomAmount
  };
};