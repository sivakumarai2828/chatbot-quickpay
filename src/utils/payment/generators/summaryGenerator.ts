import { PaymentSummary, PaymentPlan } from '../../../types/interfaces';
import { logger } from '../../logger';

export const generatePaymentSummary = (
  amount: number,
  plan: PaymentPlan
): PaymentSummary => {
  try {
    const today = new Date();
    const monthlyPayment = plan.type === 'no_interest' 
      ? Number((amount / plan.months).toFixed(2))
      : plan.monthlyPayment;

    return {
      balance: amount,
      planType: `${plan.months} Months ${
        plan.type === 'no_interest' 
          ? '- No Interest if Paid in Full'
          : '- Reduced APR'
      }`,
      monthlyPayment,
      totalMonths: plan.months,
      firstPaymentDate: new Date(
        today.setDate(today.getDate() + 30)
      ).toLocaleDateString()
    };
  } catch (error) {
    logger.error(`Error generating payment summary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw new Error('Failed to generate payment summary');
  }
};