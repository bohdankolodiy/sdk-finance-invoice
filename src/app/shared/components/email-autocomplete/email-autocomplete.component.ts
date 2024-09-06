import { AsyncPipe } from '@angular/common';
import { Component, forwardRef, Input, OnChanges, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
} from 'rxjs';

@Component({
  selector: 'app-email-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './email-autocomplete.component.html',
  styleUrl: './email-autocomplete.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailAutocompleteComponent),
      multi: true,
    },
  ],
})
export class EmailAutocompleteComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  emailControl = new FormControl<string | null>(null, [Validators.required]);
  @Input() emailList: string[] = [];
  @Input() isDisable: boolean = false;
  filteredOptions!: Observable<string[]>;

  ngOnChanges(): void {
    if (this.emailList.length)
      this.filteredOptions = this.emailControl.valueChanges.pipe(
        startWith(''),
        map((value: any) => this._filter(value || ''))
      );

    this.emailControl[this.isDisable ? 'disable' : 'enable']();
  }

  ngOnInit(): void {
    this.emailControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((res) => this.onChange(res));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.emailList.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public displayFn(project?: string): string {
    return project ?? '';
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {}

  public writeValue(value: string | null): void {
    if (!value) this.emailControl.reset();
  }

  private onChange = (fn: any) => {};
}
