import { logger } from '../../logger';

export const formatAmount = (amount: number): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    logger.error(`Error formatting amount: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return `$${amount.toFixed(2)}`;
  }
};

export const parseAmount = (input: string): number | null => {
  try {
    const cleanAmount = input.replace(/[$,]/g, '');
    const parsedAmount = parseFloat(cleanAmount);
    return isNaN(parsedAmount) || parsedAmount < 0 ? null : Number(parsedAmount.toFixed(2));
  } catch (error) {
    logger.error(`Error parsing amount: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return null;
  }
};