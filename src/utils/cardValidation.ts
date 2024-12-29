export const validateCardNumber = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  return /^\d{16}$/.test(cleanNumber);
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3}$/.test(cvv);
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  // Check format MM/YY
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
    return false;
  }

  const [month, year] = expiryDate.split('/').map(num => parseInt(num, 10));
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  // Validate month (1-12)
  if (month < 1 || month > 12) {
    return false;
  }

  // Validate year and expiration
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return true;
};

export const maskCardNumber = (cardNumber: string): string => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  return `**** **** **** ${cleanNumber.slice(-4)}`;
};

export const maskCVV = (): string => {
  return '***';
};

export const maskExpiryDate = (expiryDate: string): string => {
  return expiryDate;
};