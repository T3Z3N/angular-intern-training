import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CompanyComponent } from './company/company.component';
import { AddressComponent } from './address/address.component';

interface AddressForm {
  address: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  postalCode: FormControl<string>;
  country: FormControl<string>;
}

interface CompanyForm {
  name: FormControl<string>;
  department: FormControl<string>;
  title: FormControl<string>;
}

interface UserForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  address: FormGroup<AddressForm>;
  company: FormGroup<CompanyForm>;
}

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompanyComponent,
    AddressComponent,
  ],
  templateUrl: './user-edit-reactive.component.html',
  styleUrls: ['./user-edit-reactive.component.scss'],
})
export class UserEditComponent implements OnInit {
  userId!: number;
  loading = true;
  saving = false;

  form!: FormGroup<UserForm>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],

      address: this.fb.nonNullable.group({
        address: [''],
        city: [''],
        state: [''],
        postalCode: [''],
        country: [''],
      }),

      company: this.fb.nonNullable.group({
        name: [''],
        department: [''],
        title: [''],
      }),
    });

    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserById(this.userId).subscribe((user) => {
      this.form.patchValue(user);
      this.loading = false;
    });
  }

  get f() {
    return this.form.controls;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value)

    this.saving = true;

    this.userService
      .updateUser(this.userId, this.form.getRawValue())
      .subscribe(() => {
        this.saving = false;
        this.router.navigate(['/users', this.userId]);
      });
  }

  cancel(): void {
    this.router.navigate(['/users', this.userId]);
  }
}
