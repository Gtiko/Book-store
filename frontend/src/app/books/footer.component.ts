import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
 <footer class="footer" style="margin-top: 15%;">
  <div class="container">
    <div class="footer__content">
      <div class="footer__logo">
      </div>
      <div class="footer__links">
        <ul>
          <li><a [routerLink]="['']">Home</a></li>
          <li><a>About Us</a></li>
          <li><a href="mailto:gemechutiko@gmail.com">Contact</a></li>
        </ul>
      </div>
      <div class="footer__contact">
        <p>Contact Us:</p>
        <p>Email: contact@bookstore.com</p>
        <p>Phone: +1 123-456-7890</p>
      </div>
      <div class="footer__social">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
    <div class="footer__bottom">
      <p>&copy; 2023 Your Bookstore. All rights reserved. | Privacy Policy | Terms of Service</p>
    </div>
  </div>
</footer>

  `,
  styles: [
  ]
})
export class FooterComponent {

}
