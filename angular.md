# Advance Angular

## 1 Introduction

### 1.1 notes

```javascript
console.log("Angular");
```



Here's an outline to develop an Angular application containing the mentioned features:


---

1. Custom Directive

Create a directive to highlight text:

ng generate directive directives/highlight

highlight.directive.ts

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

Usage:

<p appHighlight>Hover to highlight this text!</p>


---

2. Custom Validation (Signup Page)

Implement custom validation for password strength.

ng generate component signup

signup.component.ts

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

signup.component.html

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


---

3. Custom Pipe

Format a number as currency.

ng generate pipe pipes/currency-format

currency-format.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
}

Usage:

<p>{{ 1234 | currencyFormat }}</p>


---

4. Role-Based Guard

Protect routes based on user roles.

ng generate guard guards/role

role.guard.ts

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

app-routing.module.ts

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
];


---

5. Interceptor

Attach a token to every HTTP request.

ng generate interceptor interceptors/auth

auth.interceptor.ts

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

app.module.ts

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AppModule {}


---

Let me know if you'd like any of these features explained further!

