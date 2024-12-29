import { Bill } from '../types/chat';

export const bills: Bill[] = [
  {
    id: '1',
    provider: 'EYE LASER AND SURGERY CENTER',
    amount: 999.00,
    paymentOptions: [
      { id: 'full_1', label: 'Pay Full', action: 'full' }
    ]
  },
  {
    id: '2',
    provider: 'EYE LASER AND SURGERY CENTER',
    amount: 1000.00,
    paymentOptions: [
      { id: 'full_2', label: 'Pay Full', action: 'full' }
    ]
  }
];