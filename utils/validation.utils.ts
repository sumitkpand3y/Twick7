export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const validatePlateNumber = (plateNumber: string): boolean => {
  const plateRegex = /^[A-Z]{2}\s?\d{2}\s?[A-Z]{1,2}\s?\d{4}$/;
  return plateRegex.test(plateNumber.toUpperCase());
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validatePositiveNumber = (value: number): boolean => {
  return value > 0;
};

export const validateFileSize = (file: File, maxSizeInMB: number = 5): boolean => {
  return file.size <= maxSizeInMB * 1024 * 1024;
};

export const validateImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  return allowedTypes.includes(file.type);
};