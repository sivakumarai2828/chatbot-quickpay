export const validateAmount = (amount: number, maxAmount: number): boolean => {
  return amount > 0 && amount <= maxAmount;
};

export const validatePaymentAmount = (amount: number | null): boolean => {
  return amount !== null && amount > 0;
};