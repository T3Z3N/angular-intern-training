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
      { path: 'concepts', component: ConceptsComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];
