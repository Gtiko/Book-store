import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ILogin, INITIAL_STATE_VALUE, IResponse, ISingUp, IState } from '../bookStore.interface';
import { environment as env } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  state = signal<IState>(INITIAL_STATE_VALUE);

  login(loginData: ILogin) {
    return this.http.post<IResponse>(env.SERVER_URL + 'users/login/', loginData);
  }

  signup(signupData: ISingUp) {
    return this.http.post<IResponse>(env.SERVER_URL + 'users/signup', signupData)
  }
}
