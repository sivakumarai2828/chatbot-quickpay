export const parseAccountSearchParams = (input: string) => {
  const parts = input.split(',').map(part => part.trim());
  
  if (parts.length !== 2) {
    return null;
  }

  const [fullName, phoneNumber] = parts;
  const nameParts = fullName.split(' ').filter(part => part.length > 0);
  
  if (nameParts.length < 2) {
    return null;
  }

  // Clean up phone number - remove any non-numeric characters
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Validate phone number format (10 digits)
  if (cleanPhoneNumber.length !== 10) {
    return null;
  }

  return {
    firstName: nameParts[0],
    lastName: nameParts[1],
    phoneNumber: cleanPhoneNumber
  };
};