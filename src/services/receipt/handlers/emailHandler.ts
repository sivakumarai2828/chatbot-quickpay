import { ReceiptDetails } from '../../../types/interfaces/receipt.interface';
import { EmailResponse } from '../../../types/interfaces/service.interface';
import { logger } from '../../../utils/logger';
import { generateReceiptContent } from '../generators/contentGenerator';
import { BaseReceiptHandler } from './baseHandler';

export class EmailReceiptHandler extends BaseReceiptHandler {
  protected serviceName = 'email';

  async send(to: string, details: ReceiptDetails): Promise<EmailResponse> {
    try {
      logger.info(`Sending receipt email to: ${to}`);
      const { subject, body } = generateReceiptContent(details);
      
      await this.simulateServiceCall();
      
      logger.info(`Email content - Subject: ${subject}, Body: ${body}`);
      logger.info(`Receipt email sent successfully to: ${to}`);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: `Failed to send ${this.serviceName}. Please try again.` 
      };
    }
  }
}

export const emailService = new EmailReceiptHandler();