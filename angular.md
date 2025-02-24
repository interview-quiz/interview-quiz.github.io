# Advance Angular

## 1 Introduction
- [NGRX](https://github.com/tauhidul0821/angular-with-ngrx)

# Angular Application with Advanced Features

This project demonstrates how to implement the following features in an Angular application:

- Custom Directive
- Custom Validation (Signup Page)
- Custom Pipe
- Role-Based Guard
- HTTP Interceptor

## 1. Custom Directive

Create a directive to highlight text when hovering.

### File: `highlight.directive.ts`
```typescript
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'blue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'color');
  }
}
```

### Usage in HTML:
```html
<p appHighlight>Hover to highlight this text!</p>
```

---

## 2. Custom Validation (Signup Page)

Implement custom validation for password strength.

### File: `signup.component.ts`
```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator]],
    });
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const isValid = hasUppercase && hasLowercase && hasNumber;
    return !isValid ? { weakPassword: true } : null;
  }
}
```

### File: `signup.component.html`
```html
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
  <label>Username:</label>
  <input formControlName="username" />
  <div *ngIf="signupForm.get('username')?.invalid && signupForm.get('username')?.touched">
    Username is required
  </div>

  <label>Email:</label>
  <input formControlName="email" />
  <div *ngIf="signupForm.get('email')?.invalid && signupForm.get('email')?.touched">
    Enter a valid email
  </div>

  <label>Password:</label>
  <input type="password" formControlName="password" />
  <div *ngIf="signupForm.get('password')?.hasError('weakPassword')">
    Password must contain uppercase, lowercase, and a number
  </div>

  <button [disabled]="signupForm.invalid">Submit</button>
</form>
```

---

## 3. Custom Pipe

Format a number as currency.

### File: `currency-format.pipe.ts`
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
}
```

### Usage in HTML:
```html
<p>{{ 1234 | currencyFormat }}</p>
```

---

## 4. Role-Based Guard

Protect routes based on user roles.

### File: `role.guard.ts`
```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('role');
    if (userRole === 'admin') {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
```

### File: `app-routing.module.ts`
```typescript
const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
];
```

---

## 5. HTTP Interceptor

Attach a token to every HTTP request.

### File: `auth.interceptor.ts`
```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(clonedRequest);
  }
}
```

### File: `app.module.ts`
```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AppModule {}
```




# Dynamic Components in Angular

This guide demonstrates how to set dynamic components in Angular, allowing components to be loaded at runtime.

---

## Step 1: Create the Components
Create the components you want to load dynamically.

**Example:**  
```typescript
// Component 1: HelloComponent
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `<h2>Hello Component</h2>`,
})
export class HelloComponent {}

// Component 2: GoodbyeComponent
import { Component } from '@angular/core';

@Component({
  selector: 'app-goodbye',
  template: `<h2>Goodbye Component</h2>`,
})
export class GoodbyeComponent {}
```

---

## Step 2: Create a Directive for ViewContainerRef
Create a directive to act as a placeholder where the dynamic component will be rendered.

**Example:**  
```typescript
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicHost]',
})
export class DynamicHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
```

---

## Step 3: Create a Dynamic Loader Component
This component will load the dynamic components.

**Example:**  
```typescript
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { DynamicHostDirective } from './dynamic-host.directive';
import { HelloComponent } from './hello.component';
import { GoodbyeComponent } from './goodbye.component';

@Component({
  selector: 'app-dynamic-loader',
  template: `<ng-template appDynamicHost></ng-template>`,
})
export class DynamicLoaderComponent implements OnInit {
  @Input() componentType: string = '';

  @ViewChild(DynamicHostDirective, { static: true })
  dynamicHost!: DynamicHostDirective;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear();

    let componentFactory;

    // Map component types dynamically
    if (this.componentType === 'hello') {
      componentFactory = this.resolver.resolveComponentFactory(HelloComponent);
    } else if (this.componentType === 'goodbye') {
      componentFactory = this.resolver.resolveComponentFactory(GoodbyeComponent);
    }

