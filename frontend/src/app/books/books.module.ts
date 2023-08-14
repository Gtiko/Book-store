import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './Admin/admin-list.component';
import { AddBookComponent } from './Admin/add-book.component';
import { EditBookComponent } from './Admin/edit-book.component';
import { DetailsComponent } from './details.component';
import { UserListComponent } from './User/user-list.component';
import { FavoritesComponent } from './User/favorites.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './Admin/create-user.component';
import { CartComponent } from './User/cart.component';
import { CardsComponent } from './cards.component';
import { CheckoutComponent } from './User/checkout.component';
import { RatingComponent } from './User/rating.component';
import { AdminCardComponent } from './Admin/admin-card.component';
import { RequestsComponent } from './Admin/requests.component';
import { NotificationComponent } from './User/notification.component';
import { ShipmentCardComponent } from './User/shipment-card.component';
import { OrdersComponent } from './Admin/orders.component';
import { ProfileComponent } from './User/profile.component';
import { EditProfileComponent } from './User/edit-profile.component';
import { CreateAdminComponent } from './Admin/create-admin.component';
import { FooterComponent } from './footer.component';



@NgModule({
  declarations: [
    AdminListComponent,
    AddBookComponent,
    EditBookComponent,
    DetailsComponent,
    UserListComponent,
    FavoritesComponent,
    CreateUserComponent,
    CartComponent,
    CardsComponent,
    CheckoutComponent,
    RatingComponent,
    AdminCardComponent,
    RequestsComponent,
    NotificationComponent,
    ShipmentCardComponent,
    OrdersComponent,
    ProfileComponent,
    EditProfileComponent,
    CreateAdminComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: '', pathMatch: "full" },
      { path: 'list', component: AdminListComponent },
      { path: 'add', component: AddBookComponent },
      { path: ':bookId/edit', component: EditBookComponent },
      { path: 'create', component: CreateUserComponent },
      { path: '', component: UserListComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'cart', component: CartComponent },
      { path: ':bookId/details', component: DetailsComponent },
      { path: 'card', component: CardsComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'editProfile', component: EditProfileComponent },
      { path: 'createAdmin', component: CreateAdminComponent }
    ])

  ]
})
export class BooksModule { }
