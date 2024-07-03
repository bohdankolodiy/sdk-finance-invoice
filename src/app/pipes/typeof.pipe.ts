import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeof',
  standalone: true,
})
export class TypeofPipe implements PipeTransform {
  transform(value: number | string): string {
    return typeof value;
  }
}
