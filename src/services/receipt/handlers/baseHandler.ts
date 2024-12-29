import { ReceiptDetails } from '../../../types/interfaces/receipt.interface';
import { EmailResponse, SmsResponse } from '../../../types/interfaces/service.interface';
import { logger } from '../../../utils/logger';
import { ReceiptService } from '../types';

export abstract class BaseReceiptHandler implements ReceiptService {
  protected abstract serviceName: string;

  protected async simulateServiceCall(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  protected logError(error: unknown): string {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Failed to send ${this.serviceName}: ${errorMessage}`);
    return errorMessage;
  }

  abstract send(to: string, details: ReceiptDetails): Promise<EmailResponse | SmsResponse>;
}