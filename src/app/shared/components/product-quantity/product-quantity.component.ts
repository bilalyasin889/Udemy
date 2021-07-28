import {Component, Input} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ShoppingCart} from "../../models/shopping-cart";

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
  @Input('product') product!: any;
  @Input('id') id!: string;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product, this.id);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product, this.id);
  }
}
