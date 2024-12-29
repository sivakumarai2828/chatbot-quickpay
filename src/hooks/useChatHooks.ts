import { useAccountSelection } from './useAccountSelection';
import { usePaymentPlan } from './usePaymentPlan';
import { usePaymentConfirmation } from './usePaymentConfirmation';
import { useBillSelection } from './useBillSelection';
import { usePaymentMethod } from './usePaymentMethod';
import { useCardProcessing } from './useCardProcessing';
import { ConversationState, Bill } from '../types/chat';

export const useChatHooks = (
  addMessages: (messages: any[]) => Promise<void>,
  setCurrentOptions: (options: any[]) => void,
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void,
  setCareAccounts: (accounts: any[]) => void,
  setShowOptions: (show: boolean) => void,
  setShowPaymentSummary: (show: boolean) => void,
  setIsProcessing: (isProcessing: boolean) => void,
  setShowBills: (show: boolean) => void,
  setShowCustomAmount: (show: boolean) => void,
  setSelectedBill: (bill: Bill | null) => void,
  bills: Bill[]
) => {
  const {
    isProcessing: isAccountProcessing,
    handleAccountLookup,
    handleAccountSelection
  } = useAccountSelection(
    addMessages,
    setCurrentOptions,
    setConversationState,
    setCareAccounts
  );

  const {
    isProcessing: isCardProcessing,
    handleCardLookup
  } = useCardProcessing(
    addMessages,
    setCurrentOptions,
    setConversationState
  );

  const {
    isProcessing: isPlanProcessing,
    handlePlanSelection
  } = usePaymentPlan(
    addMessages,
    setCurrentOptions,
    setConversationState
  );

  const {
    handleConfirmation,
    handleFollowUp
  } = usePaymentConfirmation(
    addMessages,
    setCurrentOptions,
    setConversationState,
    setShowOptions,
    setShowPaymentSummary
  );

  const {
    handleBillSelect,
    handleCustomAmount
  } = useBillSelection(
    setIsProcessing,
    setCurrentOptions,
    setShowBills,
    setShowCustomAmount,
    setSelectedBill,
    setConversationState,
    addMessages,
    bills
  );

  const {
    handlePaymentMethodSelect
  } = usePaymentMethod(
    addMessages,
    setConversationState,
    setCurrentOptions
  );

  return {
    isAccountProcessing,
    isPlanProcessing,
    isCardProcessing,
    handleAccountLookup,
    handleAccountSelection,
    handleCardLookup,
    handlePlanSelection,
    handleConfirmation,
    handleFollowUp,
    handleBillSelect,
    handleCustomAmount,
    handlePaymentMethodSelect
  };
};