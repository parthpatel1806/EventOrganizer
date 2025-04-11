import { Alert } from 'react-native';

type ErrorType = 'auth' | 'event' | 'validation' | 'network' | 'unknown';

interface ErrorHandlerOptions {
  logToConsole?: boolean;
  showAlert?: boolean;
}

export const handleError = (
  error: unknown,
  type: ErrorType,
  options: ErrorHandlerOptions = { logToConsole: true, showAlert: true }
) => {
  const errorMessage = getErrorMessage(error, type);
  
  if (options.logToConsole) {
    console.error(`[${type.toUpperCase()}]`, errorMessage, error);
  }

  if (options.showAlert) {
    const alertTitle = getAlertTitle(type);
    Alert.alert(alertTitle, errorMessage);
  }

  return errorMessage;
};

const getErrorMessage = (error: unknown, type: ErrorType): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;

  switch (type) {
    case 'auth':
      return 'Authentication failed. Please try again.';
    case 'event':
      return 'Failed to process event. Please try again.';
    case 'validation':
      return 'Invalid input. Please check your data.';
    case 'network':
      return 'Network error. Please check your connection.';
    default:
      return 'An unexpected error occurred.';
  }
};

const getAlertTitle = (type: ErrorType): string => {
  switch (type) {
    case 'auth': return 'Authentication Error';
    case 'event': return 'Event Error'; 
    case 'validation': return 'Validation Error';
    case 'network': return 'Network Error';
    default: return 'Error';
  }
};
