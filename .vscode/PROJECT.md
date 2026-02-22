# User App – Project Structure & Code

Angular 19 standalone app: user list, user detail, and concepts pages with routing, HTTP, and pipes.

---

## Folder Structure

```
user-app/
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss
│   └── app/
│       ├── app.component.ts
│       ├── app.component.html
│       ├── app.component.scss
│       ├── app.component.spec.ts
│       ├── app.config.ts
│       ├── app.routes.ts
│       ├── interfaces/
│       │   └── user.interface.ts
│       ├── pages/
│       │   ├── concepts/
│       │   │   ├── concepts.component.ts
│       │   │   ├── concepts.component.html
│       │   │   ├── concepts.component.scss
│       │   │   └── concepts.component.spec.ts
│       │   ├── layout/
│       │   │   ├── layout.component.ts
│       │   │   ├── layout.component.html
│       │   │   ├── layout.component.scss
│       │   │   └── layout.component.spec.ts
│       │   ├── user-detail/
│       │   │   ├── user-detail.component.ts
│       │   │   ├── user-detail.component.html
│       │   │   ├── user-detail.component.scss
│       │   │   └── user-detail.component.spec.ts
│       │   └── user-list/
│       │       ├── user-list.component.ts
│       │       ├── user-list.component.html
│       │       ├── user-list.component.scss
│       │       └── user-list.component.spec.ts
│       ├── pipes/
│       │   ├── address.pipe.ts
│       │   ├── address.pipe.spec.ts
│       │   ├── salary.pipe.ts
│       │   └── salary.pipe.spec.ts
│       └── services/
│           ├── user.service.ts
│           └── user.service.spec.ts
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.spec.json
```

## Source Entry

### `src/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>UserApp</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

### `src/main.ts`

```ts
import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

### `src/styles.scss`

```scss
/* You can add global styles to this file, and also import other style files */
```

---

## App Core

### `src/app/app.component.ts`

```ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SalaryPipe } from "./pipes/salary.pipe";
import { AddressPipe } from "./pipes/address.pipe";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, AddressPipe, SalaryPipe],
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "user-app";
}
```

### `src/app/app.component.html`

```html
<router-outlet></router-outlet>
```

### `src/app/app.component.scss`

```scss
/* (empty) */
```

### `src/app/app.config.ts`

```ts
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient()],
};
```

### `src/app/app.routes.ts`

```ts
import { Routes } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { UserDetailComponent } from "./pages/user-detail/user-detail.component";
import { ConceptsComponent } from "./pages/concepts/concepts.component";

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", component: UserListComponent },
      { path: "user/:id", component: UserDetailComponent },
      { path: "concepts", component: ConceptsComponent },
    ],
  },

  { path: "**", redirectTo: "" },
];
```

---

## Interfaces

### `src/app/interfaces/user.interface.ts`

```ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  image: string;

  address: {
    address: string;
    city: string;
    state: string;
  };

  company: {
    name: string;
    title: string;
  };
}

export interface UserListResponse {
  users: User[];
  total: number;
}
```

---

## Pages

### Layout

#### `src/app/pages/layout/layout.component.ts`

```ts
import { Component } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.scss",
})
export class LayoutComponent {}
```

#### `src/app/pages/layout/layout.component.html`

```html
<div class="layout">
  <aside class="sidebar">
    <h3>User App</h3>

    <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="menu-item"> User List </a>
    <a routerLink="/concepts" routerLinkActive="active" class="menu-item"> Concepts </a>
  </aside>

  <main class="content">
    <router-outlet></router-outlet>
  </main>
</div>
```

#### `src/app/pages/layout/layout.component.scss`

```scss
.layout {
  display: flex;
  height: 100vh; // full viewport
  overflow: hidden; // prevent body scroll
}

/* Sidebar */
.sidebar {
  width: 240px;
  background: #0b1a33;
  color: white;
  padding: 20px;
  flex-shrink: 0;
}

