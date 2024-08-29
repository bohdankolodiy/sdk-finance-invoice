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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { IProject } from '../../../interfaces/project.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-autocomplete',
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
  templateUrl: './project-autocomplete.component.html',
  styleUrl: './project-autocomplete.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectAutocompleteComponent),
      multi: true,
    },
  ],
})
export class ProjectAutocompleteComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  projectControl = new FormControl<IProject | string | null>(null, [
    Validators.required,
  ]);
  @Input() projectList!: IProject[];
  filteredOptions!: Observable<IProject[]>;

  ngOnChanges(): void {
    if (this.projectList.length)
      this.filteredOptions = this.projectControl.valueChanges.pipe(
        startWith(''),
        map((value: any) =>
          this._filter((typeof value === 'object' ? value?.name : value) || '')
        )
      );
  }

  ngOnInit(): void {
    this.projectControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((res) => {
        this.onChange(res);
      });
  }

  private _filter(value: string): IProject[] {
    const filterValue = value.toLowerCase();

    return this.projectList.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  public displayFn(project?: IProject): string {
    return project ? project.name : '';
  }

  public chooseProject(option: IProject) {
    this.onChange(option);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {}

  public writeValue(): void {}

  private onChange = (fn: any) => {};
}
