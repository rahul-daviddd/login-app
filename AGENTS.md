# System Role & Personality
- **Role**: Pair programmer and autonomous coder.
- **Personality**: Highly technical, concise, precise, architecture-aware, and execution-focused.
- **Scope**: Codebase analysis, bug fixing, feature implementation, and verification across Angular frontend and Node.js backend.

# Tech Stack & Versions
- **Frontend Framework**: Angular v22.0.0 (Standalone Components)
- **Frontend Dev Dependencies**:
  - `@angular/build`: `^22.0.0`
  - `@angular/cli`: `^22.0.0`
  - `@angular/compiler-cli`: `^22.0.0`
  - `jsdom`: `^28.0.0`
  - `prettier`: `^3.8.1`
  - `typescript`: `~6.0.2`
  - `vitest`: `^4.0.8` (Testing framework)
- **Frontend Dependencies**:
  - `@angular/common`: `^22.0.0`
  - `@angular/compiler`: `^22.0.0`
  - `@angular/core`: `^22.0.0`
  - `@angular/forms`: `^22.0.0`
  - `@angular/platform-browser`: `^22.0.0`
  - `@angular/router`: `^22.0.0`
  - `rxjs`: `~7.8.0`
  - `tslib`: `^2.3.0`
- **Backend Runtime**: Node.js (v18+)
- **Backend Framework**: Express v5.2.1
- **Backend Dependencies**:
  - `bcrypt`: `^6.0.0`
  - `cors`: `^2.8.6`
  - `dotenv`: `^17.4.2`
  - `pg`: `^8.21.0` (Postgres driver)
- **Database**: PostgreSQL (schema user table columns: `id`, `username`, `email`, `password`, `first_name`, `last_name`, `dob`, `gender`, `country_code`, `phone_number`)
- **Package Manager**: npm (configured `packageManager`: `npm@11.13.0` in root)
- **Build Tools**: `@angular/build:application` (esbuild + Vite internally for dev server)

# Architecture Overview
- **Architecture**: Separated Full-Stack (Frontend and Backend).
- **Frontend**:
  - Single-Page Application (SPA) built using Angular Standalone Architecture.
  - Routing managed via `src/app/app.routes.ts`.
  - HTTP requests executed directly inside components via `HttpClient` (no service layer abstraction).
  - Manual Change Detection: Explicit calls to `ChangeDetectorRef.detectChanges()` inside async subscription blocks to synchronize view lifecycle with asynchronous events.
  - Base API URL is hardcoded (`http://localhost:3000`).
- **Backend**:
  - RESTful API server defined in a single file `backend/server.js`.
  - Postgres database integration using `pg` Connection Pool.
  - Cross-Origin Resource Sharing (CORS) enabled to communicate with frontend.
- **Data Flow**: Frontend UI (Form fields) -> Http Client -> Express API Router -> PostgreSQL Client.

# Directory Structure
- **Root Directory (`/`)**:
  - Purpose: Contains workspace-level configurations and serves as the frontend project root.
  - Configurations: `angular.json`, `tsconfig.json`, `package.json`, `.gitignore`, `.prettierrc`, `.editorconfig`.
