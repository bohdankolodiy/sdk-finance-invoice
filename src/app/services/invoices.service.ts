import { HttpClient } from '@angular/common/http';
import { Injectable, TransferState } from '@angular/core';
import { Observable } from 'rxjs';
import { IInvoice } from '../interfaces/invoice.interface';
import { envStateKey } from '../app.config.server';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private http: HttpClient, private transferState: TransferState) {}

  getInvoices(): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(`${this.apiPath}/sdk-finance/invoice`);
  }

  private get apiPath(): string {
    return this.transferState.get(envStateKey, {
      API_URL: '',
    }).API_URL;
  }
}
