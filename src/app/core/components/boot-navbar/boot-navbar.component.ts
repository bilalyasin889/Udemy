import {Component, OnInit} from '@angular/core';
import {AuthService} from "shared/services/auth.service";
import {ShoppingCartService} from "shared/services/shopping-cart.service";
import {Observable} from "rxjs";
import {ShoppingCart} from "shared/models/shopping-cart";
import {AppUser} from "shared/models/app-user";

@Component({
  selector: 'boot-navbar',
  templateUrl: './boot-navbar.component.html',
  styleUrls: ['./boot-navbar.component.scss']
})
export class BootNavbarComponent implements OnInit {
  collapsed = true;
  appUser!: AppUser;
  cart$!: Observable<ShoppingCart>;

  constructor(private authService: AuthService,
              private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

  logout() { this.authService.LogoutUser() }

}
