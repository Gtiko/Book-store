import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `

    <router-outlet>

    <!-- <div>
      <label>{{ 'language' | translate }}:</label>
      <select (change)="changeLanguage($event)">
        <option value="en">{{ 'english' | translate }}</option>
        <option value="fr">{{ 'french' | translate }}</option>
      </select>
    </div> -->

  `,
  styles: []
})
export class AppComponent {
  title = 'bookstore';

  // translateService = inject(TranslateService);

  // changeLanguage(event: any) {
  //   const selectedLanguage = event.target.value;
  //   this.translateService.use(selectedLanguage);
  // }
}
