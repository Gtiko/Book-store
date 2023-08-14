import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `
<div class="rating">
  <span class="star" [ngClass]="{'filled': rating >= 1}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L15.09 8.5 22 9.27 17 14 18.18 20.5 12 17.5 5.82 20.5 7 14 2 9.27 8.91 8.5 12 2"></path></svg></span>
  <span class="star" [ngClass]="{'filled': rating >= 2}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L15.09 8.5 22 9.27 17 14 18.18 20.5 12 17.5 5.82 20.5 7 14 2 9.27 8.91 8.5 12 2"></path></svg></span>
  <span class="star" [ngClass]="{'filled': rating >= 3}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L15.09 8.5 22 9.27 17 14 18.18 20.5 12 17.5 5.82 20.5 7 14 2 9.27 8.91 8.5 12 2"></path></svg></span>
  <span class="star" [ngClass]="{'filled': rating >= 4}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L15.09 8.5 22 9.27 17 14 18.18 20.5 12 17.5 5.82 20.5 7 14 2 9.27 8.91 8.5 12 2"></path></svg></span>
  <span class="star" [ngClass]="{'filled': rating === 5}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2 L15.09 8.5 22 9.27 17 14 18.18 20.5 12 17.5 5.82 20.5 7 14 2 9.27 8.91 8.5 12 2"></path></svg></span>
</div>

  `,
  styles: [
  ]
})
export class RatingComponent {
  @Input() rating: number = 0;

}
