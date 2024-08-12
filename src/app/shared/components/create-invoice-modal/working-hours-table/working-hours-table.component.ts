import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { UIDynamicTable, UITableHeader } from '../../table/table.models';
import { CommonModule } from '@angular/common';
import { TypeofPipe } from '../../../../pipes/typeof.pipe';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { IWorkingHours } from '../../../../interfaces/working-hours.interface';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-working-hours-table',
  standalone: true,
  imports: [
    CommonModule,
    TypeofPipe,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './working-hours-table.component.html',
  styleUrl: './working-hours-table.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WorkingHoursTableComponent),
      multi: true,
    },
  ],
})
export class WorkingHoursTableComponent implements ControlValueAccessor {
  @Input() headers!: UITableHeader[];
  @Input() set content(value: IWorkingHours[]) {
    this.contentArray = value;
  }
  private onChange: any;

  public tableData!: UIDynamicTable;
  public columnChecked!: UITableHeader; // which column is clicked
  public type!: string; // type of the sort - increment or decrement
  public contentArray!: IWorkingHours[];
  public ratesForm: FormGroup = new FormGroup({ employee: new FormArray([]) });

  get employees(): UntypedFormArray {
    return this.ratesForm.get('employee') as UntypedFormArray;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  writeValue(): void {}

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tableData = { headers: [], data: [] };
    this.buildRatesForm();
    this.subscribeToRateChanges();
  }

  buildRatesForm() {
    this.contentArray.forEach((res) => {
      this.employees.push(
        new FormGroup({
          id: new FormControl(res.employeeFullName.id),
          taskId: new FormControl(res.taskNameAndId.id),
          rate: new FormControl<number | null>(null, Validators.required),
        })
      );
    });

    this.render();
  }

  subscribeToRateChanges() {
    this.employees.valueChanges.pipe(debounceTime(300)).subscribe((res) => {
      this.onChange(res);
    });
  }

  render() {
    this.tableData = {
      headers: this.headers.filter(
        (element: UITableHeader) => !element.notVisible
      ),
      data: this.contentArray,
    };

    this.cdr.detectChanges();
  }
}
