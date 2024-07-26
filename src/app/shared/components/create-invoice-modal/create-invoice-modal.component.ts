import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
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

import { Utils } from '../../utils/utils';
import { IInvoiceBody } from '../../../interfaces/invoice.interface';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { InvoicesService } from '../../../services/invoices.service';
import { MatSelectModule } from '@angular/material/select';
import {
  MatTooltip,
  MatTooltipModule,
  TooltipComponent,
} from '@angular/material/tooltip';
import { UITableHeader } from '../table/table.models';
import {
  IEmployeeRate,
  IWorkingHours,
} from '../../../interfaces/working-hours.interface';
import { WorkingHoursTableComponent } from './working-hours-table/working-hours-table.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'yyyy-MM-DD',
  },
  display: {
    dateInput: 'yyyy-MM-DD',
    monthYearLabel: 'yyyy',
    dateA11yLabel: 'yyyy-MM-DD',
    monthYearA11yLabel: 'yyyy',
  },
};

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
    MatSelectModule,
    MatTooltipModule,
    WorkingHoursTableComponent,
  ],
  templateUrl: './create-invoice-modal.component.html',
  styleUrl: './create-invoice-modal.component.scss',
  providers: [provideMomentDateAdapter(MY_FORMATS)],
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
  projectLists: Array<any> = [
    {
      id: 0,
      name: 'WIZDI',
    },
  ];
  generated: boolean = false;

  public headersCert: UITableHeader[] = [
    { key: 'projectNameAndId', index: 0, displayedName: 'Project' },
    { key: 'employeeFullName', index: 1, displayedName: 'Name' },
    { key: 'billableHours', index: 2, displayedName: 'Hours' },
    { key: 'rate', index: 3, displayedName: 'Rate' },
  ];

  public dataCert: IWorkingHours[] = []; // data about employees with all fields(columns)

  newInvoiceForm: FormGroup = new FormGroup({
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),
    project: new FormControl(null, [Validators.required]),
    rates: new FormControl(),
  });

  get startDate(): AbstractControl {
    return this.newInvoiceForm.get('startDate')!;
  }
  get endDate(): AbstractControl {
    return this.newInvoiceForm.get('endDate')!;
  }

  get rates(): AbstractControl {
    return this.newInvoiceForm.get('rates')!;
  }

  get modalBody(): IInvoiceBody {
    return {
      customerId: 302,
      startDate: Utils.formatDateToString([new Date(this.startDate.value)])!,
      endDate: Utils.formatDateToString([new Date(this.endDate.value)])!,
    };
  }

  get errorMessage(): string {
    return this.newInvoiceForm.invalid
      ? 'Please fill all fields & generate working hours'
      : 'Please fill rate for all employees';
  }

  get isFormValid(): boolean {
    return (
      this.newInvoiceForm.invalid ||
      !this.generated ||
      (this.rates.value || []).every(
        (el: IEmployeeRate) => Number(el.rate) >= 0
      )
    );
  }

  get total(): number {
    return this.dataCert.reduce((total, currentValue) => {
      return (
        total +
        this.transformBillableHoursToNumber(currentValue.billableHours) *
          this.getEmployeeRate(currentValue.employeeFullName.id)
      );
    }, 0);
  }

  constructor(
    private dialogRef: MatDialogRef<CreateInvoiceModalComponent>,
    private invoiceService: InvoicesService
  ) {}

  ngOnInit(): void {
    this.trigerAnimation(() => (this.isOpen = !this.isOpen), 0);
  }

  trigerAnimation(callback: any, duration: number = 0) {
    setTimeout(callback, duration);
  }

  getEmployeeRate(id: number): number {
    return (
      this.rates.value?.find((el: IEmployeeRate) => el.id === id)?.rate ?? 0
    );
  }

  save() {
    if (this.isFormValid) {
      return this.newInvoiceForm.markAllAsTouched();
    }
    console.log(this.generated);
    this.cancel(this.modalBody);
  }

  cancel(body?: IInvoiceBody) {
    this.isOpen = !this.isOpen;
    this.trigerAnimation(() => this.dialogRef.close(body), 300);
  }

  generateProjectHours() {
    if (this.newInvoiceForm.invalid) {
      return this.newInvoiceForm.markAllAsTouched();
    }

    this.invoiceService
      .generateProjectHours(this.modalBody)
      .subscribe((res: IWorkingHours[]) => {
        this.generated = Boolean(res.length);
        this.dataCert = [...res];

        this.dataCert.forEach((el) => {
          console.log(el.billableHours);
        });
      });
  }

  transformBillableHoursToNumber(billableHours: string): number {
    const [hours, minutes] = billableHours.split(':');
    return Number(hours) + Number(minutes) / 60;
  }
}
