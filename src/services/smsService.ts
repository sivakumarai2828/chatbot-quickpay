import { ReceiptDetails } from '../types/interfaces/receipt.interface';
import { logger } from '../utils/logger';

export interface SmsResponse {
  success: boolean;
  error?: string;
}

export const sendSms = async (
  to: string, 
  details: ReceiptDetails
): Promise<SmsResponse> => {
  try {
    logger.info(`Sending receipt SMS to: ${to}`);
    
    // Simulate API call to SMS service
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, this would be your actual SMS service integration
    // using the receipt details to generate and send the SMS
    logger.info(`Receipt details: ${JSON.stringify(details)}`);
    logger.info(`SMS sent successfully to: ${to}`);
    
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error(`Failed to send SMS: ${errorMessage}`);
    return { 
      success: false, 
      error: 'Failed to send SMS. Please try again.' 
    };
  }
};