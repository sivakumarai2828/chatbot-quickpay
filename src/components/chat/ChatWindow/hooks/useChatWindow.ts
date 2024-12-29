import { useState, useCallback, useEffect } from 'react';
import { Bill } from '../../../../types/interfaces';
import { useChat } from '../../../../hooks/useChat';
import { useChatHooks } from '../../../../hooks/useChatHooks';
import { useMessageHandlers } from '../../../../hooks/useMessageHandlers';
import { bills } from '../../../../constants/bills';

export const useChatWindow = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [showBills, setShowBills] = useState(false);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showPaymentSummary, setShowPaymentSummary] = useState(true);

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
    setConversationState
  });

  const initializeChatCallback = useCallback(() => {
    if (!isMinimized) {
      initializeChat();
    }
  }, [isMinimized, initializeChat]);

  useEffect(() => {
    initializeChatCallback();
  }, [initializeChatCallback]);

  return {
    isMinimized,
    showBills,
    showCustomAmount,
    selectedBill,
    isProcessing,
    showOptions,
    showPaymentSummary,
    messages,
    isTyping,
    currentOptions,
    conversationState,
    isAccountProcessing,
    isPlanProcessing,
    isLoading: false,
    handlers: {
      handleBillSelect,
      handleCustomAmount,
      handleOptionSelect,
      handleSendMessage
    },
    setIsMinimized
  };
};