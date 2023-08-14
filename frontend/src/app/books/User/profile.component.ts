import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { environment as env } from '../../../environments/environment';
import { BookService } from '../book.service';
import { INITIAL_STATE_VALUE } from 'src/app/bookStore.interface';

@Component({
  selector: 'app-profile',
  template: `
    <header style="display: flex; justify-content: space-between;">
    
      <h1>Profile</h1>
      <div
        style="display: flex; justify-content: space-between; cursor: pointer;gap:20px"
      >
        <h1 (click)="logout()">Logout</h1>
      </div>
    </header>

    <main>
      <div class="shipment-card">
        <div class="shipment-status">Profile</div>
        <div class="shipment-details">
          <span class="shipment-label">First Name:</span>
          <span class="shipment-value">{{ profile.fName }} </span>
        </div>

        <div class="shipment-details">
          <span class="shipment-label">Last Name:</span>
          <span class="shipment-value">{{ profile.lName }}</span>
        </div>

        <div class="shipment-details">
          <span class="shipment-label">Username</span>
          <span class="shipment-value">{{profile.username}}</span>
        </div>

        <div class="shipment-details">
          <span class="shipment-label"></span>
          <button class="shipment-action-btn" (click)="editProfile()">Edit</button>
        </div>
      </div>
    </main>
  `,
  styles: [],
})
export class ProfileComponent {
  authService = inject(AuthService);
  bookService = inject(BookService);
  router = inject(Router);

  profile: any = this.authService.state();
  userId: string = this.authService.state()._id;


  editProfile(){
    this.router.navigate(['', 'users',this.authService.state()._id, 'books', 'editProfile' ])
  }

  // deleteProfile(){
  //   this.bookService.deleteUser(this.userId).subscribe(
  //     response =>{
  //       if(response.success){
  //         localStorage.clear();
  //         this.router.navigate(['', 'users','login']);
  //       }
  //     }
  //   )
  // }

  logout() {
    localStorage.clear();
    this.router.navigate(['', 'users', 'login']);
    this.authService.state.set(INITIAL_STATE_VALUE);
  }

}
