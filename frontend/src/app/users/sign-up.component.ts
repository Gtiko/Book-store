import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ISingUp } from '../bookStore.interface';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-sign-up',
  template: `

<header style="display: flex; justify-content: space-between;">
      <h1 [routerLink]="['']" style="cursor: pointer;">
        <img src="/assets/Icons/house.png" alt=""width=45 />
      </h1>

  <h1>{{'BookStore' | translate}}</h1>
  
      <h1>
    <div>
      <select (change)="changeLanguage($event)">
        <option value="en">{{ 'english' | translate }}</option>
        <option value="fr">{{ 'አማርኛ' | translate }}</option>
      </select>
    </div>
    </h1>

  </header>
  <div class="signup-container">
    <h1 style="display: flex; justify-content: center;">{{'SignUp' | translate}}</h1>

      <h4 [ngStyle]="{ color: 'red' }" style="display: flex; justify-content: center;">
          {{ message }}
      </h4>

    <form [formGroup]="signupForm" (ngSubmit)="signup()" id="forms">
      <div class="form-group">
        <input type="email" formControlName="username" placeholder="Enter your email">
      </div>
      <div class="form-group">
        <input type="text" formControlName="fName" placeholder="Enter your first name">
      </div>
      <div class="form-group">
        <input type="text" formControlName="lName" placeholder="Enter your last name">
      </div>
      <div class="form-group">
        <input type="password" formControlName="password" placeholder="Enter your password">
      </div>
      <div class="form-group">
        <input type="password" formControlName="password2" placeholder="Confirm your password">
      </div>
      <button type="submit" [disabled]="signupForm.invalid">Sign Up</button>
    </form>
    <p class="login-link">{{'Already have an account'|translate}}? 
      <a [routerLink]="['', 'users', 'login']">{{'Login here'| translate}}</a></p>
  </div>
  <footer>
    <p>&copy; 2023 BookStore. All rights reserved.</p>
  </footer>

  `,
  styles: [
  ]
})

export class SignUpComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  message: string = "";
  incorrect: boolean = false;

  signupForm = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
  })

  signup() {
    if (this.signupForm.value.password !== this.signupForm.value.password2) {
      this.incorrect = true;
      this.message = "password don't match"
    } else {
      this.authService.signup(this.signupForm.value as ISingUp).subscribe(
        response => {
          if (response.success) {
            this.router.navigate(['', 'users', 'login'])
          } else {
            this.message = response.data;
            this.incorrect = true;
          }
        }
      )
    }
  }

  translateService = inject(TranslateService);

  changeLanguage(event: any) {
    const selectedLanguage = event.target.value;
    this.translateService.use(selectedLanguage);
  }
}