import { ReceiptDetails } from '../../types/interfaces/receipt.interface';
import { SmsResponse } from '../../types/interfaces/service.interface';
import { logger } from '../../utils/logger';
import { generateReceiptContent } from './receiptGenerator';
import { ReceiptService } from './types';

export class SmsReceiptService implements ReceiptService {
  async send(to: string, details: ReceiptDetails): Promise<SmsResponse> {
    try {
      logger.info(`Sending receipt SMS to: ${to}`);
      const { body } = generateReceiptContent(details);
      
      // Simulate API call to SMS service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, we would send the SMS here using the body
      logger.info(`SMS content: ${body}`);
      logger.info(`Receipt SMS sent successfully to: ${to}`);
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Failed to send SMS: ${errorMessage}`);
      return { 
        success: false, 
        error: 'Failed to send SMS. Please try again.' 
      };
    }
  }
}

export const smsService = new SmsReceiptService();