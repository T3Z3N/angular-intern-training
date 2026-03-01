# Reactive Form

<div class="address-card" [formGroup]="group">
  <h3 class="section-title">Address Details</h3>

  <!-- Street -->
  <div class="form-group">
    <label>Street</label>
    <input type="text" formControlName="address" placeholder="Street address" />
  </div>

  <!-- City -->
  <div class="form-group">
    <label>City</label>
    <input type="text" formControlName="city" placeholder="City" />
  </div>

  <!-- State -->
  <div class="form-group">
    <label>State</label>
    <input type="text" formControlName="state" placeholder="State" />
  </div>

  <!-- Postal Code -->
  <div class="form-group">
    <label>Postal Code</label>
    <input type="text" formControlName="postalCode" placeholder="Postal Code" />
  </div>

  <!-- Country -->
  <div class="form-group">
    <label>Country</label>
    <input type="text" formControlName="country" placeholder="Country" />
  </div>
</div>
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
selector: 'app-address',
standalone: true,
imports: [CommonModule, ReactiveFormsModule],
templateUrl: './address.component.html',
styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
// Parent passes nested FormGroup
@Input({ required: true })
group!: FormGroup;
}

<div class="company-card" [formGroup]="group">
  <h3>Company Information</h3>

  <!-- Company Name -->
  <div class="form-group">
    <label for="companyName">Company Name</label>
    <input id="companyName" type="text" formControlName="name" />
    <small *ngIf="f['name'].touched && f['name'].invalid">
      Company name is required
    </small>
  </div>

  <!-- Department -->
  <div class="form-group">
    <label for="department">Department</label>
    <input id="department" type="text" formControlName="department" />
    <small *ngIf="f['department'].touched && f['department'].invalid">
      Department is required
    </small>
  </div>

  <!-- Title -->
  <div class="form-group">
    <label for="title">Job Title</label>
    <input id="title" type="text" formControlName="title" />
    <small *ngIf="f['title'].touched && f['title'].invalid">
      Job title is required
    </small>
  </div>
</div>
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
selector: 'app-company',
standalone: true,
imports: [CommonModule, ReactiveFormsModule],
templateUrl: './company.component.html',
styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
@Input({ required: true }) group!: FormGroup;

get f() {
return this.group.controls;
}
}

<div *ngIf="loading" class="loading">Loading...</div>

<div *ngIf="!loading" class="edit-card">
  <h2>Edit User</h2>

  <form [formGroup]="form" (ngSubmit)="save()">
    <!-- ================= BASIC INFO ================= -->

    <!-- First Name -->
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input id="firstName" type="text" formControlName="firstName" />
      <small *ngIf="f.firstName.touched && f.firstName.invalid">
        First name is required
      </small>
    </div>

    <!-- Last Name -->
    <div class="form-group">
      <label for="lastName">Last Name</label>
      <input id="lastName" type="text" formControlName="lastName" />
      <small *ngIf="f.lastName.touched && f.lastName.invalid">
        Last name is required
      </small>
    </div>

    <!-- Email -->
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email" />
      <small *ngIf="f.email.touched && f.email.invalid">
        <span *ngIf="f.email.errors?.['required']"> Email is required </span>
        <span *ngIf="f.email.errors?.['email']"> Enter a valid email </span>
      </small>
    </div>

    <!-- Phone -->
    <div class="form-group">
      <label for="phone">Phone</label>
      <input id="phone" type="text" formControlName="phone" />
      <small *ngIf="f.phone.touched && f.phone.invalid">
        Phone is required
      </small>
    </div>

    <!-- ================= ADDRESS SECTION ================= -->

    <app-address [group]="form.controls.address"> </app-address>

    <!-- ================= COMPANY SECTION ================= -->

    <app-company [group]="form.controls.company"> </app-company>

    <!-- ================= BUTTONS ================= -->

    <div class="buttons">
      <button type="submit" [disabled]="saving || form.invalid">
        {{ saving ? "Saving..." : "Save" }}
      </button>

      <button type="button" class="cancel" (click)="cancel()">Cancel</button>
    </div>

  </form>
</div>
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
templateUrl: './user-edit.component.html',
styleUrls: ['./user-edit.component.scss'],
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
) {}

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
=====================
Template Form

