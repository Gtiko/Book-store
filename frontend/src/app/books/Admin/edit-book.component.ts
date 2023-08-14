import { Component, inject } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IBookAttributes, IBookResponse, INITIAL_IBooKResponse } from 'src/app/bookStore.interface';

@Component({
  selector: 'app-edit-book',
  template: `

    <header style="display: flex; justify-content: space-between;">
       <h1 (click)="home()" style=" cursor: pointer;">Home</h1>
        
        <h1>Edit - {{ bookTitle }}</h1>

         <div style="display: flex; justify-content: space-between; cursor: pointer;gap:20px">
             <h1 [routerLink]="['', 'users', authService.state()._id,'books', 'add']">Add book</h1>
             <h1>hi</h1>
         </div>
    </header>


    <div style="display: flex; justify-content: space-around; padding: 10px;">

     <app-admin-card [book]="bookToUpdate"/>

    <form [formGroup]="editBookForm" (ngSubmit)="updateBook()" id="forms">
      <span [ngStyle]="{'text-align':'center', color: color}">{{message}}</span>

      <div class="book-form">
          <div class="input-group">
            <input type="text" placeholder="Title" formControlName="title">
            <input type="text" placeholder="Author" formControlName="author">
            <input type="text" placeholder="ISBN" formControlName="ISBN">
            <input type="text" placeholder="Genre" formControlName="genre">
          </div>

          <div class="input-group">
            <input type="date" placeholder="Publication Date" formControlName="publicationDate">
            <input type="number" placeholder="Price" formControlName="price">
            <input type="number" placeholder="Available" formControlName="available">
            <!-- <input type="file" formControlName="pic"> -->
          </div>

        <div class="submit-button">
          <button type="submit" [disabled]="editBookForm.invalid">Update</button>
        </div>

        <div class="go-to-list-link" >
          <a [routerLink]="['','users', authService.state()._id, 'books', 'list']" >Go to list</a>
        </div>
        
      </div>

    </form>

  </div>

  `,
  styles: [
  ]
})
export class EditBookComponent {
  private bookService = inject(BookService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  authService = inject(AuthService);

  imageUrl: string = '';

  bookToUpdate: IBookResponse = INITIAL_IBooKResponse

  userId: string = this.activatedRoute.snapshot.paramMap.get('userId') as string;
  bookId: string = this.activatedRoute.snapshot.paramMap.get('bookId') as string;

  bookTitle: string = '';
  message: string = '';
  color: string = 'white';

  editBookForm = inject(FormBuilder).nonNullable.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    ISBN: ['', Validators.required],
    genre: ['', Validators.required],
    publicationDate: [new Date().toISOString().substring(0, 10)],
    price: [0, Validators.required],
    available: [0, Validators.required],
    // pic: ''
  })


  // get pic() { return this.editBookForm.get('pic') as FormControl }

  ngOnInit() {
    this.bookService.getBookByBookId(this.bookId).subscribe(
      response => {
        if (response.success) {
          this.bookTitle = response.data.title
          this.editBookForm.get('title')?.setValue(response.data.title)
          this.editBookForm.get('author')?.setValue(response.data.author)
          this.editBookForm.get('ISBN')?.setValue(response.data.ISBN)
          this.editBookForm.get('genre')?.setValue(response.data.genre)
          this.editBookForm.get('publicationDate')?.setValue(response.data.publicationDate)
          this.editBookForm.get('price')?.setValue(response.data.price)
          this.editBookForm.get('available')?.setValue(response.data.available)
          this.bookToUpdate = response.data;
        }
      }
    )
  }

  updateBook() {
    this.bookService.updateBook(this.bookId, this.editBookForm.value as IBookAttributes).subscribe(
      response => {
        if (response.success) {
          this.message = "Updated Successfully!";
          this.color = "green";
          this.editBookForm.get('title')?.setValue("")
          this.editBookForm.get('author')?.setValue("")
          this.editBookForm.get('ISBN')?.setValue("")
          this.editBookForm.get('genre')?.setValue("")
          this.editBookForm.get('publicationDate')?.setValue("")
          this.editBookForm.get('price')?.setValue(0)
          this.editBookForm.get('available')?.setValue(0)

          this.bookService.getBookById(this.bookId).subscribe(
            res => {
              if (res.success) {
                this.bookToUpdate = res.data
              }
            }
          )

        } else {
          this.message = response.data;
          this.color = "red"
        }
      }
    )
  }

  home() {
    this.router.navigate(['', 'users', this.userId, 'books', 'list'])
  }
}
