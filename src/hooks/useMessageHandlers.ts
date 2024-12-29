import { MessageHandlersProps } from '../types/interfaces';
import { createBotMessage } from '../utils/messageUtils';
import { paymentMethods } from '../constants/paymentOptions';
import { useEmailWorkflow } from './useEmailWorkflow';
import { useSmsWorkflow } from './useSmsWorkflow';
import { handleFollowUp } from '../utils/handlers/followUpHandler';

export const useMessageHandlers = ({
  conversationState,
  selectedBill,
  careAccounts,
  setIsProcessing,
  setCurrentOptions,
  setShowBills,
  setShowCustomAmount,
  setShowPaymentSummary,
  addMessages,
  handleAccountLookup,
  handleCardLookup,
  handleAccountSelection,
  handlePlanSelection,
  handleConfirmation,
  handlePaymentMethodSelect,
  setConversationState,
}: MessageHandlersProps) => {
  const { handleEmailInput } = useEmailWorkflow({
    addMessages,
    setConversationState,
    setCurrentOptions
  });

  const { handleSmsInput } = useSmsWorkflow({
    addMessages,
    setConversationState,
    setCurrentOptions
  });

  const handleSendMessage = async (text: string) => {
    if (conversationState.context === 'payment_info') {
      if (conversationState.paymentFlow?.method === 'account_lookup') {
        await handleAccountLookup(text);
      } else if (conversationState.paymentFlow?.method === 'carecredit_card') {
        await handleCardLookup(text);
      }
    } else if (conversationState.context === 'email_input') {
      await handleEmailInput(text, conversationState);
    } else if (conversationState.context === 'phone_input') {
      await handleSmsInput(text, conversationState);
    }
  };

  const handleOptionSelect = async (option: { id: string; label: string; action: string }) => {
    setIsProcessing(true);
    setCurrentOptions([]);

    try {
      switch (option.action) {
        case 'yes_more_help':
          await handleFollowUp(true, addMessages, setCurrentOptions, setConversationState);
          setShowPaymentSummary(true);
          break;

        case 'no_more_help':
          await handleFollowUp(false, addMessages, setCurrentOptions, setConversationState);
          break;

        case 'send_email':
          await addMessages([
            createBotMessage("Please enter your email address to receive the confirmation receipt:")
          ]);
          setConversationState(prev => ({
            ...prev,
            context: 'email_input'
          }));
          break;

        case 'send_sms':
          await addMessages([
            createBotMessage("Please enter your phone number to receive the confirmation receipt via SMS:")
          ]);
          setConversationState(prev => ({
            ...prev,
            context: 'phone_input'
          }));
          break;

        case 'pay_bill':
          await addMessages([createBotMessage("Please select the bill you'd like to pay:")]);
          setShowBills(true);
          setShowCustomAmount(false);
          break;

        case 'pay_full':
          if (selectedBill) {
            await addMessages([createBotMessage("Which payment method would you like to use?")]);
            setCurrentOptions(paymentMethods);
            setConversationState(prev => ({
              ...prev,
              context: 'payment_method'
            }));
          }
          break;

        case 'pay_other':
          if (selectedBill) {
            await addMessages([createBotMessage("Please enter the amount you'd like to pay:")]);
            setShowCustomAmount(true);
          }
          break;

        case 'confirm_plan':
          if (conversationState.paymentFlow?.confirmationNumber) {
            await handleConfirmation(conversationState.paymentFlow.confirmationNumber);
          }
          break;

        default:
          if (option.action.startsWith('select_account_')) {
            const accountId = option.action.replace('select_account_', '');
            if (selectedBill) {
              await handleAccountSelection(accountId, careAccounts, selectedBill);
            }
          } else if (option.action.startsWith('plan_')) {
            const planId = option.action.replace('plan_', '');
            if (selectedBill) {
              await handlePlanSelection(planId, selectedBill);
            }
          } else {
            await handlePaymentMethodSelect(option.action);
          }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleSendMessage,
    handleOptionSelect
  };
};