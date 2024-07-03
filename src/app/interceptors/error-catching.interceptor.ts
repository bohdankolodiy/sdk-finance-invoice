import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';
import { InvoicesService } from '../services/invoices.service';
import { errorMessageByStatus } from '../shared/utils/error-status-handler';
import { NotifyService } from '../services/notify.service';

export const ErrorCatchingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next
) => {
  const notifier = inject(NotifyService);
  const spinner = inject(SpinnerService);
  const apiURL = inject(InvoicesService).apiPath;
  spinner.setLoading(true, req.url);

  return next(req).pipe(
    tap<HttpEvent<any>>((evt: HttpEvent<any>) => {
      if (req.url.includes(apiURL)) {
        if (evt instanceof HttpResponse) {
          spinner.setLoading(false, req.url);
        }
      }
      return evt;
    }),
    catchError((error: HttpErrorResponse) => {
      const errorMsg = errorMessageByStatus(error);
      spinner.setLoading(false, req.url);
      notifier.notifySub.next({ type: 'error', message: errorMsg });
      return throwError(() => error);
    })
  );
};
