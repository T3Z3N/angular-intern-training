import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalaryPipe } from './pipes/salary.pipe';
import { AddressPipe } from './pipes/address.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddressPipe, SalaryPipe],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'user-app';
}
