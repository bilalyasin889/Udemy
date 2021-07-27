import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../models/order";
import {Router} from "@angular/router";
import {OrderService} from "../services/order.service";
import {ShoppingCart} from "../models/shopping-cart";
import {AuthService} from "../services/auth.service";
import {Shipping} from "../models/shipping";

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
