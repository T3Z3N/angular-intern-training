import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CompanyModel {
  name: string;
  title: string;
  department?: string;
}

@Component({
  selector: 'app-company-normal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-normal.component.html',
  styleUrls: ['./company-normal.component.scss'],
})
export class CompanyNormalComponent {
  @Input({ required: true }) company!: CompanyModel;
}