<div class="address-card">
  <h3 class="section-title">Address Details (Template-driven)</h3>

  <!-- Street -->
  <div class="form-group">
    <label>Street</label>
    <input
      type="text"
      name="address_address"
      [(ngModel)]="address.address"
      placeholder="Street address"
    />
  </div>

  <!-- City -->
  <div class="form-group">
    <label>City</label>
    <input
      type="text"
      name="address_city"
      [(ngModel)]="address.city"
      placeholder="City"
    />
  </div>

  <!-- State -->
  <div class="form-group">
    <label>State</label>
    <input
      type="text"
      name="address_state"
      [(ngModel)]="address.state"
      placeholder="State"
    />
  </div>

  <!-- Postal Code -->
  <div class="form-group">
    <label>Postal Code</label>
    <input
      type="text"
      name="address_postalCode"
      [(ngModel)]="address.postalCode"
      placeholder="Postal Code"
    />
  </div>

  <!-- Country -->
  <div class="form-group">
    <label>Country</label>
    <input
      type="text"
      name="address_country"
      [(ngModel)]="address.country"
      placeholder="Country"
    />
  </div>
</div>

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

<div class="company-card">
  <h3>Company Information (Template-driven)</h3>

  <!-- Company Name -->
  <div class="form-group">
    <label for="companyNameNormal">Company Name</label>
    <input
      id="companyNameNormal"
      type="text"
      name="company_name"
      [(ngModel)]="company.name"
      required
      #companyNameModel="ngModel"
    />
    <small *ngIf="companyNameModel.touched && companyNameModel.invalid">
      Company name is required
    </small>
  </div>

  <!-- Department -->
  <div class="form-group">
    <label for="departmentNormal">Department</label>
    <input
      id="departmentNormal"
      type="text"
      name="company_department"
      [(ngModel)]="company.department"
      required
      #departmentModel="ngModel"
    />
    <small *ngIf="departmentModel.touched && departmentModel.invalid">
      Department is required
    </small>
  </div>

  <!-- Title -->
  <div class="form-group">
    <label for="titleNormal">Job Title</label>
    <input
      id="titleNormal"
      type="text"
      name="company_title"
      [(ngModel)]="company.title"
      required
      #titleModel="ngModel"
    />
    <small *ngIf="titleModel.touched && titleModel.invalid">
      Job title is required
    </small>
  </div>
</div>

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

<div *ngIf="loading" class="loading">Loading...</div>

<div *ngIf="!loading && user" class="edit-card">
  <h2>Edit User (Template-driven)</h2>

  <form #userForm="ngForm" (ngSubmit)="save(userForm)">
    <!-- ================= BASIC INFO ================= -->

    <!-- First Name -->
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        name="firstName"
        [(ngModel)]="user.firstName"
        required
        #firstNameModel="ngModel"
      />
      <small *ngIf="firstNameModel.touched && firstNameModel.invalid">
        First name is required
      </small>
    </div>

    <!-- Last Name -->
    <div class="form-group">
      <label for="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
        name="lastName"
        [(ngModel)]="user.lastName"
        required
        #lastNameModel="ngModel"
      />
      <small *ngIf="lastNameModel.touched && lastNameModel.invalid">
        Last name is required
      </small>
    </div>

    <!-- Email -->
    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        [(ngModel)]="user.email"
        required
        email
        #emailModel="ngModel"
      />
      <small *ngIf="emailModel.touched && emailModel.invalid">
        <span *ngIf="emailModel.errors?.['required']">Email is required</span>
        <span *ngIf="emailModel.errors?.['email']">Enter a valid email</span>
      </small>
    </div>

    <!-- Phone -->
    <div class="form-group">
      <label for="phone">Phone</label>
      <input
        id="phone"
        type="text"
        name="phone"
        [(ngModel)]="user.phone"
        required
        #phoneModel="ngModel"
      />
      <small *ngIf="phoneModel.touched && phoneModel.invalid">
        Phone is required
      </small>
    </div>

    <!-- ================= ADDRESS SECTION ================= -->

    <app-address-normal [address]="user.address"></app-address-normal>

    <!-- ================= COMPANY SECTION ================= -->

    <app-company-normal [company]="user.company"></app-company-normal>

    <!-- ================= BUTTONS ================= -->

    <div class="buttons">
      <button type="submit" [disabled]="saving || userForm.invalid">
        {{ saving ? 'Saving...' : 'Save' }}
      </button>

      <button type="button" class="cancel" (click)="cancel()">Cancel</button>
    </div>

  </form>
</div>

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { AddressNormalComponent } from './address/address-normal.component';
import { CompanyNormalComponent } from './company/company-normal.component';

@Component({
selector: 'app-user-edit-normal',
standalone: true,
imports: [CommonModule, FormsModule, AddressNormalComponent, CompanyNormalComponent],
templateUrl: './user-edit-normal.component.html',
styleUrls: ['./user-edit-normal.component.scss'],
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
) {}

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