- **`backend/`**:
  - Purpose: Houses the Node.js/Express API application.
  - Entry point: [server.js](file:///c:/Users/rahul/dev/login-app/backend/server.js).
  - Key Modules: `express`, `pg`, `bcrypt`, `dotenv`.
  - Generated files: `/backend/node_modules`.
  - Conventions: Reads database connection configuration from environment variables via `.env`. Exposes REST API endpoints.
- **`public/`**:
  - Purpose: Contains static, uncompiled assets copied directly to build output.
  - Key files: `favicon.ico`.
- **`src/`**:
  - Purpose: Source directory for the Angular application.
  - Entry point: [main.ts](file:///c:/Users/rahul/dev/login-app/src/main.ts) (bootstraps the app config and `App` class component).
  - Key files: [styles.css](file:///c:/Users/rahul/dev/login-app/src/styles.css) (global styles).
- **`src/app/`**:
  - Purpose: Core application module containing configuration, routing, and sub-components.
  - Key files: [app.ts](file:///c:/Users/rahul/dev/login-app/src/app/app.ts), [app.config.ts](file:///c:/Users/rahul/dev/login-app/src/app/app.config.ts), [app.routes.ts](file:///c:/Users/rahul/dev/login-app/src/app/app.routes.ts), [app.spec.ts](file:///c:/Users/rahul/dev/login-app/src/app/app.spec.ts).
- **`src/app/login/`**:
  - Purpose: Manages user login form UI, credentials validation, and authentication.
  - Key files: [login.ts](file:///c:/Users/rahul/dev/login-app/src/app/login/login.ts), [login.html](file:///c:/Users/rahul/dev/login-app/src/app/login/login.html), [login.css](file:///c:/Users/rahul/dev/login-app/src/app/login/login.css), [login.spec.ts](file:///c:/Users/rahul/dev/login-app/src/app/login/login.spec.ts).
- **`src/app/register/`**:
  - Purpose: Handles new user registration interface and hashing-related user creations.
  - Key files: [register.ts](file:///c:/Users/rahul/dev/login-app/src/app/register/register.ts), [register.html](file:///c:/Users/rahul/dev/login-app/src/app/register/register.html), [register.css](file:///c:/Users/rahul/dev/login-app/src/app/register/register.css), [register.spec.ts](file:///c:/Users/rahul/dev/login-app/src/app/register/register.spec.ts).
- **`src/app/home/`**:
  - Purpose: Displays user landing dashboard post-authentication and provides signout.
  - Key files: [home.ts](file:///c:/Users/rahul/dev/login-app/src/app/home/home.ts), [home.html](file:///c:/Users/rahul/dev/login-app/src/app/home/home.html), [home.css](file:///c:/Users/rahul/dev/login-app/src/app/home/home.css), [home.spec.ts](file:///c:/Users/rahul/dev/login-app/src/app/home/home.spec.ts).
- **`src/app/user-details/`**:
  - Purpose: Coordinates retrieval, calculation of age, validation, and update of supplementary user information.
  - Key files: [user-details.ts](file:///c:/Users/rahul/dev/login-app/src/app/user-details/user-details.ts), [user-details.html](file:///c:/Users/rahul/dev/login-app/src/app/user-details/user-details.html), [user-details.css](file:///c:/Users/rahul/dev/login-app/src/app/user-details/user-details.css), [user-details.spec.ts](file:///c:/Users/rahul/dev/login-app/src/app/user-details/user-details.spec.ts).
- **`.angular/`**:
  - Purpose: Automatically generated Angular build cache.
- **`node_modules/`**:
  - Purpose: Vendor dependencies loaded via package manager.

# Development Commands
- **Setup/Install**:
  - Frontend: `npm install` (run in project root)
  - Backend: `npm install` (run in `backend/`)
- **Run (Development)**:
  - Frontend: `npm start` or `ng serve` (runs on `http://localhost:4200`)
  - Backend: `node server.js` (runs on `http://localhost:3000`)
- **Build (Production)**:
  - Frontend: `npm run build` or `ng build` (output located in `/dist/login-app`)
  - Backend: Not Found (runs directly via Node.js, no build tool compiled)
- **Testing**:
  - Frontend: `npm test` or `ng test` (executes Vitest runner)
  - Backend: Not Found (no backend testing configured)
- **Lint commands**: Not Found
- **Deployment/release commands**: Not Found
- **Environment requirements**: Backend requires a local PostgreSQL instance running and `backend/.env` configured with correct database credentials.

# Coding Standards
- **Style Rules**: Set via `.prettierrc` (2 spaces indent, single quotes, printWidth 100) and `.editorconfig`.
- **Naming Conventions**:
  - Components do not follow the standard Angular `.component.ts` suffix. Files are structured as `<name>.ts`, `<name>.html`, `<name>.css`.
  - Component classes do not use the `Component` suffix (e.g. `export class Login`, `export class UserDetails`).
- **Imports**: Inline imports directly into the `@Component` decorators using `standalone: true` or configuration settings (e.g., `imports: [FormsModule, RouterLink]`).
- **HTTP client**: Perform `HttpClient` injections and queries directly inside component controller logic.
- **Change Detection**: Manually call `this.cdr.detectChanges()` inside asynchronous subscriptions block (e.g. Http Response handlers).
- **API URL mapping**: Configured inside each component file as a private string variable: `private apiUrl = 'http://localhost:3000'`.

# Security Requirements
- **Sensitive Credentials**: Stored securely in `backend/.env` (excluded by Git via `.gitignore`).
- **Hashing**: Use `bcrypt` on the backend for hashing incoming passwords upon registration and verification on login.
- **Input Validation**:
  - Frontend & Backend email validation using regular expressions.
  - Passwords validated to be at least 6 characters in length on both frontend and backend.
  - Numerical constraints on phone and country code verified on frontend.
  - SQL Queries are parameterized (`$1`, `$2`, etc.) in `pg` to prevent SQL Injection.

# Testing Strategy
- **Framework**: Vitest unit test runner (`vitest` v4.0.8).
- **Environment**: jsdom (configured for Angular testing context).
- **Configuration**: Uses `tsconfig.spec.json` referencing `vitest/globals` to skip standard angular jasmine global definitions.
- **Commands**: `npm test` executes tests using the `@angular/build:unit-test` executor mapped to the Vitest testing script.

# Workflow For Future Agents
1. When generating new components, place files in a directory of the same name (e.g., `my-feature/my-feature.ts`). Do NOT name them `.component.ts`. Class name should be simple (e.g., `MyFeature`).
2. Add components to the routing configurations inside [app.routes.ts](file:///c:/Users/rahul/dev/login-app/src/app/app.routes.ts).
3. Always import `FormsModule`, `RouterLink`, etc. directly inside component `imports` decorators.
4. Call manual change detection (`this.cdr.detectChanges()`) inside subscribe callbacks.
5. Keep API base URLs consistent across controllers.
6. Run `npm test` to ensure changes do not break unit tests.

# Common Pitfalls
- **Port Conflicts**: Backend hardcoded to run on port `3000`. Ensure port `3000` is free.
- **Change Detection Failures**: Failing to call `cdr.detectChanges()` inside asynchronous/subscription scopes can result in the UI not updating toast messages or navigation delays.
- **Missing CLI Globals**: Standard Jasmine imports will throw compiler errors under the Vitest setup unless files conform to Vitest matchers.
- **Missing Dependency Sync**: Ensure `npm install` is executed in the root directory and the `/backend` directory after cloning or dependency updates.
- **Database Schema Mismatch**: Any modifications to fields updated on user details must match the PostgreSQL database columns.

# Files Requiring Extra Caution
- [server.js](file:///c:/Users/rahul/dev/login-app/backend/server.js): API endpoints definitions, password checking, database query executions.
- `backend/.env`: Private database access credentials.
- [angular.json](file:///c:/Users/rahul/dev/login-app/angular.json) & [tsconfig.spec.json](file:///c:/Users/rahul/dev/login-app/tsconfig.spec.json): Angular build schema and Vitest compiler runner mapping.
