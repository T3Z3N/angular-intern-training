import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { AddressPipe } from '../../pipes/address.pipe';
import { SalaryPipe } from '../../pipes/salary.pipe';
import { UserService } from '../../services/user.service';
import { Observable, catchError, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, AddressPipe, SalaryPipe],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  // user?: User;
  // loading = true;

  user$!: Observable<User | null>;
  loading$!: Observable<boolean>;
  user?: User;
  loading = true;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));

    // this.userService.getUserById(id).subscribe((res) => {
    //   this.user = res;
    //   this.loading = false;
    // });

    this.user$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.userService.getUserById(id)),
      catchError(() => of(null))
    );

    this.loading$ = this.user$.pipe(
      map(() => false),
      startWith(true)
    );

    // this.user$ = this.route.paramMap.pipe(
    //   map(params => Number(params.get('id'))),
    //   switchMap(id => 
    //     this.userService.getUserById(id).pipe(
    //       startWith(null)
    //     )
    //   )
    // );
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserById(this.userId).subscribe((res) => {
      this.user = res;
      this.loading = false;
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  editUser(id: number): void {
    // this.router.navigate(['/users', id, 'edit-template-form']);
    this.router.navigate(['/users', id, 'edit-reactive-form']);
  }
}
