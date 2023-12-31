import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BookService } from '../book.service';
import { IBookResponse } from 'src/app/bookStore.interface';

@Component({
  selector: 'app-favorites',
  template: `
  
    <app-user-nav />

    <span class="favBooks" >
      <span *ngFor="let each of favoriteBooks">
        <app-cards [book]="each" />
      </span>
    </span>
  `,
  styles: [],
})
export class FavoritesComponent {
  authService = inject(AuthService);
  private bookService = inject(BookService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  userId: string = this.activatedRoute.snapshot.paramMap.get(
    'userId'
  ) as string;

  favoriteBooks: IBookResponse[] = [];
  
  cart: number = 0;
  currentCartValue : number = 0;

  alerts: number = 0;

  ngOnInit() {
    this.bookService.getUserById(this.userId).subscribe((userResponse) => {
      if (userResponse.success && userResponse.data.favorites) {
        for (let each of userResponse.data.favorites) {
          this.bookService
            .getBookById(each.bookId)
            .subscribe((bookResponse) => {
              if (bookResponse.success && bookResponse.data) {
                this.favoriteBooks.push(bookResponse.data);
              }
            });
        }
      }
    });

    this.bookService.getUserById(this.userId).subscribe(
      response => {
        if (response.success && response.data.cart) {
          this.cart = response.data.cart.length == 0 ? 0 : response.data.cart.length;
          this.bookService.cart.set(this.cart);
        }
        if (response.success && response.data.orderStatus) {
          this.alerts = response.data.orderStatus.length;
        }
      }
    )
  }

  ngAfterContentChecked() {
    this.currentCartValue = this.bookService.cart();
  }

  notification() {
    this.router.navigate(['', 'users', this.authService.state()._id, 'books', 'notification'])
  }

  goToCart() {
    this.router.navigate(['', 'users', this.authService.state()._id, 'books', 'cart'])
  }

  home(){
    this.router.navigate(['', 'users', this.authService.state()._id, 'books'])
  }
}
