import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address',
  standalone: true,
})
export class AddressPipe implements PipeTransform {
  transform(address: any): string {
    if (!address) return '';
    return `${address.address}, ${address.city}, ${address.state}`;
  }
}
