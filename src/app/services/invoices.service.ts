import { HttpClient } from '@angular/common/http';
import { Injectable, TransferState } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  ICalculateHoursBody,
  IInvoice,
  IInvoiceBody,
} from '../interfaces/invoice.interface';
import { envStateKey } from '../app.config.server';
import { NotifyService } from './notify.service';
import { IWorkingHours } from '../interfaces/working-hours.interface';
import { IProject } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private readonly urlPath: string = 'sdk-finance/invoice';
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    private notifier: NotifyService
  ) {}

  getInvoices(): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(`${this.apiPath}/${this.urlPath}`);
  }

  createInvoices(body: IInvoiceBody): Observable<unknown> {
    return this.http.post(`${this.apiPath}/${this.urlPath}`, body).pipe(
      tap(() =>
        this.notifier.notifySub.next({
          type: 'success',
          message: 'Invoice was created',
        })
      )
    );
  }

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${this.apiPath}/sdk-finance/projects`);
  }

  getProjectEmails(projectId: number): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiPath}/sdk-finance/projects/${projectId}/emails`
    );
  }

  generateProjectHours(body: ICalculateHoursBody): Observable<IWorkingHours[]> {
    return this.http.post<IWorkingHours[]>(
      `${this.apiPath}/${this.urlPath}/calculate`,
      body
    );
  }

  get apiPath(): string {
    return this.transferState.get(envStateKey, {
      API_URL: '',
    }).API_URL;
  }
}
