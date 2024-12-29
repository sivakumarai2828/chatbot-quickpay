export interface ReceiptOption {
  id: string;
  label: string;
  action: string;
  icon: string;
}

export interface ReceiptDetails {
  confirmationNumber: string;
  amount: number;
  date: string;
  paymentMethod: string;
  provider: string;
}