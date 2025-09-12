export const BOOKING_CONSTANTS = {
  MAX_IMAGE_SIZE_MB: 5,
  MAX_IMAGES_PER_STATUS: 5,
  DEFAULT_SERVICE_DURATION: 4, // hours
  WHATSAPP_MESSAGE_TIMEOUT: 30000, // 30 seconds
  AUTO_REFRESH_INTERVAL: 30000, // 30 seconds
  ITEMS_PER_PAGE: 20,
} as const;

export const SERVICE_CATEGORIES = [
  'Periodic Service',
  'AC Service',
  'Battery Service',
  'Brake Service',
  'Engine Service',
  'Transmission Service',
  'Electrical Service',
  'Body Work',
  'Paint Work',
  'Detailing',
  'Emergency Service',
  'Other'
] as const;

export const CHARGE_TYPES = [
  { value: 'labor', label: 'Labor Charge' },
  { value: 'material', label: 'Material Charge' },
  { value: 'misc', label: 'Miscellaneous' }
] as const;