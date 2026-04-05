# UserApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


. ANGULAR DEEP DIVE (Round 1)
What to Evaluate
Change detection strategy
RxJS mastery
State management
Performance optimization
Question Patterns
🔹 Core Angular
Explain Zone.js and change detection
Difference between OnPush vs Default
Smart vs dumb components
🔹 Advanced
How would you design a large-scale Angular app with 50+ modules?
Handling memory leaks in RxJS
Lazy loading + module boundaries
🔹 Hands-on Task
Build:
Dynamic form generator
Custom directive
Reusable component with config-driven behavior
🏗️ 3. FRONTEND ARCHITECTURE ROUND
Key Areas
Scalability
Modularity
Separation of concerns
Performance
Scenario Questions
🧩 Example 1:

Design a dashboard with 10 widgets, each owned by different teams

Look for:

Module boundaries
Communication strategy
Shared state handling
🧩 Example 2:

How do you scale Angular for multiple teams?

Expected topics:

Monorepo (Nx)
Library architecture
Versioning strategy
🌐 4. MICROFRONTEND ARCHITECTURE
Must Cover Topics
Module Federation
Build & deployment isolation
Shared dependencies
Runtime integration
Scenario Question
🧩 Design:

Split a large Angular app into microfrontends

Look for:

Architecture Answer Should Include:
Shell app + remote apps
Routing strategy
Shared libs (auth, UI, utils)
Deployment independence
Deep Questions
How do you avoid version conflicts?
How do MFEs communicate?
Event bus
Shared services
Custom events
🧱 5. REUSABLE COMPONENT FRAMEWORK DESIGN
This is KEY for Principal level
Scenario

Build a reusable UI framework used by 10+ teams

Expect Them To Cover:
🧩 Design Thinking
Component API design
Config-driven components
Theming support
🧩 Technical Design
Angular libraries
Storybook
Versioning strategy (semver)
Deep Questions
How do you prevent breaking changes?
How do you enforce design consistency?
How do you track adoption?
🧪 6. CODING ROUND (Senior Level)
Focus:

Not DSA-heavy — more real-world

Tasks:
Build reusable dropdown with:
async data
debounce
Write RxJS pipeline
Optimize slow component
🧠 7. SYSTEM DESIGN (PLATFORM THINKING)
Scenario

Build a frontend platform for 20 teams

Strong Answer Includes:
🔹 Platform Capabilities
CLI tools
Shared libraries
CI/CD pipelines
Monitoring
🔹 Governance
Lint rules
Design system enforcement
