import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ILogin, IState } from '../bookStore.interface';
import jwt_decode from 'jwt-decode';
import { environment as env } from "../../environments/environment"
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import {faHome} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-login',
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
        <div class="signup-container" style="margin-top: 3%;">
          <h1 style="display: flex; justify-content: center;">{{'Login'| translate}}</h1>

          <span *ngIf="isLoading" class="loading-indicator">
            <span class="loading-spinner"></span>
          </span>

          <form [formGroup]="loginForm" (ngSubmit)="login()" id="forms">
            <input type="email" placeholder="Email" formControlName="username" /> <br />
            <input type="password" placeholder="Password" formControlName="password" /><br />
            <button type="submit" class="btn btn-primary">{{'Login'| translate}}</button>
          </form>
          <span style="display: flex; flex-direction: column; align-items: center;">
            <p class="login-link">{{'Dont have account'| translate}} ? <a [routerLink]="['', 'users', 'signup']">
              {{'Create new account' | translate}}</a></p>
          </span>
        </div>

    <footer style="margin-top: 10%;">
      <p>&copy; 2023 BookStore. All rights reserved.</p>
      contact us: <a href="https://gemechutiko.netlify.app">gemechutiko.netlify.app</a> 
    </footer>
  `,
  styles: [],
})

export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  message: string = ""
  isLoading: boolean = false;

  loginForm = inject(FormBuilder).nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  faHome = faHome;

  login() {
    this.isLoading = true;
    setTimeout(()=>{this.message = "Thanks for waiting this will not take to long"}, 5000);
    this.authService.login(this.loginForm.value as ILogin).subscribe(
      response => {
        if (response.success) {
          localStorage.setItem(env.KEY, JSON.stringify(response.data))
          const logInState: IState = { ...jwt_decode(response.data), token: response.data }
          this.authService.state.set(logInState);
          if (logInState.role === "admin") {
            this.router.navigate(['', 'users', logInState._id, 'books', 'list']);
          } else if (logInState.role === "user") {
            this.router.navigate(['', 'users', logInState._id, 'books'])
          }
        } else {
          this.toastr.error('Wrong username or password');
          this.message = "";
        }
        this.isLoading = false;
      }
    )
  }


  // language
  translateService = inject(TranslateService);

  changeLanguage(event: any) {
    const selectedLanguage = event.target.value;
    this.translateService.use(selectedLanguage);
  }
}
