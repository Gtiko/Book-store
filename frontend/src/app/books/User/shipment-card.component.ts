import { Component, Input, inject } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipment-card',
  template: `
  <h1 style="color: green;">{{message}}</h1>
    <main *ngIf="exist">
      <div class="shipment-card">
        <div class="shipment-status">Order Shipped</div>
        <div class="shipment-details">
          <span class="shipment-label">Order:</span>
          <span class="shipment-value">{{ userOrder.title }} </span>
        </div>
        <div class="shipment-details">
          <span class="shipment-label">Estimated Delivery:</span>
          <span class="shipment-value">{{ shippingDate() }}</span>
        </div>
        <div class="shipment-details">
          <span class="shipment-label">Shipping Carrier:</span>
          <span class="shipment-value">FedEx</span>
        </div>
        <div class="shipment-details">
          <span class="shipment-label">Status:</span>

          <span class="shipment-value" *ngIf="order.deliveryStatus !='Delivered' else delivered" >
            {{ order.deliveryStatus }}</span>

          <ng-template #delivered>
            {{ order.deliveryStatus }}  
            
            <div>
                <div class="rating">
                <span class="star" (click)="setRating(1, order.bookId, order.orderId)" [class.selected]="rating >= 1">&#9733;</span>
                <span class="star" (click)="setRating(2, order.bookId, order.orderId)" [class.selected]="rating >= 2">&#9733;</span>
                <span class="star" (click)="setRating(3, order.bookId, order.orderId)" [class.selected]="rating >= 3">&#9733;</span>
                <span class="star" (click)="setRating(4, order.bookId, order.orderId)" [class.selected]="rating >= 4">&#9733;</span>
                <span class="star" (click)="setRating(5, order.bookId, order.orderId)" [class.selected]="rating === 5">&#9733;</span>
              </div>
              <p class="rating-result">Rating: {{ rating }}</p>
            </div>


          </ng-template>

        </div>
      </div>
  </main> 
  `,
  styles: [
    `
    /* .rating {
      font-size: 24px;
      cursor: pointer;
    }
    .star {
      color: gray;
    }
    .selected {
      color: gold;
    } */
    `
  ]
})
export class ShipmentCardComponent {
  private bookService = inject(BookService);
  private activatedRouter = inject(ActivatedRoute);

  userId: string = this.activatedRouter.snapshot.paramMap.get('userId') as string;

  @Input() order: any;

  exist:boolean = false;
  userOrder: any ;
  message: string = "";

  rating: number = 0;

  shippingDate() {
    const today = new Date();
    today.setDate(today.getDate() + 3);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  ngOnInit() {
    this.bookService.getBookByBookId(this.order.bookId).subscribe(
      response =>{
        if(response.success){
          this.userOrder = response.data;
          this.exist = true;
        }
      }
    )
    // console.log(this.order);
  }

  
  setRating(value: number, bookId: string, orderId:string): void {
    this.rating = value;
    this.bookService.updateRating(bookId, value).subscribe(
      response=>{
        if(response.success){
          this.bookService.removerDeliveredBook(this.userId, orderId).subscribe(
            rest =>{
              if(rest.success){
                this.order.deliveryStatus = "delivered";
                this.message = "Thanks for rating!"
                setTimeout(()=>{
                  this.message = ""
                },2000)
              }
            }
          );
        }
      }
    );
  }

}