    if (componentFactory) {
      viewContainerRef.createComponent(componentFactory);
    }
  }
}
```

---

## Step 4: Declare Everything in AppModule
Register all the components, directives, and dependencies in your module.

**Example:**  
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { GoodbyeComponent } from './goodbye.component';
import { DynamicLoaderComponent } from './dynamic-loader.component';
import { DynamicHostDirective } from './dynamic-host.directive';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    GoodbyeComponent,
    DynamicLoaderComponent,
    DynamicHostDirective,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

---

## Step 5: Use the Dynamic Loader
Pass the dynamic component type to the loader.

**Example (in `app.component.html`):**
```html
<app-dynamic-loader [componentType]="'hello'"></app-dynamic-loader>
<app-dynamic-loader [componentType]="'goodbye'"></app-dynamic-loader>
```

---

## Output:
- "Hello Component" will render dynamically where the first loader is placed.
- "Goodbye Component" will render dynamically in the second loader.

---

# How to create dynamic components ?
# Dynamic Components in Angular

This guide demonstrates how to create and load dynamic components in Angular. Dynamic components are useful for scenarios like modals, tooltips, or dashboards where components need to be instantiated programmatically at runtime.

---

## Step 1: Set Up Your Components

Prepare the components you want to load dynamically. For example:

```typescript
// src/app/components/dynamic-child.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-child',
  template: `<p>Dynamic Child Component Loaded!</p>`,
})
export class DynamicChildComponent {}
```

---

## Step 2: Create a Placeholder for Dynamic Components

Use a `ViewContainerRef` to define a placeholder for dynamic components.

```html
<!-- src/app/app.component.html -->
<div>
  <h2>Dynamic Component Example</h2>
  <ng-container #dynamicContainer></ng-container>
</div>
```

---

## Step 3: Load the Dynamic Component

In the parent component, use `ViewChild` and `ComponentFactoryResolver` to load the component.

```typescript
// src/app/app.component.ts
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DynamicChildComponent } from './components/dynamic-child.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  loadComponent() {
    // Clear previous dynamic components if needed
    this.container.clear();

    // Create the component factory
    const factory = this.resolver.resolveComponentFactory(DynamicChildComponent);

    // Add the component to the container
    this.container.createComponent(factory);
  }
}
```

---

## Step 4: Add a Button to Trigger the Dynamic Component

Add a button to load the component dynamically.

```html
<!-- src/app/app.component.html -->
<button (click)="loadComponent()">Load Dynamic Component</button>
```

---

## Step 5: Register the Component in `NgModule`

Ensure the dynamic component is added to the `entryComponents` array (if you're using Angular 8 or below).

```typescript
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DynamicChildComponent } from './components/dynamic-child.component';

@NgModule({
  declarations: [AppComponent, DynamicChildComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
  entryComponents: [DynamicChildComponent], // Not needed in Angular 9+
})
export class AppModule {}
```

---

## Step 6: Run the Application

When you click the "Load Dynamic Component" button, the `DynamicChildComponent` will be instantiated and displayed.

---

## Notes:

- **Angular 9+ (Ivy)**: You no longer need to specify `entryComponents`. Angular automatically handles this for you.
- **Use Cases**: Dynamic components are ideal for scenarios like modals, tooltips, or dynamically loaded dashboards.
- **Best Practices**: Consider using Angular's **Component Portal** from the CDK for more complex scenarios, as it offers additional flexibility.

---

# Advanced Angular Routing Guide

## 1. Dynamic and Nested Routes

### **Dynamic Routes**
Dynamic routes allow passing parameters to the URL (e.g., `/product/123`).

```typescript
const routes: Routes = [
  { path: 'product/:id', component: ProductComponent },
];

@Component({
  template: `
    <h2>Product Details</h2>
    <p>Product ID: {{ productId }}</p>
  `
})
export class ProductComponent implements OnInit {
  productId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
  }
}
```

### **Nested Routes**
Nested routes allow rendering child components inside a parent using a `router-outlet`.

```typescript
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
];
```

Parent `dashboard.component.html`:
```html
<h1>Dashboard</h1>
<nav>
  <a routerLink="profile">Profile</a>
  <a routerLink="settings">Settings</a>
</nav>
<router-outlet></router-outlet>
```

---

## 2. Route Guards

### **CanActivate (Prevent Unauthenticated Access)**

```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated;
  }
}

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
];
```

### **CanDeactivate (Prevent Unsaved Changes from Being Lost)**

```typescript
@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: any): boolean {
    return confirm('Do you want to discard unsaved changes?');
  }
}

const routes: Routes = [
  { path: 'edit', component: EditComponent, canDeactivate: [UnsavedChangesGuard] },
];
```

### **Resolve (Pre-Fetch Data)**

```typescript
@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<any> {
  resolve(): Observable<any> {
    return of({ name: 'Angular', version: 16 }).pipe(delay(1000));
  }
}

const routes: Routes = [
  { path: 'info', component: InfoComponent, resolve: { data: DataResolver } },
];
```

---

## 3. Lazy Loading

Lazy loading improves performance by loading modules only when needed.

**Main App Routing Module:**
```typescript
const routes: Routes = [
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];
```

**User Module Routing:**
```typescript
const routes: Routes = [
  { path: '', component: UserListComponent },
];
```

---

## 4. Preloading Strategies

### **Custom Preloading**

```typescript
@Injectable({ providedIn: 'root' })
export class CustomPreloading implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] ? load() : of(null);
  }
}

