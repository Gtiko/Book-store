import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { BookService } from '../book.service';
import {
  IBookResponse,
  INITIAL_IBooKResponse,
} from 'src/app/bookStore.interface';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  template: `
    
    <app-user-nav />
     
    <form [formGroup]="searchForm" style="margin-top: 10px;">
        <input id="search" type="search" placeholder="search" 
        formControlName='searchField' (keyup)="handleSearch()">
    </form>
 
    <div class="grid-container">
      <div class="displayBook" >
        <span *ngFor="let each of allBooks">
          <app-cards [book]="each"></app-cards>
        </span>
      </div>
  </div>


  <footer class="booksFooter">
      
      <p >&copy; 2023 Your Bookstore. All rights reserved. | Privacy Policy | Terms of Service</p>
  
  </footer>
  
  `,
  styles: [],
})
export class UserListComponent {
  searchForm = inject(FormBuilder).nonNullable.group({
    searchField: ''
  })

  private authService = inject(AuthService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  userId: string = this.activeRoute.snapshot.paramMap.get('userId') as string;
  name: string = this.authService.state().fName;

  cart: number = 0;
  currentCartValue: number = 0;

  alerts: number = 0;

  private bookService = inject(BookService);
  allBooks: IBookResponse[] = [INITIAL_IBooKResponse];
  tempBooks: IBookResponse[] = [INITIAL_IBooKResponse];

  ngOnInit() {
    this.bookService.getBooks().subscribe((response) => {
      if (response.success) {
        this.allBooks = response.data;
        this.tempBooks = response.data;
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

  handleSearch() {
    let temp: IBookResponse[] = this.tempBooks;
    let text: string = this.searchForm.get('searchField')?.value as string;

    if (text && text.length !== 0) {
      temp = temp.filter((item) =>
        item.ISBN.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        item.author.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        item.genre.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        item.publicationDate.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      );
    }
    this.allBooks = temp;
  }

  ngAfterContentChecked() {
    this.currentCartValue = this.bookService.cart();
  }

  notification() {
    this.router.navigate(['', 'users', this.authService.state()._id, 'books', 'notification'])
  }

  goToFavorites() {
    this.router.navigate(['', 'users', this.authService.state()._id, 'books', 'favorites'])
  }

  goToCart() {
    this.router.navigate(['', 'users', this.authService.state()._id, 'books', 'cart'])
  }

  home() {
    this.router.navigate([''])
  }
}
