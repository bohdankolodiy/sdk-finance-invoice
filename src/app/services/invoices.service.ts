import { HttpClient } from '@angular/common/http';
import { Injectable, TransferState } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IInvoice, IInvoiceBody } from '../interfaces/invoice.interface';
import { envStateKey } from '../app.config.server';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    private notifier: NotifyService
  ) {}

  getInvoices(): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(`${this.apiPath}/sdk-finance/invoice`);
  }

  createInvoices(body: IInvoiceBody): Observable<unknown> {
    return this.http.post(`${this.apiPath}/sdk-finance/invoice?customerId=${body.customerId}&end=${body.endDate}&start=${body.startDate}`, body).pipe(
      tap(() =>
        this.notifier.notifySub.next({
          type: 'success',
          message: 'Invoice was created',
        })
      )
    );
  }

  get apiPath(): string {
    return this.transferState.get(envStateKey, {
      API_URL: '',
    }).API_URL;
  }
}
