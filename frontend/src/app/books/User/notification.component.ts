import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-notification',
  template: `
    <header style="display: flex; justify-content: space-between; ">
      <h1 (click)="home()" style="cursor: pointer;">Home</h1>
      <h1>{{ name }}'s notification</h1>  
      <div style="display: flex; justify-content: space-between; gap: 20px; margin-right:20px;cursor: pointer;">
        <h1 (click)="goToFavorites()">Favorites</h1> 
        <h1 (click)="goToCart()"> cart 
          <span [ngStyle]="{color: currentCartValue > 0 ? 'red':'#fff'}">({{ currentCartValue }})</span>
        </h1> 
      </div>
    </header>

    <main  >
        <div *ngFor="let each of orderStatus" >
          <app-shipment-card [order]="each" />
        </div>
    </main>
  `,
  styles: [
  ]
})
export class NotificationComponent {

  private authService = inject(AuthService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);

  userId: string = this.activeRoute.snapshot.paramMap.get('userId') as string;
  name: string = this.authService.state().fName;

  cart: number = 0;
  currentCartValue: number = 0;

  orderStatus: any = [];

  ngOnInit(){
    this.bookService.getUserById(this.userId).subscribe(
      response => {
        if (response.success && response.data.cart) {
          this.cart = response.data.cart.length == 0 ? 0 : response.data.cart.length;
          this.bookService.cart.set(this.cart);
        }
      }
    )
    
    this.bookService.getUserById(this.userId).subscribe(
      response =>{
        if(response.success && response.data.orderStatus){
          this.orderStatus = response.data.orderStatus;
        }
      }
    )
  }

  ngAfterContentChecked() {
    this.currentCartValue = this.bookService.cart();
  }

  goToFavorites() {
    this.router.navigate(['', 'users', this.authService.state()._id, 'books', 'favorites'])
  }

  goToCart() {
    this.router.navigate(['', 'users', this.authService.state()._id, 'books', 'cart'])
  }

  home() {
    this.router.navigate(['', 'users', this.authService.state()._id, 'books'])
  }
}
