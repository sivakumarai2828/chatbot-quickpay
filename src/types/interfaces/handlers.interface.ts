import { Bill, CareAccount, ConversationState } from './index';

export interface MessageHandlersProps {
  conversationState: ConversationState;
  selectedBill: Bill | null;
  careAccounts: CareAccount[];
  setIsProcessing: (value: boolean) => void;
  setCurrentOptions: (options: any[]) => void;
  setShowBills: (value: boolean) => void;
  setShowCustomAmount: (value: boolean) => void;
  setShowPaymentSummary: (value: boolean) => void;
  addMessages: (messages: any[]) => Promise<void>;
  handleAccountLookup: (text: string) => Promise<void>;
  handleCardLookup: (text: string) => Promise<void>;
  handleAccountSelection: (accountId: string, accounts: CareAccount[], bill: Bill) => Promise<void>;
  handlePlanSelection: (planId: string, bill: Bill) => Promise<void>;
  handleConfirmation: (confirmationNumber: string) => Promise<void>;
  handleFollowUp: (wantsMoreHelp: boolean) => Promise<void>;
  handlePaymentMethodSelect: (method: string) => Promise<void>;
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void;
}

export interface MessageHandlerHooks {
  handleSendMessage: (text: string) => Promise<void>;
  handleOptionSelect: (option: { id: string; label: string; action: string }) => Promise<void>;
  isLoading: boolean;
}