import { Component, Input, Output, inject } from '@angular/core';
import { IBookResponse, INITIAL_IBooKResponse } from '../bookStore.interface';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BookService } from './book.service';

@Component({
  selector: 'app-cards',
  template: `

    <div class="book-card">

    <span>
      <!-- <img [src]="book.pic" alt="Book Cover" [routerLink]="['', 'users', authService.state()._id, 'books',book._id, 'details', ]"> -->
      <img 
          *ngIf="found" src="https://book-store-6aqc.onrender.com/pic/{{filename}}" alt="not provided" 
          [routerLink]="['', 'users', authService.state()._id, 'books',book._id, 'details']"
          
          />
    </span>
      <div class="book-details">
        <h3 class="book-title"[routerLink]="['', 'users', authService.state()._id, 'books',book._id, 'details', ]">{{book.title}}</h3>
        <p class="book-price">{{book.price | currency}}</p>

          <app-rating [rating]="rating"></app-rating>

        <div class="btn" *ngIf="book.available !=0 else outOfStoke">
          <button class="buy-btn" (click)="addToCart(book)">Add to cart</button>
          <button class="fav" (click)="addToFavorites(book)">
            <svg
              style="fill: {{ liked }};"
              class="svg"
              id="i-star"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path
                d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z"
              />
            </svg>
          </button>
        </div>
        <ng-template #outOfStoke>
          <h1 style="color: silver;">out of stoke</h1>
        </ng-template>
      </div>
    </div>
  `,
  styles: [],
})

export class CardsComponent {
  authService = inject(AuthService);
  bookService = inject(BookService);
  activeRoute = inject(ActivatedRoute);
  userId: string = this.activeRoute.snapshot.paramMap.get('userId') as string;

  @Input() book: IBookResponse = INITIAL_IBooKResponse

  favorites: { bookId: string }[] = [];
  liked: string = "";
  rating: number = 0;
  found:boolean = false;
  filename: string = ""

  ngOnInit() {
    this.bookService.getUserById(this.userId).subscribe(
      response => {
        if (response.data.favorites) {
          this.favorites = response.data.favorites
          for (let each of this.favorites) {
            if (each.bookId === this.book._id) {
              this.liked = 'black';
            }
          }
        }
      }
    )
  }

  ngAfterContentChecked(){
    // console.log(this.book)
    if(this.book.rating.length!=0){
      let sum = 0;
      for(let each of this.book.rating){
        sum+= each
      }
      this.rating = sum/(this.book.rating.length);
    } 
    if(this.book.pic.filename){
      this.filename = this.book.pic.filename
      this.found = true;
    }
  }

  addToCart(book: IBookResponse) {
    this.bookService.addToCart(this.userId, book._id).subscribe((response) => {
      if (response.success) {
        const currentValue = this.bookService.cart() + 1;
        this.bookService.cart.set(currentValue);
      }
    });
  }

  addToFavorites(book: IBookResponse) {
    this.bookService
      .addToFavorites(this.userId, book._id)
      .subscribe(
        response => {
          if (response.success) {
            this.liked = "black";
          } else {
            this.liked = "";
          }
        }
      );
  }
}