const routes: Routes = [
  { path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule), data: { preload: true } },
];
```

---

## 5. Router Events & Navigation Observables

Monitor navigation events:
```typescript
constructor(private router: Router) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      console.log('Navigation started');
    }
    if (event instanceof NavigationEnd) {
      console.log('Navigation ended');
    }
  });
}
```

---

## 6. Custom Route Matchers

Use custom logic to match routes.

```typescript
const customMatcher: UrlMatcher = (segments) => {
  return segments.length === 1 && segments[0].path === 'custom' ? { consumed: segments } : null;
};

const routes: Routes = [
  { matcher: customMatcher, component: CustomComponent },
];
```

---

## 7. Dynamic Component Loading

Dynamically load components based on route data.

```typescript
const routes: Routes = [
  { path: 'dynamic', component: PlaceholderComponent, data: { component: DynamicComponent } },
];

@Component({
  template: `<ng-container #container></ng-container>`
})
export class PlaceholderComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private route: ActivatedRoute, private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    const component = this.route.snapshot.data['component'];
    const factory = this.resolver.resolveComponentFactory(component);
    this.container.createComponent(factory);
  }
}
```

---

## 8. Router Animations

Add animations when navigating between routes.

```typescript
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {}
```

---

## 9. Hash-based vs Path-based Routing

Switch between `#`-based and clean URLs.

- **Hash-based:** Add `useHash: true` in `RouterModule.forRoot()`:
  ```typescript
  RouterModule.forRoot(routes, { useHash: true })
  ```

- **Path-based:** Default behavior, but requires server configuration for deep linking.

---

## 10. Multi-Outlets & Named Outlets

### **Named Outlets**
You can load multiple components in different outlets.

```typescript
const routes: Routes = [
  { path: 'main', component: MainComponent, outlet: 'primary' },
  { path: 'sidebar', component: SidebarComponent, outlet: 'sidebar' },
];

<router-outlet name="primary"></router-outlet>
<router-outlet name="sidebar"></router-outlet>
```

---


# Advanced Angular Routing Guide

## 1. Dynamic and Nested Routes

### **Dynamic Routes**
Dynamic routes allow passing parameters to the URL (e.g., `/product/123`).

```typescript
const routes: Routes = [
  { path: 'product/:id', component: ProductComponent },
];

@Component({
  template: `
    <h2>Product Details</h2>
    <p>Product ID: {{ productId }}</p>
  `
})
export class ProductComponent implements OnInit {
  productId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
  }
}
```

### **Nested Routes**
Nested routes allow rendering child components inside a parent using a `router-outlet`.

```typescript
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
];
```

Parent `dashboard.component.html`:
```html
<h1>Dashboard</h1>
<nav>
  <a routerLink="profile">Profile</a>
  <a routerLink="settings">Settings</a>
</nav>
<router-outlet></router-outlet>
```

---

## 2. Route Guards

### **CanActivate (Prevent Unauthenticated Access)**

```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated;
  }
}

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
];
```

### **CanDeactivate (Prevent Unsaved Changes from Being Lost)**

```typescript
@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: any): boolean {
    return confirm('Do you want to discard unsaved changes?');
  }
}

const routes: Routes = [
  { path: 'edit', component: EditComponent, canDeactivate: [UnsavedChangesGuard] },
];
```

### **Resolve (Pre-Fetch Data)**

```typescript
@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<any> {
  resolve(): Observable<any> {
    return of({ name: 'Angular', version: 16 }).pipe(delay(1000));
  }
}

const routes: Routes = [
  { path: 'info', component: InfoComponent, resolve: { data: DataResolver } },
];
```

---

## 3. Lazy Loading

Lazy loading improves performance by loading modules only when needed.

**Main App Routing Module:**
```typescript
const routes: Routes = [
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];
```

**User Module Routing:**
```typescript
const routes: Routes = [
  { path: '', component: UserListComponent },
];
```

---

## 4. Preloading Strategies

### **Custom Preloading**

```typescript
@Injectable({ providedIn: 'root' })
export class CustomPreloading implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] ? load() : of(null);
  }
}

const routes: Routes = [
  { path: 'feature', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule), data: { preload: true } },
];
```

---

## 5. Router Events & Navigation Observables

Monitor navigation events:
```typescript
constructor(private router: Router) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      console.log('Navigation started');
    }
    if (event instanceof NavigationEnd) {
      console.log('Navigation ended');
    }
  });
}
```

---

## 6. Custom Route Matchers

Use custom logic to match routes.

```typescript
const customMatcher: UrlMatcher = (segments) => {
  return segments.length === 1 && segments[0].path === 'custom' ? { consumed: segments } : null;
};

const routes: Routes = [
  { matcher: customMatcher, component: CustomComponent },
];
```

---

## 7. Dynamic Component Loading

Dynamically load components based on route data.

