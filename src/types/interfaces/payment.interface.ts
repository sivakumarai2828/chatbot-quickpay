export interface PaymentPlan {
  id: string;
  type: 'no_interest' | 'reduced_apr';
  months: number;
  monthlyPayment: number;
  label: string;
  details: string;
  amount?: number;
}

export interface PaymentSummary {
  balance: number;
  planType: string;
  monthlyPayment: number;
  totalMonths: number;
  firstPaymentDate: string;
}

export interface CareAccount {
  id: string;
  lastFour: string;
  type: 'primary' | 'secondary';
}

export interface PaymentCalculationParams {
  amount: number;
  months: number;
  type: 'no_interest' | 'reduced_apr';
  monthlyPayment?: number;
  label?: string;
  details?: string;
}