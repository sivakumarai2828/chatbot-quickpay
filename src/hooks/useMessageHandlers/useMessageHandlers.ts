import { MessageHandlersProps, MessageHandlerHooks } from '../../types/interfaces/handlers.interface';
import { createBotMessage } from '../../utils/messageUtils';
import { handleReceiptInput } from './handlers/receiptHandler';

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
  handleFollowUp,
  handlePaymentMethodSelect,
  setConversationState,
}: MessageHandlersProps): MessageHandlerHooks => {
  const handleSendMessage = async (text: string) => {
    if (conversationState.context === 'payment_info') {
      if (conversationState.paymentFlow?.method === 'account_lookup') {
        await handleAccountLookup(text);
      } else if (conversationState.paymentFlow?.method === 'carecredit_card') {
        await handleCardLookup(text);
      }
    } else if (conversationState.context === 'email_input' || conversationState.context === 'phone_input') {
      await handleReceiptInput(
        text,
        conversationState,
        addMessages,
        setConversationState,
        setCurrentOptions
      );
    }
  };

  const handleOptionSelect = async (option: { id: string; label: string; action: string }) => {
    setIsProcessing(true);
    setCurrentOptions([]);

    try {
      if (option.action === 'send_email') {
        await addMessages([
          createBotMessage("Please enter your email address to receive the confirmation receipt:")
        ]);
        setConversationState(prev => ({
          ...prev,
          context: 'email_input'
        }));
      } else if (option.action === 'send_sms') {
        await addMessages([
          createBotMessage("Please enter your phone number to receive the confirmation receipt via SMS:")
        ]);
        setConversationState(prev => ({
          ...prev,
          context: 'phone_input'
        }));
      } else if (option.action.startsWith('select_account_')) {
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
        switch (option.action) {
          case 'pay_bill':
            await addMessages([createBotMessage("Please select the bill you'd like to pay:")]);
            setShowBills(true);
            setShowCustomAmount(false);
            break;

          case 'pay_full':
            if (selectedBill) {
              await addMessages([createBotMessage("How would you like to pay?")]);
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

          case 'yes_more_help':
            await handleFollowUp(true);
            setShowPaymentSummary(true);
            break;

          case 'no_more_help':
            await handleFollowUp(false);
            break;

          default:
            await handlePaymentMethodSelect(option.action);
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleSendMessage,
    handleOptionSelect,
    isLoading: false
  };
};