```typescript
const routes: Routes = [
  { path: 'dynamic', component: PlaceholderComponent, data: { component: DynamicComponent } },
];

@Component({
  template: `<ng-container #container></ng-container>`
})
export class PlaceholderComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private route: ActivatedRoute, private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    const component = this.route.snapshot.data['component'];
    const factory = this.resolver.resolveComponentFactory(component);
    this.container.createComponent(factory);
  }
}
```

---

## 8. Router Animations

Add animations when navigating between routes.

```typescript
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {}
```

---

## 9. Hash-based vs Path-based Routing

Switch between `#`-based and clean URLs.

- **Hash-based:** Add `useHash: true` in `RouterModule.forRoot()`:
  ```typescript
  RouterModule.forRoot(routes, { useHash: true })
  ```

- **Path-based:** Default behavior, but requires server configuration for deep linking.

---

## 10. Multi-Outlets & Named Outlets

### **Named Outlets**
You can load multiple components in different outlets.

```typescript
const routes: Routes = [
  { path: 'main', component: MainComponent, outlet: 'primary' },
  { path: 'sidebar', component: SidebarComponent, outlet: 'sidebar' },
];

<router-outlet name="primary"></router-outlet>
<router-outlet name="sidebar"></router-outlet>
```

---



# Angular Storage System with Signals and RxJS

This document describes how to create a simple storage system in Angular using **Signals** (introduced in Angular 16) or **RxJS**. This storage system can save objects or small data by a key and retrieve them when needed.

---

## Using Angular Signals

### Service Implementation

```typescript
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = signal<Record<string, any>>({}); // Central storage using signals

  // Save data by key
  save(key: string, value: any): void {
    const currentData = this.storage();
    this.storage.set({ ...currentData, [key]: value });
  }

  // Retrieve data by key
  get(key: string): any {
    return this.storage()[key];
  }

  // Delete data by key
  remove(key: string): void {
    const currentData = this.storage();
    const { [key]: _, ...updatedData } = currentData; // Exclude the key to remove
    this.storage.set(updatedData);
  }

  // Get all stored data (optional)
  getAll(): Record<string, any> {
    return this.storage();
  }
}
```

### Usage in Components

#### Saving Data
```typescript
import { Component } from '@angular/core';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  template: `<button (click)="saveData()">Save Data</button>`,
})
export class AppComponent {
  constructor(private storageService: StorageService) {}

  saveData() {
    this.storageService.save('user', { name: 'John', age: 30 });
    console.log('Data saved!');
  }
}
```

#### Retrieving Data
```typescript
import { Component } from '@angular/core';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-display',
  template: `<button (click)="showData()">Show Data</button>`,
})
export class DisplayComponent {
  constructor(private storageService: StorageService) {}

  showData() {
    const userData = this.storageService.get('user');
    console.log('Retrieved Data:', userData);
  }
}
```

---

## Using RxJS

### Service Implementation

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = new BehaviorSubject<Record<string, any>>({});

  // Save data by key
  save(key: string, value: any): void {
    const currentData = this.storage.value;
    this.storage.next({ ...currentData, [key]: value });
  }

  // Retrieve data by key
  get(key: string): any {
    return this.storage.value[key];
  }

  // Subscribe to data changes (optional)
  watch(key: string) {
    return this.storage.asObservable();
  }

  // Delete data by key
  remove(key: string): void {
    const currentData = this.storage.value;
    const { [key]: _, ...updatedData } = currentData; // Exclude the key to remove
    this.storage.next(updatedData);
  }
}
```

### Usage in Components

#### Saving Data
```typescript
import { Component } from '@angular/core';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  template: `<button (click)="saveData()">Save Data</button>`,
})
export class AppComponent {
  constructor(private storageService: StorageService) {}

  saveData() {
    this.storageService.save('settings', { theme: 'dark', language: 'en' });
    console.log('Data saved!');
  }
}
```

#### Retrieving Data
```typescript
import { Component } from '@angular/core';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-settings',
  template: `<button (click)="showData()">Show Settings</button>`,
})
export class SettingsComponent {
  constructor(private storageService: StorageService) {}

  showData() {
    const settings = this.storageService.get('settings');
    console.log('Retrieved Settings:', settings);
  }
}
```

#### Watching Data Changes
```typescript
import { Component, OnInit } from '@angular/core';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-watch',
  template: `<p>Check console for updates</p>`,
})
export class WatchComponent implements OnInit {
  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.storageService.watch('settings').subscribe((data) => {
      console.log('Storage updated:', data);
    });
  }
}
```

---

## Comparison: Signals vs. RxJS

| Feature                 | Angular Signals                                | RxJS                                             |
|-------------------------|-----------------------------------------------|-------------------------------------------------|
| **Reactivity**          | Simplifies state management for local data.   | Better for managing streams and asynchronous data. |
| **Simplicity**          | Easier to use for small, reactive storage.    | Requires more setup but offers more flexibility. |
| **Performance**         | Built for Angular and optimized for change detection. | Slightly heavier due to Observable subscriptions. |

---


# `ng-template` vs `ng-content` in Angular

Angular provides powerful structural directives for handling dynamic content rendering. Two important features, `ng-template` and `ng-content`, serve distinct purposes in Angular applications. This document explains their differences, use cases, and examples.

---

## **What is `ng-template`?**

`ng-template` is an Angular directive used for defining **deferred or reusable content** that is not rendered in the DOM unless explicitly used. It is commonly employed with `*ngIf`, `ngFor`, and `ViewContainerRef` for dynamic UI rendering.

### **Key Features:**
- It is **not** rendered in the DOM unless explicitly instructed.
- Used for **reusable templates**.
- Can be dynamically inserted using `ngTemplateOutlet`.
- Supports passing context to templates.

### **Example: Using `ng-template` with `*ngIf`**
```html
<div *ngIf="isLoggedIn; else loginTemplate">
  <p>Welcome, User!</p>
