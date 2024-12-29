import { CareAccount, PaymentPlan, PaymentSummary } from '../types/chat';
import { mockCareAccounts } from '../constants/mockData';

export const parseUserInfo = (input: string): { firstName?: string; lastName?: string; phoneNumber?: string } => {
  const parts = input.split(',').map(part => part.trim());
  if (parts.length !== 2) return {};

  const [fullName, phoneNumber] = parts;
  const nameParts = fullName.split(' ');
  
  if (nameParts.length < 2) return {};
  
  return {
    firstName: nameParts[0],
    lastName: nameParts[1],
    phoneNumber: phoneNumber
  };
};

export const findCareAccounts = (
  _firstName: string,
  _lastName: string,
  _phoneNumber: string
): CareAccount[] => {
  return mockCareAccounts;
};

export const generatePaymentSummary = (
  balance: number,
  plan: PaymentPlan
): PaymentSummary => {
  const today = new Date();
  const monthlyPayment = plan.type === 'no_interest' 
    ? Math.ceil((balance / plan.months) * 100) / 100
    : plan.monthlyPayment;
  
  return {
    balance,
    planType: `${plan.months} Months ${
      plan.type === 'no_interest' 
        ? '- No Interest if Paid in Full'
        : '- Reduced APR'
    }`,
    monthlyPayment,
    totalMonths: plan.months,
    firstPaymentDate: new Date(today.setDate(today.getDate() + 30)).toLocaleDateString()
  };
};

export const generateConfirmationNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  
  return `${year}${month}${day}${hour}${minute}${second}${random}`;
};