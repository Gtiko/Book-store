import { Component, inject } from '@angular/core';
import { IBookResponse, INITIAL_IBooKResponse } from 'src/app/bookStore.interface';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

import {faHome, faBell, faStar, faListUl, faUserCircle, faUserPlus, faFontAwesome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-nav',
  template: `
  <header style="display: flex; justify-content: space-between;">
    <h1 (click)="home()" style=" cursor: pointer;" title="Home">
        <fa-icon [icon]="faHome"></fa-icon>
    </h1>

      <div style="display: flex; justify-content: space-between; cursor: pointer;gap:20px">
          <h1 (click)="orderStatus()" title="List of orders">
            <fa-icon [icon]="faListUl" class="icon"></fa-icon>
          </h1>

          <h1 [routerLink]="['', 'users', userId, 'books', 'requests']" title="notification">
            <fa-icon [icon]="faBell" class="icon"></fa-icon>
            <span [ngStyle]="{color: numberOfRequests > 0 ? 'red':'#fff'}"
            style="font-size: large;" *ngIf="numberOfRequests > 0"
            >({{ numberOfRequests }})</span>
          </h1>

          <h1 [routerLink]="['', 'users', authService.state()._id,'books', 'add']" title="Add Book">
          <fa-icon [icon]="faPlusCircle" class="icon"></fa-icon>
          </h1>
          <h1 [routerLink]="['', 'users', authService.state()._id,'books', 'createAdmin']" title="Add Admin">
            <fa-icon [icon]="faUserPlus" class="icon"></fa-icon>
          </h1>
          <h1 [routerLink]="['', 'users', authService.state()._id,'books', 'profile']" title="Profile">
            <fa-icon [icon]="faUserCircle" class="icon"></fa-icon>
          </h1>
      </div>
  </header>
  `,
  styles: [
  ]
})
export class NavComponent {


  private bookService = inject(BookService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  authService = inject(AuthService);

  tempBooks: IBookResponse[] = [INITIAL_IBooKResponse];

  numberOfRequests: number = 0;

  
  faBell= faBell;
  faStar = faStar;
  faHome = faHome;
  faListUl = faListUl;
  faUserPlus = faUserPlus;
  faPlusCircle = faPlusCircle;
  faUserCircle = faUserCircle;
  faFontAwesome = faFontAwesome;

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


  orderStatus(){
    this.router.navigate(['', 'users', this.userId, 'books', 'orders']);
  }

  home() {
    this.router.navigate(['', 'users', this.userId, 'books','list']);
  }

}
