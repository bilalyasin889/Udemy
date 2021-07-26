import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Observable} from "rxjs";
import {ShoppingCart} from "../models/shopping-cart";
import {AppUser} from "../models/app-user";

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