</div>

<ng-template #loginTemplate>
  <p>Please log in.</p>
</ng-template>
```

### **Example: Reusable Templates with `ngTemplateOutlet`**
```html
<ng-container *ngTemplateOutlet="userTemplate; context: { name: 'John' }"></ng-container>

<ng-template #userTemplate let-name>
  <p>User: {{ name }}</p>
</ng-template>
```

---

## **What is `ng-content`?**

`ng-content` is used for **content projection**, allowing a component to accept **external content** and render it within a predefined area. It enables developers to create flexible and reusable components.

### **Key Features:**
- Used for **content projection** (inserting external content into a component).
- Allows **slot-based projection** using `select` attributes.
- Ideal for creating reusable UI components like modals, cards, etc.

### **Example: Using `ng-content` for Content Projection**
#### **Parent Component (Using the Child Component)**
```html
<app-card>
  <h3>Card Title</h3>
  <p>This is the card content.</p>
</app-card>
```

#### **Child Component (`app-card.component.html`)**
```html
<div class="card">
  <ng-content></ng-content>  <!-- Content from the parent will be projected here -->
</div>
```

### **Example: Multi-slot Content Projection**
#### **Parent Component (Passing Different Content Blocks)**
```html
<app-modal>
  <h2 title>Modal Header</h2>
  <p>Some modal content...</p>
  <button action>Close</button>
</app-modal>
```

#### **Child Component (`app-modal.component.html`)**
```html
<div class="modal">
  <header><ng-content select="[title]"></ng-content></header>
  <section><ng-content></ng-content></section>
  <footer><ng-content select="[action]"></ng-content></footer>
</div>
```

---

## **Comparison: `ng-template` vs `ng-content`**

| Feature           | `ng-template`                          | `ng-content`                             |
|------------------|--------------------------------------|-----------------------------------------|
| **Purpose**      | Defines reusable or deferred content | Projects content from parent components |
| **Rendering**    | Not rendered unless explicitly used  | Rendered immediately in the component  |
| **Use Case**     | Dynamic UI (e.g., `*ngIf`, `ngFor`)  | Component slots for flexible content    |
| **Customization**| Can receive context via `let-`      | Supports multi-slot projection          |

---

## **When to Use What?**
- Use `ng-template` when you need **conditionally rendered or reusable content**.
- Use `ng-content` when you need **to pass content dynamically into a component** (e.g., reusable UI components like cards, modals, or tabs).

Both features play a crucial role in making Angular applications more **dynamic and reusable**, improving **code modularity and flexibility**.




# Angular Change Detection

## 1. What is Change Detection in Angular?
Change detection is the mechanism Angular uses to track and update the UI whenever the application's state changes. It ensures that the view always reflects the latest state of the model.

## 2. How Change Detection Works in Angular
Angular uses a **zone-based mechanism (Zone.js)** and a **component tree traversal strategy** to detect changes and update the UI.

1. **Zone.js** monkey-patches browser APIs (e.g., setTimeout, event listeners, HTTP calls, etc.) to track changes.
2. When a change occurs (like user input, an API call, or a timeout), Angular triggers **Change Detection**.
3. Angular traverses the **Component Tree** from top to bottom (root to leaf components).
4. For each component, it compares the **current state (new value)** with the **previous state (old value)**.
5. If a difference is found, Angular updates the DOM.

## 3. Angular Change Detection Strategies
Angular provides two **Change Detection Strategies** that control how updates propagate:

### A. Default Change Detection (CheckAlways)
- Every time an event occurs, Angular runs change detection **on the entire component tree**.
- This is inefficient for large applications as unnecessary checks are performed.

### B. OnPush Change Detection
- Used with the `ChangeDetectionStrategy.OnPush` flag.
- Change detection runs **only if the @Input() reference changes**.
- Improves performance as Angular skips checking the component unless:
  - A new reference is passed to the `@Input()`.
  - An event occurs inside the component.
  - A change is triggered manually using `ChangeDetectorRef.detectChanges()`.

#### Example: Using OnPush
```typescript
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>Child Component: {{ data }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() data!: string;
}
```

## 4. Change Detection Lifecycle Hooks
Angular provides lifecycle hooks that work with change detection:

- **`ngOnChanges()`** → Triggered when `@Input()` values change.
- **`ngDoCheck()`** → Allows custom change detection logic.
- **`ngAfterViewChecked()`** → Runs after Angular checks the component’s view.

## 5. Manual Change Detection
### A. Using `ChangeDetectorRef`
Angular provides `ChangeDetectorRef` to control change detection:

#### `detectChanges()` (Manually trigger detection)
Forces change detection for a specific component.
```typescript
import { ChangeDetectorRef } from '@angular/core';

