import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ISingUp } from '../bookStore.interface';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';


import {faHome} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-sign-up',
  template: `

<header style="display: flex; justify-content: space-between;">
      <h1 [routerLink]="['']" style="cursor: pointer;">
        <fa-icon [icon]="faHome"></fa-icon>
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

      <span *ngIf="isLoading" class="loading-indicator">
        <span class="loading-spinner"></span>         
           <div style="text-align: center; color: green">
           {{ message }}
           </div>
      </span>

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
      <a [routerLink]="['', 'users', 'login']">{{'Login here'| translate}}</a>
    </p>
  </div>
  
  <footer>
    <p>&copy; 2023 BookStore. All rights reserved.</p>
      contact us: <a href="https://gemechutiko.netlify.app">gemechutiko.com</a>
  </footer>

  `,
  styles: [
  ]
})

export class SignUpComponent {
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  isLoading: boolean = false;
  message: string = "";
  faHome = faHome;

  signupForm = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
  })

  signup() {
    this.isLoading = true;
    
    setTimeout(()=>{this.message = "Thanks for waiting"}, 5000);
    setTimeout(()=>{this.message = "I'm running the backend on render"}, 8000);
    setTimeout(()=>{this.message = "It will take sometimes to start the server"}, 11000);
    setTimeout(()=>{this.message = "Thanks for waiting again"}, 15000);


    if (this.signupForm.value.password !== this.signupForm.value.password2) {
      this.toastr.error("Password don't match");
      this.message =""
      this.isLoading = false;
    } else {
      this.authService.signup(this.signupForm.value as ISingUp).subscribe(
        response => {
          if (response.success) {
            this.toastr.success("Signed Successfully");
            this.router.navigate(['', 'users', 'login']);
          } else {
            this.toastr.error( response.data);
            this.isLoading = false;
            this.message =""
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
