import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable, map, catchError, of, startWith, switchMap, distinctUntilChanged, debounceTime, tap, BehaviorSubject } from 'rxjs';
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
  loading$!: Observable<boolean>;
  error$!: Observable<string>;
  searchControl = new FormControl('');

  private loadMore$ = new BehaviorSubject<void>(undefined);
  private limit = 10;


  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    // this.userService.getUsers().subscribe(users => {
    //   this.users = users.users;
    // })


    // const response$ = this.userService.getUsers().pipe(
    //   map(res => res.users),
    //   catchError(() => {
    //     this.error$ = of('Failed to load users');
    //     return of([]);
    //   })
    // );

    const response$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        this.loading$ = of(true);
        return this.userService.getUsers(searchTerm || '');
      }),
      map(res => res.users),
      tap(() => this.loading$ = of(false)),
      catchError(() => {
        this.loading$ = of(false);
        this.error$ = of('Failed to load users');
        return of([]);
      }),
    );

    this.users$ = response$;

    // this.loading$ = response$.pipe(
    //   map(() => false),
    //   startWith(true)
    // );
  }

  navigateToDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }
}
