import { PaymentCalculationParams, PaymentPlan, PaymentSummary } from '../../types/interfaces';
import { logger } from '../logger';

export const calculatePaymentPlan = (params: PaymentCalculationParams): PaymentPlan => {
  try {
    const { 
      amount,
      months,
      type,
      label = '',
      details = ''
    } = params;
    
    // Ensure exact amount with 2 decimal places
    const exactAmount = Number(amount.toFixed(2));
    const exactMonthlyPayment = Number((exactAmount / months).toFixed(2));
    
    return {
      id: `${type}_${months}`,
      type,
      months,
      monthlyPayment: exactMonthlyPayment,
      label: label || `${months}mo • $${exactMonthlyPayment.toFixed(2)}/mo`,
      details: details || `${type === 'no_interest' ? 'No interest if paid in full' : 'Reduced APR'} within ${months} months`,
      amount: exactAmount
    };
  } catch (error) {
    logger.error(`Error calculating payment plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};

export const generatePaymentSummary = (amount: number, plan: PaymentPlan): PaymentSummary => {
  try {
    const today = new Date();
    // Ensure exact amount with 2 decimal places
    const exactAmount = Number(amount.toFixed(2));
    const monthlyPayment = Number((exactAmount / plan.months).toFixed(2));

    return {
      balance: exactAmount,
      planType: `${plan.months} Months ${
        plan.type === 'no_interest' 
          ? '- No Interest if Paid in Full'
          : '- Reduced APR'
      }`,
      monthlyPayment,
      totalMonths: plan.months,
      firstPaymentDate: new Date(today.setDate(today.getDate() + 30)).toLocaleDateString()
    };
  } catch (error) {
    logger.error(`Error generating payment summary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};