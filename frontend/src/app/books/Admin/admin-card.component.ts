import { Component, Input } from '@angular/core';
import {
  IBookResponse,
  INITIAL_IBooKResponse,
} from 'src/app/bookStore.interface';

@Component({
  selector: 'app-admin-card',
  template: `
    <div class="book-card">
      <span>
      <img *ngIf="found" src="https://book-store-6aqc.onrender.com/pic/{{filename}}" alt="not provided" />
      </span>
      <!-- <img [src]="book.pic" alt="Book Cover" /> -->
      <div class="book-details">
        <h3 class="book-title">{{ book.title }}</h3>
        <p class="book-price">{{ book.price | currency }}</p>
        <app-rating [rating]="rating"></app-rating>
        <div class="btn"></div>
      </div>
    </div>
    
  `,
  styles: [],
})
export class AdminCardComponent {
  @Input() book: IBookResponse = INITIAL_IBooKResponse;

  rating: number = 0;
  found:boolean = false;
  filename:string = "";

  ngAfterContentChecked(){
    if(this.book.rating){
      
      let sum = 0;
      for(let each of this.book.rating){
        sum+= each
      }
      this.rating = sum/this.book.rating.length;
    }
    if(this.book.pic.filename){
      this.filename = this.book.pic.filename;
      this.found = true;
    }
  }
}