constructor(private cdRef: ChangeDetectorRef) {}

someMethod() {
  this.cdRef.detectChanges(); // Manually trigger change detection
}
```

#### `markForCheck()` (Triggers detection in OnPush components)
```typescript
this.cdRef.markForCheck();
```

#### `detach()` and `reattach()` (Optimize Performance)
```typescript
this.cdRef.detach(); // Stop checking
setTimeout(() => {
  this.cdRef.reattach(); // Re-enable checking after 5 seconds
}, 5000);
```

---

# Real-World Use Cases for Change Detection

## 1. Optimizing Large Lists with `trackBy` and `OnPush`
**Use Case:** Large lists (e.g., product catalog, orders) cause unnecessary re-renders.

**Solution:** Use `OnPush` in the child component and `trackBy` in `*ngFor`.
```typescript
trackById(index: number, item: any) {
  return item.id;
}
```

## 2. Avoiding Unnecessary API Calls with `OnPush`
**Use Case:** Prevent repeated API calls in components.

**Solution:** Use RxJS `async` pipe and `OnPush`.
```typescript
@Component({
  selector: 'app-dashboard',
  template: `<p>{{ data$ | async }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  data$ = this.http.get('https://api.example.com/stats');
  constructor(private http: HttpClient) {}
}
```

## 3. Optimizing Forms with Manual Change Detection
**Use Case:** Prevent excessive change detection on every keystroke.

**Solution:** Use `ChangeDetectorRef.detach()` and manually detect changes.
```typescript
constructor(private cdRef: ChangeDetectorRef) {
  this.cdRef.detach();
}

onInput() {
  this.cdRef.detectChanges();
}
```

## 4. Real-Time Applications (Stock Market, Chat)
**Use Case:** Update UI only when new data arrives.

**Solution:** Use `markForCheck()` to trigger change detection only when needed.
```typescript
this.cdRef.markForCheck();
```

## 5. Lazy Loading and Change Detection Optimization
**Use Case:** Reduce initial load time and prevent unnecessary updates.

**Solution:** Use lazy loading and `OnPush` for better performance.
```typescript
const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard.module').then(m => m.DashboardModule) }
];
```

## 6. Handling WebSockets Efficiently
**Use Case:** Minimize DOM updates when receiving real-time data.

**Solution:** Use `markForCheck()`.
```typescript
this.chatService.newMessage$.subscribe(msg => {
  this.message = msg;
  this.cdRef.markForCheck();
});
```

---

# Conclusion
Understanding and optimizing Angular Change Detection improves performance by reducing unnecessary DOM updates. 
- Use `OnPush` and `trackBy` for lists.
- Use `async` pipe to prevent unnecessary API calls.
- Use `detach()` and `detectChanges()` for complex forms.
- Use `markForCheck()` for real-time applications.


# Angular New Features: Standalone Components, Signals, and @defer

## 1️⃣ Standalone Components (No Need for NgModules)
In Angular 15+, you can create components without `NgModule`. This simplifies the app structure.

### ✅ Example: Creating a Standalone Component
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true, // 👈 No need for a module
  template: `<h2>Welcome, {{ name }}!</h2>`,
})
export class ProfileComponent {
  name = 'John Doe';
}
```

### 🛠 How to Use This Component?
Simply import it in `main.ts`:
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { ProfileComponent } from './app/profile.component';

bootstrapApplication(ProfileComponent);
```
✅ No need for `AppModule`, everything works directly!

---

## 2️⃣ Signals (Better Reactivity)
Angular introduced **Signals** to improve state management and eliminate `ChangeDetectionStrategy.OnPush`.

### ✅ Example: Using Signals in a Component
```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <h2>Counter: {{ count() }}</h2>
    <button (click)="increment()">Increase</button>
  `,
})
export class CounterComponent {
  count = signal(0); // 👈 Reactive state

  increment() {
    this.count.update(value => value + 1);
  }
}
```
**🚀 Benefits of Signals**:
- No need for RxJS `BehaviorSubject`
- Auto-triggers UI updates
- Works like a simple reactive variable

---

## 3️⃣ New Angular Decorators
Angular has simplified decorators for components.

### ✅ Example: New `@Input` and `@Output`
```ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  template: `
    <h3>{{ message }}</h3>
    <button (click)="sendMessage()">Send</button>
  `,
})
export class ChildComponent {
  @Input() message = ''; // 👈 New @Input
  @Output() notify = new EventEmitter<string>();

