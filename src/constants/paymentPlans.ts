import { PaymentPlan } from '../types/chat';

export const paymentPlans: PaymentPlan[] = [
  {
    id: 'no_interest_6',
    type: 'no_interest',
    months: 6,
    monthlyPayment: 250,
    label: '6mo • $250/mo',
    details: 'No interest if paid in full within 6 months. Minimum monthly payments required.'
  },
  {
    id: 'no_interest_18',
    type: 'no_interest',
    months: 18,
    monthlyPayment: 250,
    label: '18mo • $250/mo',
    details: 'No interest if paid in full within 18 months. Minimum monthly payments required.'
  },
  {
    id: 'no_interest_24',
    type: 'no_interest',
    months: 24,
    monthlyPayment: 188,
    label: '24mo • $188/mo',
    details: 'No interest if paid in full within 24 months. Minimum monthly payments required.'
  },
  {
    id: 'reduced_apr_24',
    type: 'reduced_apr',
    months: 24,
    monthlyPayment: 225,
    label: '24mo • $225/mo',
    details: 'Reduced APR of 14.90% for 24 months with fixed monthly payments.'
  },
  {
    id: 'reduced_apr_36',
    type: 'reduced_apr',
    months: 36,
    monthlyPayment: 165,
    label: '36mo • $165/mo',
    details: 'Reduced APR of 14.90% for 36 months with fixed monthly payments.'
  },
  {
    id: 'reduced_apr_48',
    type: 'reduced_apr',
    months: 48,
    monthlyPayment: 137,
    label: '48mo • $137/mo',
    details: 'Reduced APR of 14.90% for 48 months with fixed monthly payments.'
  },
  {
    id: 'reduced_apr_60',
    type: 'reduced_apr',
    months: 60,
    monthlyPayment: 122,
    label: '60mo • $122/mo',
    details: 'Reduced APR of 14.90% for 60 months with fixed monthly payments.'
  }
];