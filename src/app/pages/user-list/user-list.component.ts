import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable, map, catchError, of, startWith, switchMap, distinctUntilChanged, debounceTime, tap, BehaviorSubject, finalize } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  // users$: Observable<any[]>;
  // users: User[] = [];
  // loading$ = of(true);
  // error$ = of('');

  users$!: Observable<User[]>;
  // loading$!: Observable<boolean>;
  // error$!: Observable<string>;
  searchControl = new FormControl('');

  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string>('');

  constructor(
    private userService: UserService,
    private router: Router,
  ) {

    this.users$ = this.searchControl.valueChanges.pipe(

      startWith(''),                 // initial load
      debounceTime(400),             // wait user typing
      distinctUntilChanged(),        // avoid duplicate calls

      tap(() => {
        this.loading$.next(true);
        this.error$.next('');
      }),

      switchMap((searchTerm) =>
        this.userService.getUsers(searchTerm || '').pipe(
          map(res => res.users),

          catchError((error) => {
            this.error$.next('Failed to load users');
            return of([]);
          }),

          finalize(() => this.loading$.next(false))
        )
      )
    );
  }
  navigateToDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }
}
