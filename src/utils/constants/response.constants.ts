export const messages = {
  401: {
    message: 'You do not have permissions to access this module.',
    success: false,
  },
  201: {
    message: 'Created successfully.',
    success: true,
  },
  200: {
    message: 'Entity returned successfully.',
    success: true,
  },
  500: {
    message: 'Internal server error. Please contact the administrator.',
    success: false,
  },
  default: 'Default message.',
};

export const getResponseMessageByCode = (statusCode: number) => {
  return messages[statusCode].message || messages.default;
};

export const getBooleanByCode = (statusCode: number) => {
  return messages[statusCode].success;
};
