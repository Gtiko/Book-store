import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IBookResponse } from 'src/app/bookStore.interface';

@Component({
  selector: 'app-cart',
  template: `


  <header style="display: flex; justify-content: space-between; cursor: pointer;">
      <h1 (click)="home()">Home</h1>
      <h1>Shopping Cart</h1>
      <h1 (click)="favorites()">Favorites</h1>
  </header>
    <main>
      <div class="cart">
        <h2>Your Cart</h2>

        <ul class="cart-items">
          <li *ngFor="let each of shoppingCart">
            {{ each.title }}
            <span>$ {{ each.price }}</span>
            <button (click)="removeFromCart(each._id)" style="background-color: red;">Remove</button>
          </li>
        </ul>
        <div class="cart-total">Total: <span>$ {{ totalCost }}</span></div>
        <button class="checkout-button" (click)="checkout()" [disabled]="disableCheckoutButton">Checkout</button>
      </div>
    </main>
  `,
  styles: [
  ]
})
export class CartComponent {

  authService = inject(AuthService);
  bookService = inject(BookService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  userId: string = this.activatedRoute.snapshot.paramMap.get('userId') as string

  shoppingCart: IBookResponse[] = [];
  totalCost: number = 0;
  disableCheckoutButton: boolean = true;


  ngOnInit() {
    this.bookService.getUserById(this.userId).subscribe(
      userResponse => {
        if (userResponse.success && userResponse.data.cart) {
          for (let each of userResponse.data.cart) {
            this.bookService.getBookById(each.bookId).subscribe(
              bookResponse => {
                if (bookResponse.success) {
                  this.shoppingCart.push(bookResponse.data);

                  const worker = new Worker(new URL('./cart.worker.ts', import.meta.url));
                  worker.onmessage = ({ data }) => {
                    this.totalCost = data
                  };
                  worker.postMessage(this.shoppingCart);
                }
              }
            )
          }
        }
      }
    )
  }

  removeFromCart(bookId: string) {
    this.bookService.removeFromCart(this.userId, bookId).subscribe(
      response => {
        if (response.success) {
          const removedBook = this.shoppingCart.find(x => x._id === bookId)
          if (removedBook) {
            this.totalCost = this.totalCost - removedBook?.price
          }
          this.shoppingCart = this.shoppingCart.filter(item => item._id !== bookId);
        }
      }
    )
  }

  checkout(){
    this.bookService.sendCheckoutStatus(this.userId, this.shoppingCart).subscribe(
      response =>{
        if(response.success){
          this.shoppingCart = []
          window.location.href = 'https://buy.stripe.com/test_aEUcPZ2sS5nX5na7su';
        }
      }
    )
  }

  ngAfterContentChecked(){
    if(this.shoppingCart.length === 0){
      this.disableCheckoutButton = true;
    }else{
      this.disableCheckoutButton = false;
    }
  }

  home(){
    this.router.navigate(['', 'users', this.authService.state()._id, 'books'])
  }
  favorites(){
    this.router.navigate(['', 'users', this.authService.state()._id, 'books', 'favorites'])
   }

}