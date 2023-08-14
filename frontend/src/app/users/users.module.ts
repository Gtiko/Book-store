import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { checkTokenGuard } from '../auth/check-token.guard'

import { LoginComponent } from './login.component';
import { SignUpComponent } from './sign-up.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild([
      { path: '', redirectTo: 'login', pathMatch: "full" },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      {
        path: ':userId/books', loadChildren: () => import('../books/books.module').then(module => module.BooksModule),
        canActivate: [checkTokenGuard]
      }
    ])
  ]
})
export class UsersModule { }
