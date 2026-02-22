import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  private limit = 8;
  private skip = 0;

  private loadMore$ = new BehaviorSubject<void>(undefined);

  users: any[] = [];
  loading = false;
  error = '';
  hasMore = true;

  users$ = this.loadMore$.pipe(
    tap(() => (this.loading = true)),
    switchMap(() =>
      this.userService.getUsers(this.limit, this.skip).pipe(
        tap(res => {
          this.users = [...this.users, ...res.users];

          this.skip += this.limit;
          this.hasMore = this.skip < res.total;
          this.loading = false;
        }),
        map(() => this.users),
        catchError(() => {
          this.error = 'Failed to load users';
          this.loading = false;
          return of(this.users);
        })
      )
    )
  );

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  loadMore() {
    if (!this.loading && this.hasMore) {
      this.loadMore$.next();
    }
  }

  openUser(id: number): void {
    this.router.navigate(['/user', id]);
  }
}


<h2 class="title">User List</h2>

<div class="user-container">

  <div
    class="user-card"
    *ngFor="let user of (users$ | async)"
    (click)="openUser(user.id)"
  >
    <img [src]="user.image || 'https://i.pravatar.cc/150'" class="avatar" />

    <div class="info">
      <h3>{{ user.firstName }} {{ user.lastName }}</h3>
      <p>{{ user.email }}</p>
      <p>{{ user.phone }}</p>
    </div>

  </div>

</div>

<div class="actions">

  <button *ngIf="hasMore && !loading" (click)="loadMore()" class="load-more">
    Load More
  </button>

  <p *ngIf="loading">Loading...</p>

  <p class="error" *ngIf="error">{{ error }}</p>

</div>


Task 1

Reset pagination on search

Task 2

Disable Load More when searching

Task 3

Add skeleton loader instead of text