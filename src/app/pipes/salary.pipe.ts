import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salary',
  standalone: true
})
export class SalaryPipe implements PipeTransform {
  transform(value: number): string {
    return '₹ ' + value.toLocaleString('en-IN');
  }
}
