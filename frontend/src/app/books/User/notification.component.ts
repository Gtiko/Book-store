import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BookService } from '../book.service';

@Component({
  selector: 'app-notification',
  template: `
  
    <app-user-nav />

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