/* Menu item */
.menu-item {
  display: block;
  padding: 12px 16px;
  border-radius: 8px;
  color: #cbd5e1;
  text-decoration: none;
  margin-top: 10px;
  transition: 0.2s;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

/* ⭐ ACTIVE highlight */
.menu-item.active {
  background: #2563eb;
  color: white;
  font-weight: 600;
}

/* Content area scroll */
.content {
  flex: 1;
  overflow-y: auto; // ⭐ THIS makes page scrollable
  padding: 30px;
  background: #f1f5f9;
}
```

#### `src/app/pages/layout/layout.component.spec.ts`

```ts
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LayoutComponent } from "./layout.component";

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
```

---

### User List

#### `src/app/pages/user-list/user-list.component.ts`

```ts
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { Observable, map, catchError, of, startWith } from "rxjs";
import { UserService } from "../../services/user.service";
import { User } from "../../interfaces/user.interface";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss",
})
export class UserListComponent {
  // users$: Observable<any[]>;
  users: User[] = [];
  loading$ = of(true);
  error$ = of("");
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.users;
    });
    // this.users$ = this.userService.getUsers().pipe(
    //   map((res) => res.users),
    //   catchError(() => {
    //     this.error$ = of('Failed to load users');
    //     return of([]);
    //   }),
    //   startWith([]),
    // );
  }
  navigateToDetails(id: number): void {
    this.router.navigate(["/user", id]);
  }
}
```

#### `src/app/pages/user-list/user-list.component.html`

```html
<h2 class="title">User List</h2>
<div *ngIf="users.length else loading" class="user-container">
  <!-- <div
    class="user-card"
    *ngFor="let user of users$ | async"
    (click)="navigateToDetails(user.id)"
  > -->

  <div class="user-card" *ngFor="let user of users" (click)="navigateToDetails(user.id)">
    <img [src]="user.image || 'https://i.pravatar.cc/150'" class="avatar" />
    <div class="info">
      <h3>{{ user.firstName }} {{ user.lastName }}</h3>
      <p>{{ user.email }}</p>
      <p>{{ user.phone }}</p>
    </div>
  </div>
</div>
<ng-template #loading> {{'Loading Users'}} </ng-template>
```

#### `src/app/pages/user-list/user-list.component.scss`

```scss
.title {
  text-align: center;
  margin-bottom: 20px;
}

.user-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  padding: 20px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: 0.25s ease;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.15);
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.info h3 {
  margin: 0;
  font-size: 16px;
}

.info p {
  margin: 2px 0;
  font-size: 13px;
  color: #666;
}
```

#### `src/app/pages/user-list/user-list.component.spec.ts`

```ts
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserListComponent } from "./user-list.component";

describe("UserListComponent", () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
```

---

### User Detail

#### `src/app/pages/user-detail/user-detail.component.ts`

```ts
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../interfaces/user.interface";
import { AddressPipe } from "../../pipes/address.pipe";
import { SalaryPipe } from "../../pipes/salary.pipe";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-user-detail",
  standalone: true,
  imports: [CommonModule, AddressPipe, SalaryPipe],
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"],
})
export class UserDetailComponent implements OnInit {
  user?: User;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.userService.getUserById(id).subscribe((res) => {
      this.user = res;
      this.loading = false;
    });
  }

  goBack() {
    this.router.navigate(["/users"]);
  }
}
```

#### `src/app/pages/user-detail/user-detail.component.html`

```html
<div *ngIf="loading" class="loading">Loading user...</div>

<div *ngIf="user" class="profile-card">
  <!-- TOP BAR -->
  <div class="top-bar">
    <button class="back-btn" (click)="goBack()">← Back</button>
  </div>

  <img [src]="user.image" class="profile-img" />

  <h2>{{ user.firstName }} {{ user.lastName }}</h2>

  <p class="role">Occupation: {{ user.company?.title }}</p>
  <p class="role">Company: {{ user.company?.name }}</p>

  <div class="details">
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Phone:</strong> {{ user.phone }}</p>
    <p><strong>Address:</strong> {{ user.address | address }}</p>
    <p><strong>Salary:</strong> {{ user.id * 25000 | salary }}</p>
  </div>
</div>
```

#### `src/app/pages/user-detail/user-detail.component.scss`

```scss
.loading {
  text-align: center;
  margin-top: 40px;
}

.profile-card {
  max-width: 420px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 16px;
  background: white;
  text-align: center;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.profile-img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin-bottom: 15px;
  object-fit: cover;
}

.role {
  color: #777;
  margin-bottom: 20px;
}

.details {
  text-align: left;
  margin-top: 15px;
}

