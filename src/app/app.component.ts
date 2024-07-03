import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SpinnerService } from './services/spinner.service';
import { delay } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotifyService } from './services/notify.service';
import { INotifier } from './interfaces/notifier.interface';
import { ToastrService } from 'ngx-toastr';
import { NotifierTypes } from './enums/notifier-type.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'sdk-finance-invoice';
  loading: boolean = false;

  constructor(
    private spinner: SpinnerService,
    private toastr: ToastrService,
    private notify: NotifyService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.listenToLoading();
    this.listenToNotifier();
  }

  listenToLoading(): void {
    this.spinner.loadingSub
      .pipe(delay(0), takeUntilDestroyed(this.destroyRef))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  listenToNotifier(): void {
    this.notify.notifySub
      .pipe(delay(0), takeUntilDestroyed(this.destroyRef))
      .subscribe((notifierObj: INotifier) => {
        switch (notifierObj.type) {
          case NotifierTypes.success:
            this.toastr.success(notifierObj.message);
            break;
          case NotifierTypes.error:
            this.toastr.error(notifierObj.message);
            break;

          default:
            this.toastr.warning(notifierObj.message);

            break;
        }
      });
  }
}
