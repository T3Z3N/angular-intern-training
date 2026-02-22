import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-concepts',
  standalone: true,
  imports: [NgFor],
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss'],
})
export class ConceptsComponent {
  concepts = [
    {
      title: '🧩 Components',
      description: 'UI building blocks controlling template & logic',

      why: 'Components control UI & handle user interaction',

      file: 'user-list.component.ts, user-detail.component.ts',

      lifecycle: 'ngOnInit used to fetch API data',

      example: `ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.users = res.users;
    });
  }`,
    },

    {
      title: '🔌 Services',
      description: 'Business logic & API communication',
      why: 'Reusable API logic & separation of concerns',

      file: 'user.service.ts',

      lifecycle: 'Called from component ngOnInit',

      example: `getUsers() {
    return this.http.get<UserResponse>(this.api);
  }`,
    },

    {
      title: '🧭 Routing',
      description: 'Navigation between views',

      why: 'Navigation between list & detail page',

      file: 'app.routes.ts',

      lifecycle: 'Router triggers component creation lifecycle',

      example: `{ path: 'user/:id', component: UserDetailComponent }`,
    },

    {
      title: '🔄 Pipes',
      description: 'Transform data inside templates',

      why: 'Transform UI data without modifying original value',

      file: 'salary.pipe.ts, address.pipe.ts',

      lifecycle: 'Runs during change detection',

      example: `{{ (user.id * 25000) | salary }}`,
    },

    {
      title: '🎯 Directives',
      description: 'Modify DOM behaviour and structure',
      why: 'Control DOM rendering & behavior',

      file: 'user-list.component.html',

      lifecycle: 'Angular structural rendering lifecycle',

      example: `<div *ngFor="let user of users"></div>`,
    },
  ];
}
