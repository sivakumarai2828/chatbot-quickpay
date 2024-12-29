import { ReceiptDetails } from '../../types/interfaces/receipt.interface';
import { EmailResponse } from '../../types/interfaces/service.interface';
import { logger } from '../../utils/logger';
import { generateReceiptContent } from './receiptGenerator';
import { ReceiptService } from './types';

export class EmailReceiptService implements ReceiptService {
  async send(to: string, details: ReceiptDetails): Promise<EmailResponse> {
    try {
      logger.info(`Sending receipt email to: ${to}`);
      const { subject, body } = generateReceiptContent(details);
      
      // Simulate API call to email service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, we would send the email here using the subject and body
      logger.info(`Email content - Subject: ${subject}, Body: ${body}`);
      logger.info(`Receipt email sent successfully to: ${to}`);
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error(`Failed to send email: ${errorMessage}`);
      return { 
        success: false, 
        error: 'Failed to send email. Please try again.' 
      };
    }
  }
}

export const emailService = new EmailReceiptService();