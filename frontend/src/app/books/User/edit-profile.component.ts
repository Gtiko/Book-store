import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BookService } from '../book.service';

import { ToastrService } from 'ngx-toastr';
import { faSignOutAlt,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-profile',
  template: `

    <header style="display: flex; justify-content: space-between;">
    
      <h1><fa-icon [icon]="faEdit"></fa-icon></h1>
      <div
        style="display: flex; justify-content: space-between; cursor: pointer;gap:20px"
      >
        <h1 (click)="logout()">
        <fa-icon [icon]="faSignOutAlt"></fa-icon>
        </h1>
      </div>
    </header>

    <form [formGroup]="editProfile" (ngSubmit)="updateProfile()" id="forms">
      <div class="book-form">
          <div class="input-group">
            <input type="text" placeholder="First Name" formControlName="fName">
            <input type="text" placeholder="Last Name" formControlName="lName">
          </div>
        <div class="submit-button">
          <button type="submit">Update</button>

          <button class="shipment-action-btn" (click)="deleteProfile()"
            style="background-color: red; margin-top: 30px;"
          >Delete Account</button>
        </div>
      </div>
    </form>
  `,

  styles: [
  ]
})
export class EditProfileComponent {
  editProfile = inject(FormBuilder).nonNullable.group({
    fName: ['', Validators.required],
    lName: ['', Validators.required],
  })

  authService = inject(AuthService);
  bookService = inject(BookService);
  private toastr = inject(ToastrService);
  faSignOutAlt = faSignOutAlt;
  faEdit = faEdit;

  router = inject(Router);

  profile: any = this.authService.state();


  get fName(){return this.editProfile.get('fName') as FormControl}
  get lName(){return this.editProfile.get('lName') as FormControl}

  ngOnInit(){
    this.fName.setValue(this.profile.fName);
    this.lName.setValue(this.profile.lName);
  }

  updateProfile() {
    let userId = this.authService.state()._id
    this.bookService.editProfile(userId, this.editProfile.value).subscribe(
      response =>{
        if(response.success){
          this.toastr.success("Updated Successfully")
          this.authService.state().fName = this.fName.value;
          this.authService.state().lName = this.lName.value;
        }
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['', 'users', 'login']);
  }

  deleteProfile(){
    this.bookService.deleteUser(this.authService.state()._id).subscribe(
      response =>{
        if(response.success){
          localStorage.clear();
          this.router.navigate(['', 'users','login']);
        }
      }
    )
  }

}
