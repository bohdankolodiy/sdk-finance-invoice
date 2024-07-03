import {
  UntypedFormGroup,
  UntypedFormControl,
  AbstractControl,
  UntypedFormArray,
} from '@angular/forms';
import { DateTime } from 'luxon';
import {
  SchedulerLike,
  asyncScheduler,
  OperatorFunction,
  connect,
  concat,
  take,
  debounceTime,
} from 'rxjs';

/**
 * Function that format the date into the string
 * @param date date value with string or Date format
 * @returns returs the string in 'dd/mm/yyyy' format
 */
const formatDateToString = (date: string | null | [Date]): string | null => {
  return date === null || typeof date === 'string'
    ? date
    : DateTime.fromJSDate(date[0]).toFormat('yyyy-MM-dd');
};

const formatStringToDate = (date: string): Date => {
  return DateTime.fromFormat(date, 'yyyy-LL-dd').toJSDate();
};

const formatStringToDateTime = (date: string): DateTime => {
  return DateTime.fromFormat(date, 'yyyy-LL-dd');
};

const isToday = (date: DateTime): boolean => {
  return date.toISODate() === DateTime.local().toISODate();
};

/**
 * Function that compare the two objects' values
 * @param obj1 First object for compare
 * @param obj2 Second object for compare
 * @returns true is both object are equal and false if not
 */
const isEqualObjects = (obj1: any, obj2: any): boolean => {
  const props1 = Object.getOwnPropertyNames(obj1);
  const props2 = Object.getOwnPropertyNames(obj2);
  if (props1.length != props2.length) {
    return false;
  }
  for (const prop of props1) {
    const bothAreObjects =
      typeof obj1[prop] === 'object' &&
      typeof obj2[prop] === 'object' &&
      obj1[prop] !== null &&
      obj2[prop] !== null;
    if (
      (!bothAreObjects && obj1[prop] !== obj2[prop]) ||
      (bothAreObjects && !isEqualObjects(obj1[prop], obj2[prop]))
    ) {
      return false;
    }
  }
  return true;
};

/**
 * Function that validate the form group.
 * If controls have another formGroup, call it again
 * @param form form group name for the check
 */
const validateAllFormFields = (form: UntypedFormGroup) => {
  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);
    if (control instanceof UntypedFormControl) {
      control.markAllAsTouched();
    }
    if (control instanceof UntypedFormArray) {
      control.controls.forEach((contrl) => {
        contrl.markAllAsTouched();
      });
    }
    if (control instanceof UntypedFormGroup) {
      validateAllFormFields(control);
    }
  });
};

/**
 * enableControl method activates form control
 * @param nameControl form control
 */
const enableControl = (nameControl: string, form: UntypedFormGroup): void => {
  const control = form.get(nameControl) as AbstractControl;
  control.enable();
  control.setValue(null);
  control.updateValueAndValidity();
};

/**
 * disableControl method  disables form control and sets default value
 * @param nameControl form control
 */
const disableControl = (nameControl: string, form: UntypedFormGroup): void => {
  const control = form.get(nameControl) as AbstractControl;
  control.disable();
  control.clearValidators();
  control.updateValueAndValidity();
};

/**
 * Function that check the valid value of the control
 * @param field the control that should be checked
 * @param form the formGroup
 * @returns boolean if the control is invalid
 */
const isFieldInvalid = (field: string, form: UntypedFormGroup): boolean => {
  return !form.get(field)!.valid && form.get(field)!.touched;
};

/**
 * Function count months between two dates
 *
 * @param today
 * @param period selected day
 * @returns number of months
 */
const monthDiff = (today: string, period: string): number => {
  let monthDifferense;
  const start = formatStringToDateTime(today);
  const end = formatStringToDateTime(period);
  monthDifferense = Math.floor(end.diff(start, 'month').months);
  return monthDifferense <= 0 ? 0 : monthDifferense;
};

export const monthDiffNow = (period: string): number => {
  const monthDifferense = Math.floor(
    formatStringToDateTime(period).diffNow('month').months
  );
  return monthDifferense <= 0 ? 0 : monthDifferense;
};

const debounceTimeAfter = (
  amount: number,
  dueTime: number,
  scheduler: SchedulerLike = asyncScheduler
): OperatorFunction<any, any> => {
  return connect((value) =>
    concat(
      value.pipe(take(amount)),
      value.pipe(debounceTime(dueTime, scheduler))
    )
  );
};

const debounceTimeAfterFirst = (
  dueTime: number,
  scheduler: SchedulerLike = asyncScheduler
): OperatorFunction<any, any> => {
  return debounceTimeAfter(1, dueTime, scheduler);
};

const downloadBlobFile = (file: Blob, fileName: string) => {
  if (!fileName) return;
  const dataType = file.type;
  const binaryData = [];
  binaryData.push(file);
  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(
    new Blob(binaryData, { type: dataType })
  );
  downloadLink.setAttribute('download', fileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

/**
 * This funciton helps to generate headers from received data
 *
 * @param headers array of headers
 * @param clickableColumns array of clickable columns
 * @returns array of UITableHeader's objects
 *
 */

export const Utils = {
  formatDateToString,
  formatStringToDate,
  formatStringToDateTime,
  isToday,
  isEqualObjects,
  validateAllFormFields,
  enableControl,
  disableControl,
  isFieldInvalid,
  monthDiff,
  debounceTimeAfterFirst,
  downloadBlobFile,
  monthDiffNow,
};
