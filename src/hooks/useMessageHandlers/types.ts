import { Bill, CareAccount } from '../../types/interfaces';

export interface AccountFlowProps {
  option: { id: string; label: string; action: string };
  selectedBill: Bill | null;
  careAccounts: CareAccount[];
  handleAccountSelection: (accountId: string, accounts: CareAccount[], bill: Bill) => Promise<void>;
  setIsProcessing: (value: boolean) => void;
}

export interface PaymentFlowProps {
  option: { id: string; label: string; action: string };
  selectedBill: Bill | null;
  handlePlanSelection: (planId: string, bill: Bill) => Promise<void>;
  setIsProcessing: (value: boolean) => void;
}