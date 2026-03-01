import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { ConceptsComponent } from './pages/concepts/concepts.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: 'user/:id', component: UserDetailComponent },
      {
        path: 'users/:id/edit-reactive-form',
        loadComponent: () =>
          import('./pages/user-edit-reactive/user-edit-reactive.component').then(
            (m) => m.UserEditComponent,
          ),
      },
      {
        path: 'users/:id/edit-template-form',
        loadComponent: () =>
          import('./pages/user-edit-template/user-edit-template.component').then(
            (m) => m.UserEditNormalComponent,
          ),
      },
      { path: 'concepts', component: ConceptsComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];