  sendMessage() {
    this.notify.emit('Hello from child!');
  }
}
```

---

## 4️⃣ New Control Flow Syntax (`@if`, `@for`, `@switch`)
Instead of `*ngIf` and `*ngFor`, Angular now has a new way to handle conditions.

### ✅ Example: Using `@if`, `@for`
```html
@for (item of items; track item) {
  <p>{{ item }}</p>
}

@if (isLoggedIn) {
  <h2>Welcome, User!</h2>
} @else {
  <h2>Please log in</h2>
}
```
🚀 This makes templates **cleaner** and **faster**.

---

## 🔥 Summary of Key Updates
| Feature                 | Old Way | New Way |
|-------------------------|--------|---------|
| Standalone Components  | `NgModule` required | `standalone: true` |
| State Management       | RxJS `BehaviorSubject` | `signal()` |
| Conditional Rendering  | `*ngIf`, `*ngFor` | `@if`, `@for` |
| Inputs & Outputs       | Same syntax | Improved performance |

---

## 5️⃣ Using @defer for Asynchronous Rendering

Angular introduced the **`@defer`** decorator to defer the rendering of non-critical content, improving performance by loading parts of the UI asynchronously.

### ✅ How `@defer` Works
When you mark a part of the component template with `@defer`, Angular will load the content asynchronously after the initial rendering. This can be helpful for large sections of the page or non-critical content that doesn’t need to appear immediately.

### ✅ Example of Using `@defer`

#### 1. **Basic Example**:
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1>Dashboard</h1>
    <div>
      <h3>Main Content</h3>
      <p>Some important content is displayed here.</p>
    </div>

    <!-- Deferred Content -->
    <div *ngIf="isDeferredLoaded">
      <h3>Deferred Section</h3>
      <p>This content will load after the initial page load.</p>
    </div>
  `,
})
export class DashboardComponent {
  isDeferredLoaded = false;

  ngOnInit() {
    // Simulate delayed loading of content
    setTimeout(() => {
      this.isDeferredLoaded = true;
    }, 3000); // Load content after 3 seconds
  }
}
```
In this example:
- The **initial content** (`Main Content`) is shown immediately.
- The **Deferred Section** (`Deferred Section`) is only displayed after 3 seconds, which mimics a delayed or asynchronous loading of content.

#### 2. **Using `@defer` in Template**:
In Angular 15+, you can use `@defer` in the component template to indicate that certain blocks should be deferred. Here’s how you would use it:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1>Dashboard</h1>
    <div>
      <h3>Main Content</h3>
      <p>This is important content displayed right away.</p>
    </div>

    <!-- Deferred Content with @defer -->
    @defer
    <div>
      <h3>Deferred Section</h3>
      <p>This content is loaded asynchronously, after the page has loaded.</p>
    </div>
  `,
})
export class DashboardComponent {}
```

### 🚀 Benefits of `@defer`:
- **Performance Improvement**: Defer non-critical sections of your UI until after the main content is loaded.
- **Faster Initial Load**: Reduces the time it takes for the main content to load, improving user experience.
- **Asynchronous Rendering**: This feature leverages Angular’s efficient rendering strategies to only load what's necessary initially.

### 🏆 When to Use `@defer`:
- For sections of the UI that are not critical to the user experience (e.g., large banners, advertisements, extra content sections).
- When you need to prioritize the initial rendering of key components and defer others.


Angular's change detection is a crucial mechanism that ensures the synchronization between the component's data model and its view. Here’s a detailed overview of how it works, its strategies, and its optimization techniques.

## What is Angular Change Detection?

Change detection in Angular is responsible for monitoring changes in the application state and updating the user interface accordingly. This process ensures that the view reflects the current state of the data model, providing a seamless user experience. Changes can originate from various sources, including:

- User interactions (e.g., clicks, keyboard events)
- Asynchronous operations (e.g., HTTP requests, timers)
- Direct updates to component properties

Whenever a change occurs, Angular's change detection mechanism triggers to check all components in the application tree to see if they need to be updated[1][5].

## How Change Detection Works

Angular maintains a hierarchical tree of components, and each component has an associated change detector. When a change is detected, Angular traverses this tree from the root downwards, checking each component to determine if it needs to update its view. This involves comparing the current state of the model with its previous state[5][7].

### Change Detection Cycle

1. **Triggering Events**: Change detection can be triggered by various events such as user actions or asynchronous operations.
2. **Traversal**: Angular starts from the root component and checks each child component in sequence.
3. **Update**: If a component's data model has changed, Angular updates the view accordingly.

## Change Detection Strategies

Angular provides two primary strategies for managing change detection:

### 1. Default Strategy

In this mode, Angular checks every component in the tree whenever a change is detected. This means that even minor changes can lead to a complete traversal of the entire component tree, which may affect performance in larger applications[1][5].

### 2. OnPush Strategy

The OnPush strategy optimizes performance by limiting when change detection occurs. With this strategy, Angular only checks a component when:

- A new reference is passed to an `@Input()` property.
- An event occurs within the component itself.
- An observable that the component subscribes to emits a new value.

This approach reduces unnecessary checks and can significantly improve performance in complex applications[1][5].

## Managing Change Detection Manually

Developers can also manually control change detection using methods provided by `ChangeDetectorRef`:

- **markForCheck()**: Marks the component for checking during the next change detection cycle.
- **detectChanges()**: Manually triggers change detection for the current component and its children.
- **detach()**: Excludes the view from change detection until it is reattached[1][7].

## Conclusion

Understanding Angular's change detection mechanism is vital for building efficient applications. By leveraging both default and OnPush strategies, developers can optimize performance while ensuring that their applications remain responsive and up-to-date with user interactions and data changes.

Sure! Angular's change detection is a core mechanism that updates the DOM when data changes. It ensures that the UI reflects the latest state of the application. Let’s break it down step by step.

1. What is Change Detection?

Change detection in Angular is the process of detecting changes in the component state (such as input properties, component variables, or services) and updating the DOM accordingly.

2. How Change Detection Works in Angular

Angular uses a mechanism called Zone.js to track asynchronous operations like:

Events (e.g., user clicks)

Promises & async/await

Observables (e.g., HTTP requests, RxJS)

setTimeout / setInterval


When any of these operations occur, Angular’s change detection runs automatically to check if there are any changes that need to be reflected in the UI.

3. Change Detection Strategies

Angular provides two change detection strategies:

a) Default (Check Always)

Used by default in every component.

It checks the whole component tree whenever an event occurs.

Even if a small part of the data changes, Angular runs change detection for the entire application.


b) OnPush

Improves performance by checking only when an @Input() property changes.

Suitable for components that receive immutable data.

Change detection will not run unless:

The @Input() reference changes.

An event occurs inside the component.

A manual trigger is used (e.g., ChangeDetectorRef.markForCheck()).



@Component({
  selector: 'app-example',
  template: `<p>{{data.name}}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  @Input() data: { name: string };
}

