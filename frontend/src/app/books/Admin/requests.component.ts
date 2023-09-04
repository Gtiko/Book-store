import { Component, inject } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-requests',
  template: `
  <app-nav />
  
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
  private toastr = inject(ToastrService);

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
          this.toastr.success('Request Accepted');
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
