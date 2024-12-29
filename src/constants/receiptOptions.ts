import { ReceiptOption } from '../types/interfaces/receipt.interface';

export const receiptOptions: ReceiptOption[] = [
  {
    id: 'email',
    label: 'Send to Email',
    action: 'send_email',
    icon: 'email'
  },
  {
    id: 'sms',
    label: 'Send to Phone',
    action: 'send_sms',
    icon: 'phone'
  }
];