export const generatePaymentOptions = () => {
  return [
    {
      id: 'pay_full',
      label: 'Pay Full Amount',
      action: 'pay_full'
    },
    {
      id: 'pay_other',
      label: 'Pay Other Amount',
      action: 'pay_other'
    }
  ];
};