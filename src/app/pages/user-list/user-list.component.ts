import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable, map, catchError, of, startWith } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl:'./user-list.component.scss'
})
export class UserListComponent {

  users$: Observable<any[]>;
  loading$ = of(true);
  error$ = of('');

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.users$ = this.userService.getUsers().pipe(
      map(res => res.users),
      catchError(() => {
        this.error$ = of('Failed to load users');
        return of([]);
      }),
      startWith([])
    );
  }

  openUser(id: number): void {
    this.router.navigate(['/user', id]);
  }
}