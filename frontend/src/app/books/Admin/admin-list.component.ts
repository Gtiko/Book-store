import { Component, inject } from '@angular/core';
import { BookService } from '../book.service';
import {
  IBookResponse,
  INITIAL_IBooKResponse,
} from 'src/app/bookStore.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-list',
  template: `

  <header style="display: flex; justify-content: space-between;">
  <h1 (click)="home()" style=" cursor: pointer;">
      <img src="/assets/Icons/house.png" alt=""width=45 />
      </h1>

    <h1>Inventory</h1>

      <div style="display: flex; justify-content: space-between; cursor: pointer;gap:20px">
          <h1 (click)="orderStatus()">
          <img src="/assets/Icons/package.png" alt=""width=45 />
          </h1>

          <h1 [routerLink]="['', 'users', userId, 'books', 'requests']">
            <img src="/assets/Icons/bell.png" alt=""width=45 /> 
            <span [ngStyle]="{color: numberOfRequests > 0 ? 'red':'#fff'}">({{ numberOfRequests }})</span>
          </h1>

          <h1 [routerLink]="['', 'users', authService.state()._id,'books', 'add']">
              <img src="/assets/Icons/add.png" alt=""width=45 /> 
          </h1>
          <h1 [routerLink]="['', 'users', authService.state()._id,'books', 'createAdmin']">
            <img src="/assets/Icons/add-user.png" alt=""width=45 /> 
          </h1>
          <h1 [routerLink]="['', 'users', authService.state()._id,'books', 'profile']">
            <img src="/assets/Icons/profile.png" alt=""width=45 /> 
          </h1>
      </div>
  </header>

  <form [formGroup]="searchForm" style="margin-top: 10px;">
        <input id="search" type="search" placeholder="search" 
        style="padding: 10px;"
        formControlName='searchField' (keyup)="handleSearch()">
  </form>
    
    <table>
      <thead>
        <tr>
          <!-- <th>Book Id</th> -->
          <th>Title</th>
          <th>ISBN</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Pub Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let each of allBooks">
            <!-- <td> {{each._id}}</td> -->
            <td> {{each.title}}</td>
            <td> {{each.ISBN}}</td>
            <td> {{each.author}}</td>
            <td> {{each.genre}}</td>
            <td> {{each.price}}</td>
            <td> {{each.available}}</td>
            <td> {{each.publicationDate}}</td>
            <td> 
              <button (click)="editBook(each)" style="background-color: green; width:50%">
                Edit
              </button>
              <button (click)="deleteBook(each)" style="background-color: red;width:50%">
                Delete
              </button>
            </td>
        </tr>
      </tbody>
    </table>

  `,
  styles: [],
})

export class AdminListComponent {
  private bookService = inject(BookService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  authService = inject(AuthService);

  tempBooks: IBookResponse[] = [INITIAL_IBooKResponse];

  numberOfRequests: number = 0;

  searchForm = inject(FormBuilder).nonNullable.group({
    searchField: ''
  })

  userId: string = this.activatedRoute.snapshot.paramMap.get('userId') as string
  allBooks: IBookResponse[] = [];

  ngOnInit() {
    this.bookService.getBooks().subscribe((response) => {
      if (response.success) {
        this.allBooks = response.data;
      }
    });

    this.bookService.getBooks().subscribe((response) => {
      if (response.success) {
        this.allBooks = response.data;
        this.tempBooks = response.data;
      }
    });

    this.bookService.getUserById(this.userId).subscribe((response) => {
      if (response.success && response.data.requests) {
        this.numberOfRequests = response.data.requests.length
      }
    }
    )
  }

  editBook(book: IBookResponse) {
    this.router.navigate(['', 'users', this.userId, 'books', book._id, 'edit']);
  }

  deleteBook(book: IBookResponse) {
    this.bookService.deleteBook(book._id).subscribe((response) => {
      if (response.success) {
        this.bookService.getBooks().subscribe((res) => {
          if (res.success) {
            this.allBooks = res.data;
            this.tempBooks = res.data;
          }
        })
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

  orderStatus(){
    this.router.navigate(['', 'users', this.userId, 'books', 'orders']);
  }

  home() {
    this.router.navigate(['']);
  }

}
