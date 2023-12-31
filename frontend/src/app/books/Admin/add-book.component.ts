import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IBookAttributes } from 'src/app/bookStore.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  template: `

  <app-nav />

  <form [formGroup]="addBookForm" (ngSubmit)="addBook()" id="forms">

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
      <input type="file" formControlName="pic" accept="image/jpg" (change)="pickFile($event)">
    </div>

    <div class="submit-button">
      <button type="submit" [disabled]="addBookForm.invalid">Submit</button>
    </div>

    <div class="go-to-list-link">
      <a [routerLink]="['', 'users', authService.state()._id, 'books', 'list']">Go to list</a>
    </div>
  </div>
</form>

<app-footer/>

  `,
  styles: [
  ]
})
export class AddBookComponent {
  private bookService = inject(BookService);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  authService = inject(AuthService);

  userId: string = this.activatedRoute.snapshot.paramMap.get('userId') as string

  bookFile!: File;
  numberOfRequests: number = 0;

  addBookForm = inject(FormBuilder).nonNullable.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    ISBN: ['', Validators.required],
    genre: ['', Validators.required],
    publicationDate: [new Date().toISOString().substring(0, 10)],
    price: ['', Validators.required],
    available: ['', Validators.required],
    pic: ['', Validators.required],
  })

  get title() { return this.addBookForm.get('title') as FormControl }
  get author() { return this.addBookForm.get('author') as FormControl }
  get ISBN() { return this.addBookForm.get('ISBN') as FormControl }
  get genre() { return this.addBookForm.get('genre') as FormControl }
  get publicationDate() { return this.addBookForm.get('publicationDate') as FormControl }
  get price() { return this.addBookForm.get('price') as FormControl }
  get available() { return this.addBookForm.get('available') as FormControl }
  get pic() { return this.addBookForm.get('pic') as FormControl }

  addBook() {
    const formData = new FormData();
    formData.append('title', this.title.value);
    formData.append('author', this.author.value);
    formData.append('ISBN', this.ISBN.value);
    formData.append('genre', this.genre.value);
    formData.append('publicationDate', this.publicationDate.value);
    formData.append('price', this.price.value);
    formData.append('available', this.available.value);
    formData.append('pic', this.bookFile);

    console.log("formData", formData)

    this.bookService.addBook(formData).subscribe(
      response => {
        if (response.success) {
          this.toastr.success("Submitted successfully");

          this.title.setValue('');
          this.author.setValue('');
          this.ISBN.setValue('');
          this.genre.setValue('');
          this.price.setValue('');
          this.available.setValue('');

          
        } else {
          console.log(response)
          this.toastr.error(response.data);
        }
      }
    )
  }

  pickFile(event: Event) {
    const input_element = event.target as HTMLInputElement;
    if (input_element.files) {
      this.bookFile = input_element.files[0];
    }
  }

  ngOnInit(){
    this.bookService.getUserById(this.userId).subscribe((response) => {
      if (response.success && response.data.requests) {
        this.numberOfRequests = response.data.requests.length
      }
    }
    )
  }

  home() {
    this.router.navigate(['', 'users', this.userId, 'books', 'list'])
  }

  orderStatus(){
    this.router.navigate(['', 'users', this.userId, 'books', 'orders']);
  }
}
