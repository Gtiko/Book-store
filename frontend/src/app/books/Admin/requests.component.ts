import { Component, inject } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-requests',
  template: `

    <header style="display: flex; justify-content: space-between;">
    <h1 (click)="home()" style=" cursor: pointer;">
    <img src="/assets/Icons/house.png" alt=""width=45 />
    </h1>
    <h1>Requests</h1>

      <div style="display: flex; justify-content: space-between; cursor: pointer;gap:20px">
          <h1 (click)="orderStatus()">
            <img src="/assets/Icons/package.png" alt=""width=45 />
          </h1>

          <h1 [routerLink]="['', 'users', userId, 'books', 'requests']">
            
          <img src="/assets/Icons/bell.png" alt=""width=45 /> (0)
          </h1>
          <h1 [routerLink]="['', 'users', userId,'books', 'add']">
          <img src="/assets/Icons/add.png" alt=""width=45 /> 
          </h1>
          <h1 [routerLink]="['', 'users', userId,'books', 'createAdmin']">
            <img src="/assets/Icons/add-user.png" alt=""width=45 /> 
          </h1>
          <h1 [routerLink]="['', 'users', userId,'books', 'profile']">
            <img src="/assets/Icons/profile.png" alt=""width=45 /> 
          </h1>
      </div>
  </header>
  
    <table style="margin-top: 20px;">
  <thead>
    <tr>
      <th>User Id</th>
      <th>Books</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let all of requests">
      <td>{{ all.userId }}</td>
      <td>
        <table >
          <tr *ngFor="let each of all.items">
            <td>{{ each.title }}</td>
            <td>
              <button (click)="approveRequest(all.userId, each.ISBN)">Approved</button>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </tbody>
</table>

<div>
  
</div>


  `,
  styles: [],
})
export class RequestsComponent {
  private bookService = inject(BookService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  authService = inject(AuthService);

  userId: string = this.activatedRoute.snapshot.paramMap.get(
    'userId'
  ) as string;
  requests: any;

  ngOnInit() {
    this.getRequests()
  }

  getRequests() {
    this.bookService.getUserById(this.userId).subscribe((response) => {
      if (response.success) {
        this.requests = response.data.requests;
      }
    });
  }

  approveRequest(userId: string, ISBN: string) {
    this.bookService.ApproveCheckoutRequest(userId, ISBN).subscribe(
      response => {
        if (response.success) {
          this.getRequests();
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
