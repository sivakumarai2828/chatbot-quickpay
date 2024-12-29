import { ReceiptDetails } from '../types/interfaces/receipt.interface';

export const generateReceiptContent = (details: ReceiptDetails): string => {
  return `
Payment Confirmation Receipt

Confirmation Number: ${details.confirmationNumber}
Amount: $${details.amount.toFixed(2)}
Date: ${details.date}
Payment Method: ${details.paymentMethod}
Provider: ${details.provider}

Thank you for your payment!
`;
};

export const sendEmailReceipt = async (email: string, details: ReceiptDetails): Promise<boolean> => {
  try {
    // Simulate API call to send email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, this would make an API call to your email service
    console.log('Sending receipt to:', email, generateReceiptContent(details));
    
    return true;
  } catch (error) {
    console.error('Failed to send email receipt:', error);
    return false;
  }
};