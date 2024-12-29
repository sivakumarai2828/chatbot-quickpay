import { ReceiptDetails } from '../../../types/interfaces/receipt.interface';
import { ReceiptContent } from '../types';
import { formatAmount } from '../../../utils/payment/formatters/amountFormatter';

export const generateSubject = (confirmationNumber: string): string => {
  return `Payment Confirmation - ${confirmationNumber}`;
};

export const generateBody = (details: ReceiptDetails): string => {
  return `
Payment Confirmation Receipt

Confirmation Number: ${details.confirmationNumber}
Amount: ${formatAmount(details.amount)}
Date: ${details.date}
Payment Method: ${details.paymentMethod}
Provider: ${details.provider}

Thank you for your payment!
`.trim();
};

export const generateReceiptContent = (details: ReceiptDetails): ReceiptContent => {
  return {
    subject: generateSubject(details.confirmationNumber),
    body: generateBody(details)
  };
};