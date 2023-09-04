import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-admin',
  template: `
  
  <app-nav />

  <div class="signup-container">
    <h1 style="display: flex; justify-content: center;">Create Admin</h1>

      <h4 [ngStyle]="{ color: 'red' }" style="display: flex; justify-content: center;">
          {{ message }}
      </h4>

    <form [formGroup]="createAdminForm" (ngSubmit)="createAdmin()" id="forms">
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
      <button type="submit" [disabled]="createAdminForm.invalid">Create</button>
    </form>
    <!-- <p class="login-link">Already have an account? <a [routerLink]="['', 'users', 'login']">Login here</a></p> -->
  </div>

  <app-footer/>
  `,
  styles: [
  ]
})
export class CreateAdminComponent {

  createAdminForm = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    role:'admin'
  })

  bookService = inject(BookService);
  authService = inject(AuthService);
  router = inject(Router);
  userId = this.authService.state()._id;


  get username(){return this.createAdminForm.get('username') as FormControl}
  get fName(){return this.createAdminForm.get('fName') as FormControl}
  get lName(){return this.createAdminForm.get('lName') as FormControl}
  get password(){return this.createAdminForm.get('password') as FormControl}
  get password2(){return this.createAdminForm.get('password2') as FormControl}


  message: string = "";

  createAdmin(){
    this.bookService.createAdmin(this.createAdminForm.value).subscribe(
      response =>{
        if(response.success){
          this.username.setValue('');
          this.fName.setValue('');
          this.lName.setValue('');
          this.password.setValue('');
          this.password2.setValue('');
        }else{
          this.message = response.data;
        }
      }
    )
  }

  orderStatus(){
    this.router.navigate(['', 'users', this.userId, 'books', 'orders']);
  }
}
