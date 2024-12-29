import { PaymentPlan, PaymentSummary } from './payment.interface';
import { Bill } from './bill.interface';

export interface ChatOption {
  id: string;
  label: string;
  action: string;
  details?: string;
}

export interface ConversationState {
  context: string;
  lastIntent?: string;
  pendingAction?: string;
  selectedBill?: string;
  paymentFlow?: {
    method?: string;
    cardStep?: 'card_number' | 'cvv' | 'expiry_date';
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    selectedAccount?: string;
    selectedPlan?: PaymentPlan;
    paymentSummary?: PaymentSummary;
    confirmationNumber?: string;
    selectedBill?: Bill;
  };
}