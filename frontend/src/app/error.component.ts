import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <h1 [ngStyle]="{color:'red'}">
     404 page not found
    </h1>
  `,
  styles: [
  ]
})
export class ErrorComponent {

}
