import {HttpErrorResponse} from '@angular/common/http';

export const errorMessageByStatus = (error: HttpErrorResponse): string => {
  let errorMessage = '';

  switch (error.status) {
    case 400:
      errorMessage = `${error.status} - ${error.error}`;
      break;
    case 401:
      errorMessage = `${error.status} - Unauthorized User`;
      break;
    case 404:
      errorMessage = `${error.status} - ${
        error.error || 'Something went wrong'
      }`;
      break;
    case 405:
      errorMessage = `${error.status} - ${error.error || 'Method Not Allowed'}`;
      break;
    case 429:
      errorMessage = `${error.status} - Too many requests`;
      break;
    default:
      errorMessage = 'Something went wrong. Please try again later';
      break;
  }
  return errorMessage;
};
