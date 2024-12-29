import { AccountFlowProps } from '../types';

export const handleAccountFlow = async ({
  option,
  selectedBill,
  careAccounts,
  handleAccountSelection,
  setIsProcessing
}: AccountFlowProps) => {
  const accountId = option.action.replace('select_account_', '');
  if (selectedBill) {
    await handleAccountSelection(accountId, careAccounts, selectedBill);
  }
  setIsProcessing(false);
};