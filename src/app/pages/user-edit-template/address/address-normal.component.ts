import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AddressModel {
  address: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
}

@Component({
  selector: 'app-address-normal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address-normal.component.html',
  styleUrls: ['./address-normal.component.scss'],
})
export class AddressNormalComponent {
  @Input({ required: true }) address!: AddressModel;
}

