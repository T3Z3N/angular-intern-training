import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { AddressNormalComponent } from './address/address-normal.component';
import { CompanyNormalComponent } from './company/company-normal.component';

@Component({
  selector: 'app-user-edit-template',
  standalone: true,
  imports: [CommonModule, FormsModule, AddressNormalComponent, CompanyNormalComponent],
  templateUrl: './user-edit-template.component.html',
  styleUrls: ['./user-edit-template.component.scss'],
})
export class UserEditNormalComponent implements OnInit {
  userId!: number;
  loading = true;
  saving = false;
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
      this.loading = false;
    });
  }

  save(form: NgForm): void {
    if (!this.user || form.invalid) {
      return;
    }

    this.saving = true;

    this.userService.updateUser(this.userId, this.user).subscribe(() => {
      this.saving = false;
      this.router.navigate(['/users', this.userId]);
    });
  }

  cancel(): void {
    this.router.navigate(['/users', this.userId]);
  }
}

