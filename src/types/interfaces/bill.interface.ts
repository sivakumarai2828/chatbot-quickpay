export interface Bill {
  id: string;
  provider: string;
  amount: number;
  paymentOptions: PaymentOption[];
}

export interface PaymentOption {
  id: string;
  label: string;
  action: string;
}