import { EmailResponse, SmsResponse } from '../../types/interfaces/service.interface';
import { ReceiptDetails } from '../../types/interfaces/receipt.interface';

export interface ReceiptService {
  send: (to: string, details: ReceiptDetails) => Promise<EmailResponse | SmsResponse>;
}

export interface ReceiptContent {
  subject: string;
  body: string;
}