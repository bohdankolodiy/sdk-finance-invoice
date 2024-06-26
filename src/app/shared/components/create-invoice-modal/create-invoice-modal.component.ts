import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { provideNativeDateAdapter } from '@angular/material/core';

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
  providers: [provideNativeDateAdapter()],
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
    ]),
  ],
})
export class CreateInvoiceModalComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  isDatePickerOpened: boolean = false;
  isoStartDate: Date | null = null;
  newInvoiceForm: FormGroup = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  get startDate(): AbstractControl {
    return this.newInvoiceForm.get('startDate')!;
  }
  constructor(private dialogRef: MatDialogRef<CreateInvoiceModalComponent>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isOpen = true;
    }, 0);
  }

  ngOnDestroy(): void {
    this.isOpen = false;
  }

  save() {
    if (this.newInvoiceForm.invalid) return;

    this.dialogRef.close(this.newInvoiceForm.getRawValue());
  }

  cancel() {
    this.dialogRef.close();
  }
}
