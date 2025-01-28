# Advance Angular

## 1 Introduction

### 1.1 notes

```javascript
console.log("Angular");
```




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

