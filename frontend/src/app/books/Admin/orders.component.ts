import { Component, inject } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  template: `

<header style="display: flex; justify-content: space-between;">
    <h1 (click)="home()" style=" cursor: pointer;">
    <img src="/assets/Icons/house.png" alt=""width=45 />
    </h1>

    <h1>Orders</h1>

    <div style="display: flex; justify-content: space-between; cursor: pointer;gap:20px">
          <h1>
          <img src="/assets/Icons/package.png" alt=""width=45 />
          </h1>

          <h1 [routerLink]="['', 'users', userId, 'books', 'requests']">
            
          <img src="/assets/Icons/bell.png" alt=""width=45 /> 

            <span [ngStyle]="{color: numberOfRequests > 0 ? 'red':'#fff'}">({{ numberOfRequests }})</span>
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

  <main *ngIf="exist">
    <div *ngFor="let all of users">
        <div class="shipment-card">
            <div class="shipment-status">Order Shipped</div>
            <div class="shipment-details">
              <span class="shipment-label">Customer:</span>
              <span class="shipment-value">{{ all.fName }} </span>
            </div>

            <div *ngFor="let each of orders">

                <div class="shipment-details">
                  <span class="shipment-label">OrderId:</span>
                  <span class="shipment-value">{{ each.orderId }}</span>
                </div>

                <div class="shipment-details">
                  <span class="shipment-label">Shipping Carrier:</span>
                  <span class="shipment-value">FedEx</span>
                </div>
                
                <div class="shipment-details">
                  <span class="shipment-label">Status:</span>
                  <span class="shipment-value">{{ each.deliveryStatus }}</span>
                  <div class="shipment-buttons">
                    <button class="shipment-action-btn" (click)="updateOrderStatus(all._id, each.orderId, 'In transit')">In transit</button>
                    <button class="shipment-action-btn" (click)="updateOrderStatus(all._id, each.orderId, 'Out of delivery')">Out of delivery</button>
                    <button class="shipment-action-btn" (click)="updateOrderStatus(all._id, each.orderId, 'Delivered')">Delivered</button>
                    <button class="shipment-action-btn" (click)="updateOrderStatus(all._id, each.orderId, 'Delayed')">Delayed</button>
                  </div>
                </div>

            </div>
      </div>
    </div>
  </main> 
  `,
  styles: [
  ]
})
export class OrdersComponent {
  private router = inject(Router);
  private bookService = inject(BookService);  
  private activatedRoute = inject(ActivatedRoute);

  userId: string = this.activatedRoute.snapshot.paramMap.get('userId') as string

  numberOfRequests: number = 0;
  users: any = [];
  orders: any = [];
  exist: boolean = false;

  fetchData(){
    this.bookService.getAllUsers().subscribe(
      response =>{
        if(response.success){
          for(let each of response.data){
            if(each.role === 'user' && each.orderStatus && each.orderStatus.length > 0){
              this.users.push(each)
              this.orders = each.orderStatus;
              this.exist = true
            }
          }
        }
      }
    )
  }

  ngOnInit(){
    this.fetchData();

    this.bookService.getUserById(this.userId).subscribe((response) => {
      if (response.success && response.data.requests) {
        this.numberOfRequests = response.data.requests.length
      }
    }
    )
  }

  updateOrderStatus(userId: string, orderId: string, orderStatus: string){
    this.bookService.updateDelivery(userId, orderId, orderStatus).subscribe(
      response =>{
        if(response.success){
          for(let each of this.orders){
            if(each.orderId === orderId){
              each.deliveryStatus = orderStatus;
            }
          }
        }
      }
    )
  }


  home() {
    this.router.navigate(['', 'users', this.userId, 'books', 'list'])
  }
}
