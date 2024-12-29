import { useChat } from '../../../../hooks/useChat';
import { useChatHooks } from '../../../../hooks/useChatHooks';
import { useMessageHandlers } from '../../../../hooks/useMessageHandlers';
import { Bill } from '../../../../types/chat';

interface UseChatHandlersProps {
  setIsProcessing: (value: boolean) => void;
  setShowBills: (value: boolean) => void;
  setShowCustomAmount: (value: boolean) => void;
  setShowOptions: (value: boolean) => void;
  setShowPaymentSummary: (value: boolean) => void;
  setSelectedBill: (bill: Bill | null) => void;
  bills: Bill[];
}

export const useChatHandlers = ({
  setIsProcessing,
  setShowBills,
  setShowCustomAmount,
  setShowOptions,
  setShowPaymentSummary,
  setSelectedBill,
  bills
}: UseChatHandlersProps) => {
  const {
    messages,
    isTyping,
    currentOptions,
    conversationState,
    careAccounts,
    setCurrentOptions,
    setConversationState,
    setCareAccounts,
    addMessages,
    initializeChat
  } = useChat();

  const {
    isAccountProcessing,
    isPlanProcessing,
    handleAccountLookup,
    handleCardLookup,
    handleConfirmation,
    handleFollowUp,
    handleBillSelect,
    handleCustomAmount,
    handlePaymentMethodSelect,
    handleAccountSelection,
    handlePlanSelection
  } = useChatHooks(
    addMessages,
    setCurrentOptions,
    setConversationState,
    setCareAccounts,
    setShowOptions,
    setShowPaymentSummary,
    setIsProcessing,
    setShowBills,
    setShowCustomAmount,
    setSelectedBill,
    bills
  );

  const { handleSendMessage, handleOptionSelect } = useMessageHandlers({
    conversationState,
    selectedBill: null,
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
    setConversationState
  });

  return {
    messages,
    isTyping,
    currentOptions,
    conversationState,
    careAccounts,
    handlers: {
      isAccountProcessing,
      isPlanProcessing,
      handleBillSelect,
      handleCustomAmount,
      handleOptionSelect,
      handleSendMessage,
      initializeChat
    }
  };
};