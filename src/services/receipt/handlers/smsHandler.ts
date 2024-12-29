import { ReceiptDetails } from '../../../types/interfaces/receipt.interface';
import { SmsResponse } from '../../../types/interfaces/service.interface';
import { logger } from '../../../utils/logger';
import { generateReceiptContent } from '../generators/contentGenerator';
import { BaseReceiptHandler } from './baseHandler';

export class SmsReceiptHandler extends BaseReceiptHandler {
  protected serviceName = 'SMS';

  async send(to: string, details: ReceiptDetails): Promise<SmsResponse> {
    try {
      logger.info(`Sending receipt SMS to: ${to}`);
      const { body } = generateReceiptContent(details);
      
      await this.simulateServiceCall();
      
      logger.info(`SMS content: ${body}`);
      logger.info(`Receipt SMS sent successfully to: ${to}`);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: `Failed to send ${this.serviceName}. Please try again.` 
      };
    }
  }
}

export const smsService = new SmsReceiptHandler();