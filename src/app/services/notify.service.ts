import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { INotifier } from '../interfaces/notifier.interface';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  notifySub: Subject<INotifier> = new Subject<INotifier>();
  constructor() {}
}
