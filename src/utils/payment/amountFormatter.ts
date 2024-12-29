import { logger } from '../logger';

export const formatCurrencyAmount = (amount: number): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    logger.error(`Error formatting currency amount: ${error}`);
    return `$${amount.toFixed(2)}`;
  }
};

export const parseAmount = (amount: string): number | null => {
  try {
    // Remove currency symbol and any commas
    const cleanAmount = amount.replace(/[$,]/g, '');
    const parsedAmount = parseFloat(cleanAmount);
    
    if (isNaN(parsedAmount) || parsedAmount < 0) {
      return null;
    }
    
    // Ensure exactly 2 decimal places
    return Number(parsedAmount.toFixed(2));
  } catch (error) {
    logger.error(`Error parsing amount: ${error}`);
    return null;
  }
};