.details p {
  margin: 8px 0;
}
.top-bar {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.back-btn {
  border: none;
  background: #eee;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
```

#### `src/app/pages/user-detail/user-detail.component.spec.ts`

```ts
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserDetailComponent } from "./user-detail.component";

describe("UserDetailComponent", () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
```

---

### Concepts

#### `src/app/pages/concepts/concepts.component.ts`

```ts
import { NgFor } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-concepts",
  standalone: true,
  imports: [NgFor],
  templateUrl: "./concepts.component.html",
  styleUrls: ["./concepts.component.scss"],
})
export class ConceptsComponent {
  concepts = [
    {
      title: "🧩 Components",
      description: "UI building blocks controlling template & logic",

      why: "Components control UI & handle user interaction",

      file: "user-list.component.ts, user-detail.component.ts",

      lifecycle: "ngOnInit used to fetch API data",

      example: `ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.users = res.users;
    });
  }`,
    },

    {
      title: "🔌 Services",
      description: "Business logic & API communication",
      why: "Reusable API logic & separation of concerns",

      file: "user.service.ts",

      lifecycle: "Called from component ngOnInit",

      example: `getUsers() {
    return this.http.get<UserResponse>(this.api);
  }`,
    },

    {
      title: "🧭 Routing",
      description: "Navigation between views",

      why: "Navigation between list & detail page",

      file: "app.routes.ts",

      lifecycle: "Router triggers component creation lifecycle",

      example: `{ path: 'user/:id', component: UserDetailComponent }`,
    },

    {
      title: "🔄 Pipes",
      description: "Transform data inside templates",

      why: "Transform UI data without modifying original value",

      file: "salary.pipe.ts, address.pipe.ts",

      lifecycle: "Runs during change detection",

      example: `{{ (user.id * 25000) | salary }}`,
    },

    {
      title: "🎯 Directives",
      description: "Modify DOM behaviour and structure",
      why: "Control DOM rendering & behavior",

      file: "user-list.component.html",

      lifecycle: "Angular structural rendering lifecycle",

      example: `<div *ngFor="let user of users"></div>`,
    },
  ];
}
```

#### `src/app/pages/concepts/concepts.component.html`

```html
<div class="concepts">
  <div class="concepts__card" *ngFor="let c of concepts">
    <h2 class="concepts__card-title">{{ c.title }}</h2>
    <p class="concepts__card-desc">{{ c.description }}</p>
    <p class="concepts__card-why"><strong>Why:</strong> {{ c.why }}</p>
    <p class="concepts__card-meta"><strong>Where used:</strong> {{ c.file }}</p>
    <p class="concepts__card-meta"><strong>Lifecycle:</strong> {{ c.lifecycle }}</p>

    <pre class="concepts__card-code">{{ c.example }}</pre>
  </div>
</div>
```

#### `src/app/pages/concepts/concepts.component.scss`

```scss
:host {
  display: block;
  overflow-y: auto;
  min-height: 100%;
}

.concepts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;

  &__card {
    background: #fff;
    padding: 20px;
    border-radius: 14px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);
    }
  }

  &__card-title {
    margin: 0 0 6px;
    font-size: 18px;
    font-weight: 600;
  }

  &__card-desc {
    font-size: 14px;
    color: #444;
    margin-bottom: 6px;
  }

  &__card-why {
    font-size: 13px;
    color: #555;
    margin: 6px 0;
  }

  &__card-meta {
    font-size: 12px;
    color: #777;
    margin-top: 4px;
  }

  &__card-code {
    background: #0f172a;
    color: #22c55e;
    padding: 10px;
    border-radius: 8px;
    margin-top: 10px;
    font-size: 12px;
    overflow-x: auto;
    line-height: 1.5;
  }
}
```

#### `src/app/pages/concepts/concepts.component.spec.ts`

```ts
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConceptsComponent } from "./concepts.component";

describe("ConceptsComponent", () => {
  let component: ConceptsComponent;
  let fixture: ComponentFixture<ConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
```

---

## Pipes

### `src/app/pipes/address.pipe.ts`

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "address",
  standalone: true,
})
export class AddressPipe implements PipeTransform {
  transform(address: any): string {
    if (!address) return "";
    return `${address.address}, ${address.city}, ${address.state}`;
  }
}
```

### `src/app/pipes/address.pipe.spec.ts`

```ts
import { AddressPipe } from "./address.pipe";

describe("AddressPipe", () => {
  it("create an instance", () => {
    const pipe = new AddressPipe();
    expect(pipe).toBeTruthy();
  });
});
```

### `src/app/pipes/salary.pipe.ts`

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "salary",
  standalone: true,
})
export class SalaryPipe implements PipeTransform {
  transform(value: number): string {
    return "₹ " + value.toLocaleString("en-IN");
  }
}
```

### `src/app/pipes/salary.pipe.spec.ts`

```ts
import { SalaryPipe } from "./salary.pipe";

describe("SalaryPipe", () => {
  it("create an instance", () => {
    const pipe = new SalaryPipe();
    expect(pipe).toBeTruthy();
  });
});
```

---

## Services

### `src/app/services/user.service.ts`

```ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UserListResponse } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = "https://dummyjson.com/users";

  constructor(private http: HttpClient) {}

  /** Get all users */
  getUsers(limit = 10, skip = 0): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.baseUrl}?limit=${limit}&skip=${skip}`);
  }

  /** Get user by id */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
```

### `src/app/services/user.service.spec.ts`

```ts
import { TestBed } from "@angular/core/testing";

import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
```

---
