import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, UntypedFormGroup, Validators } from '@angular/forms';

@Directive({
  selector: '[appMarkAsterisk]',
  standalone: true,
})
export class MarkAsteriskDirective implements OnInit {
  public isTouched?: boolean;
  @Input() formGroup!: UntypedFormGroup;
  @Input() hasMark: boolean = true;
  @Input() controlName!: string;
  @Input() set touched(value: boolean) {
    this.isTouched = value;
    if (value) this.checkIfValid();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const asterisk = this.control.hasValidator(Validators.required);
    if (asterisk && this.hasMark) this.elementRef.nativeElement.append('*');
    this.control.valueChanges.subscribe(() => {
      this.checkIfValid();
    });
  }

  checkIfValid() {
    const req = this.control!.invalid;
    if (req && this.isTouched) {
      this.renderer.addClass(this.elementRef.nativeElement, 'required-error');
    } else {
      this.renderer.removeClass(
        this.elementRef.nativeElement,
        'required-error'
      );
    }
  }

  get control(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
