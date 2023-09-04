import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  template: `

   <header style="display: flex; justify-content: space-around;">
    <h1>{{'Welcome to BookStore' | translate}}</h1>

    <div>
      <select (change)="changeLanguage($event)">
        <option value="en">{{ 'english' | translate }}</option>
        <option value="fr">{{ 'አማርኛ' | translate }}</option>
      </select>
    </div>
    
  </header>
  <main>
    <section class="hero">
      <div class="hero-text">
        <h2>{{'Discover Your Next Adventure'| translate}}</h2>
        <p>{{'Explore a wide range of books and find your next favorite read.'| translate}}</p>
        <a [routerLink]="['', 'users', 'login']" class="cta-btn">View Books</a>
      </div>
    </section>
    <section class="book-list">
      <h2>{{'Featured Books'| translate}}</h2>
    </section>
    <section class="login-signup">
      <a [routerLink]="['', 'users', 'login']" class="login-btn">Login</a>
      <a [routerLink]="['', 'users', 'signup']" class="signup-btn">Sign Up</a>
    </section>
  </main>
  <footer>
    <p>&copy; 2023 BookStore. All rights reserved.</p>
    contact us: <a href="https://gemechutiko.netlify.app">gemechutiko.netlify.app</a> 
  </footer>

  `,
  styles: [
  ]
})
export class HomeComponent {

    // language
    translateService = inject(TranslateService);

    changeLanguage(event: any) {
      const selectedLanguage = event.target.value;
      this.translateService.use(selectedLanguage);
    }

}
