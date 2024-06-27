import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MarkAsteriskDirective } from '../../../directives/mark-asterisk.directive';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Utils } from '../../utils/utils';
import { IInvoiceBody } from '../../../interfaces/invoice.interface';

@Component({
  selector: 'app-create-invoice-modal',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MarkAsteriskDirective,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './create-invoice-modal.component.html',
  styleUrl: './create-invoice-modal.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
  ],
  animations: [
    trigger('toggleDrawer', [
      state(
        'closed',
        style({
          transform: 'translateX(100%)',
          'box-shadow': '0px 3px 6px 1px rgba(0, 0, 0, 0.6)',
        })
      ),
      state(
        'opened',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('closed => opened', [animate('0.3s linear')]),
      transition('opened => closed', [animate('0.3s linear')]),
    ]),
  ],
})
export class CreateInvoiceModalComponent implements OnInit {
  isOpen: boolean = false;
  newInvoiceForm: FormGroup = new FormGroup({
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),
  });

  get startDate(): AbstractControl {
    return this.newInvoiceForm.get('startDate')!;
  }
  get endDate(): AbstractControl {
    return this.newInvoiceForm.get('endDate')!;
  }

  constructor(private dialogRef: MatDialogRef<CreateInvoiceModalComponent>) {}

  ngOnInit(): void {
    this.trigerAnimation(() => (this.isOpen = !this.isOpen), 0);
  }

  save() {
    if (this.newInvoiceForm.invalid) return;
    this.cancel(this.modalBody);
  }

  get modalBody(): IInvoiceBody {
    return {
      customerId: 302,
      startDate: Utils.formatDateToString([new Date(this.startDate.value)])!,
      endDate: Utils.formatDateToString([new Date(this.endDate.value)])!,
    };
  }

  trigerAnimation(callback: any, duration: number = 0) {
    setTimeout(callback, duration);
  }

  cancel(body?: IInvoiceBody) {
    this.isOpen = !this.isOpen;
    this.trigerAnimation(() => this.dialogRef.close(body), 300);
  }
}