4. Change Detection Phases

Change detection happens in two phases:

a) Update Phase

1. Angular checks for changes in component properties.


2. Updates the component’s UI if changes are detected.



b) View Rendering Phase

1. The updated values are rendered in the browser.


2. The cycle repeats when new changes occur.



5. Manual Change Detection

Sometimes, you need to trigger change detection manually using ChangeDetectorRef.

Methods in ChangeDetectorRef

markForCheck() → Marks the component and its ancestors for checking in the next cycle.

detectChanges() → Immediately runs change detection for the component and its children.

detach() → Stops change detection for the component.

reattach() → Re-enables change detection for the component.


import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<p>{{counter}}</p>
             <button (click)="updateCounter()">Update</button>`
})
export class ExampleComponent {
  counter = 0;

  constructor(private cd: ChangeDetectorRef) {}

  updateCounter() {
    this.counter++;
    this.cd.detectChanges(); // Manually trigger change detection
  }
}

6. Change Detection Optimization Tips

Use OnPush strategy for better performance.

Avoid modifying objects directly; use immutable data.

Use trackBy in *ngFor to optimize lists.

Detach and reattach change detection in high-performance scenarios.



---


# What is the name of the RxJS class that EventEmitter extends?

## Question:

**"The EventEmitter class provided by Angular extends a core RxJS class, adding an emit() method so it can send arbitrary values. What is the name of that class?"**

## Answer:

The **EventEmitter** class in Angular extends **RxJS’s Subject** class. The `Subject` class is a special type of Observable that allows values to be multicasted to multiple Observers.

### Breakdown of the Concept:

1. **RxJS Subject**:

   - A `Subject` is both an **Observable** and an **Observer**.
   - It allows multiple subscribers to listen for emitted values.
   - It has methods like `next()`, `subscribe()`, and `complete()`.

2. **EventEmitter in Angular**:

   - The **EventEmitter** class extends `Subject`, meaning it inherits its capabilities.
   - Angular adds an `emit()` method to simplify value emission.
   - Internally, `emit(value)` is just a wrapper around `Subject`'s `next(value)`, making it easier to use.

### Example Usage in Angular:

```typescript
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<button (click)="sendMessage()">Send Message</button>`
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('Hello from Child!');
  }
}
```

Here, `messageEvent` behaves like a **Subject**, emitting values when `emit()` is called.

### Key Takeaways:

- The **EventEmitter** extends **RxJS’s Subject**.
- It provides an `emit()` method as a wrapper around `Subject.next()`.
- It is mainly used for **communication between Angular components**, especially in `@Output()` bindings.










