import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ErrorComponent } from './error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpClient, HttpClientModule } from '@angular/common/http';
import { addTokenInterceptor } from './auth/add-token.interceptor';
import { AuthService } from './auth/auth.service';
import { environment as env } from '../environments/environment'
import { IState } from './bookStore.interface';
import jwt_decode from 'jwt-decode'

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import {TranslateLoader, TranslateModule, TranslateStore} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

function bootstrap() {
  const authService = inject(AuthService)
  return () => {
    const state = localStorage.getItem(env.KEY);
    if (state) {
      const decoded_token: IState = jwt_decode(state);
      decoded_token.token = JSON.parse(state);
      authService.state.set(decoded_token);
    }
  }
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 3000, 
      positionClass: 'toast-top-right', 
      preventDuplicates: true,
      closeButton: true
    }),
    BrowserAnimationsModule,

    ReactiveFormsModule,
    TranslateModule.forChild({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', component: HomeComponent },
      { path: 'users', loadChildren: () => import('./users/users.module').then(module => module.UsersModule) },
      { path: "**", component: ErrorComponent }
    ])
  ],
  providers: [
    TranslateStore,
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    { provide: APP_INITIALIZER, multi: true, useFactory: bootstrap, deps: [] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

