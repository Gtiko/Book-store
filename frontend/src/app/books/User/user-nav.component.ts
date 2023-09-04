import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BookService } from '../book.service';
import { IBookResponse, INITIAL_IBooKResponse } from 'src/app/bookStore.interface';

import {faHome, faBell, faStar, faShoppingCart, faListUl, faUserCircle, faUserPlus, faFontAwesome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-nav',
  template: `
      
    <header style="display: flex; justify-content: space-between; ">

    <h1 (click)="home()" style=" cursor: pointer;">
      <fa-icon [icon]="faHome"></fa-icon>
    </h1>

      <div style="display: flex; justify-content: space-between; gap: 20px; margin-right:20px;cursor: pointer;">
        
      <h1 (click)="notification()">
        <fa-icon [icon]="faBell" class="icon"></fa-icon>
      </h1>
        <span [ngStyle]="{color: alerts > 0 ? 'red':''}" *ngIf="alerts > 0"> ({{ alerts }})</span>
      

      <h1 (click)="goToFavorites()"> 
        <fa-icon [icon]="faStar"></fa-icon>
      </h1> 

      <h1 (click)="goToCart()"> 
        <fa-icon [icon]="faShoppingCart" ></fa-icon>
      </h1> 

      <span [ngStyle]="{color: currentCartValue > 0 ? 'red':'#fff'}"
      *ngIf="currentCartValue > 0"
      >({{ currentCartValue }})</span>
        
        <h1 [routerLink]="['', 'users', userId,'books', 'profile']">
         <fa-icon [icon]="faUserCircle" class="icon"></fa-icon>
        </h1>
      </div>

    </header>
  
  `,
  styles: [
  ]
})

export class UserNavComponent {
  searchForm = inject(FormBuilder).nonNullable.group({
    searchField: ''
  })

  faBell= faBell;
  faStar = faStar;
  faHome = faHome;
  faListUl = faListUl;
  faUserPlus = faUserPlus;
  faPlusCircle = faPlusCircle;
  faUserCircle = faUserCircle;
  faFontAwesome = faFontAwesome;
  faShoppingCart = faShoppingCart;

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
    this.router.navigate(['', 'users', this.authService.state()._id, 'books']);
  }
}

