import { Component, inject } from '@angular/core';
import { BookService } from './book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook, IBookResponse, INITIAL_IBooKResponse } from '../bookStore.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-details',
  template: `
    <header style="display: flex; justify-content: space-between; cursor: pointer;">
    <h1 (click)="home()" style=" cursor: pointer;">
        <img src="/assets/Icons/house.png" alt=""width=45 />
    </h1>
      <h1> {{ book.title }}</h1>
      <div style="display: flex; justify-content: space-between; gap: 20px; margin-right:20px">
      <h1 (click)="favorites()"> 
        <img src="/assets/Icons/star.png" alt=""width=45 /> 
      </h1> 
      <span (click)="goToCart()"> 
        <img src="/assets/Icons/carts.png" alt=""width=45 />  
      </span> 
      </div>
    </header>

    <div style="display: flex; " class="book-container">
      <div>
        <app-cards [book]="book"/>
      </div>

      <div class="description">
      <div>
        ISBN: {{ book.ISBN }} <br>
        Title: {{ book.title }} <br>
        Genre: {{ book.genre }} <br>
        Author: {{ book.author }} <br>
        Rating: {{ rating }} <br>
        Publication date: {{ book.publicationDate }}
      </div>
    </div>
      
    </div>

    <app-footer />
    
  `,
  styles: [
  ]
})
export class DetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private bookService = inject(BookService);
  router = inject(Router);
  authService = inject(AuthService);
  book : IBookResponse = INITIAL_IBooKResponse

  bookId: string = this.activatedRoute.snapshot.paramMap.get('bookId') as string;
  userId: string = this.activatedRoute.snapshot.paramMap.get('userId') as string;

  cart: number = 0;
  currentCartValue : number = 0;
  rating: number = 0;


  ngOnInit(){
   this.bookService.getBookByBookId(this.bookId).subscribe(
    response =>{
      if(response.success){
        this.book = response.data
      }
    }
   )

   this.bookService.getUserById(this.userId).subscribe(
    response => {
      if (response.success && response.data.cart) {
        this.cart = response.data.cart.length == 0 ? 0 : response.data.cart.length;
        this.bookService.cart.set(this.cart);
      }
    }
  )
  }
  ngDoCheck() {
    this.currentCartValue = this.bookService.cart();
  }

  ngAfterContentChecked(){
    if(this.book.rating.length!= 0){
      let sum = 0;
      for(let each of this.book.rating){
        sum+= each;
      }
      this.rating = sum/(this.book.rating.length)
    }
    if(this.book.pic.filename){
      
    }
  }

  home(){
    this.router.navigate(['', 'users', this.authService.state()._id, 'books'])
  }
  favorites(){
    this.router.navigate(['', 'users', this.authService.state()._id, 'books', 'favorites'])
   }

   goToCart() {
    this.router.navigate(['', 'users', this.authService.state()._id, 'books', 'cart'])
  }
}
