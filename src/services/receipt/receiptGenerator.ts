import { ReceiptDetails } from '../../types/interfaces/receipt.interface';
import { ReceiptContent } from './types';
import { formatAmount } from '../../utils/payment/formatters/amountFormatter';

export const generateReceiptContent = (details: ReceiptDetails): ReceiptContent => {
  const subject = `Payment Confirmation - ${details.confirmationNumber}`;
  const body = `
Payment Confirmation Receipt

Confirmation Number: ${details.confirmationNumber}
Amount: ${formatAmount(details.amount)}
Date: ${details.date}
Payment Method: ${details.paymentMethod}
Provider: ${details.provider}

Thank you for your payment!
`.trim();

  return {
    subject,
    body
  };
};