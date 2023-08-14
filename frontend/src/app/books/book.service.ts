import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment as env } from '../../environments/environment'
import { IBooks, IBookAttributes, IBookResponse, IResponse, IBook, IUserResponse, IAllUsersResponse } from '../bookStore.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http = inject(HttpClient);

  cart = signal<number>(0);

  addBook(newBook: any) {
    return this.http.post<IResponse>(env.SERVER_URL + 'books/add', newBook)
  }

  getBooks() {
    return this.http.get<IBooks>(env.SERVER_URL + 'books/')
  }

  getBookByBookId(bookId: string) {
    return this.http.get<IBook>(env.SERVER_URL + `books/${bookId}`)
  }

  addToFavorites(userId: string, bookId: string) {
    return this.http.post<IResponse>(env.SERVER_URL + `users/${userId}/addToFavorites`, { bookId: bookId });
  }

  addToCart(userId: string, bookId: string) {
    return this.http.post<IResponse>(env.SERVER_URL + `users/${userId}/addToCart`, { bookId: bookId });
  }

  removeFromCart(userId: string, bookId: string) {
    return this.http.patch<IResponse>(env.SERVER_URL + `users/${userId}/removeFromCart`, { bookId: bookId })
  }

  getUserById(userId: string) {
    return this.http.get<IUserResponse>(env.SERVER_URL + `users/${userId}`)
  }

  getBookById(bookId: string) {
    return this.http.get<IBook>(env.SERVER_URL + `books/${bookId}`)
  }

  sendCheckoutStatus(userId: string, cart: any) {
    return this.http.post<IResponse>(env.SERVER_URL + `users/${userId}/checkout`, cart)
  }

  updateRating(bookId: string, rate: number){
    return this.http.patch<IResponse>(env.SERVER_URL + `books/${bookId}/updateRating`, {rate: rate});
  }

  removerDeliveredBook(userId: string, orderId: string){
    return this.http.delete<IResponse>(env.SERVER_URL + `users/${userId}/removerDelivered/${orderId}`)
  }

  editProfile(userId: string, updatedProfile:any){
    return this.http.post<IResponse>(env.SERVER_URL + `users/${userId}/editProfile`, updatedProfile);
  }

  deleteUser(userId: string ){
    return this.http.delete<IResponse>(env.SERVER_URL + `users/${userId}/deleteUser`)
  }

  getPicture(file_name: string) {
    return this.http.get(env.SERVER_URL + `pic/${file_name}`);
  }

  makePayment(amount:number){
    return this.http.post(env.SERVER_URL + `create-payment-intent`, {amount: amount})
  }

  // admin access

  updateBook(bookId: string, updatedBook: IBookAttributes) {
    return this.http.patch<IResponse>(env.SERVER_URL + `books/${bookId}/update`, updatedBook)
  }

  deleteBook(bookId: string) {
    return this.http.delete<IResponse>(env.SERVER_URL + `books/${bookId}/delete`);
  }

  ApproveCheckoutRequest(userId: string, ISBN: string) {
    return this.http.patch<IResponse>(env.SERVER_URL + 'users/approveRequest', { userId: userId, ISBN: ISBN })
  }

  updateDelivery(userId: string, orderId: string, status: string) {
    return this.http.patch<IResponse>(env.SERVER_URL + `users/${userId}/updateDelivery/${orderId}`, { status: status });
  }

  getAllUsers() {
    return this.http.get<IAllUsersResponse>(env.SERVER_URL + 'users');
  }

  createAdmin(createAdminData: any){
    return this.http.post<IResponse>(env.SERVER_URL + `users/createUser`, createAdminData);
  }
  

}
