import {Component, Input, OnInit} from '@angular/core';
import {Order} from "shared/models/order";
import {Router} from "@angular/router";
import {OrderService} from "shared/services/order.service";
import {ShoppingCart} from "shared/models/shopping-cart";
import {AuthService} from "shared/services/auth.service";
import {Shipping} from "shared/models/shipping";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart!: ShoppingCart;
  shipping = new Shipping();
  userId!: any;

  constructor(private router: Router,
              private authService: AuthService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.userId = this.authService.userId;
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
