import {Component, Input} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Product} from "shared/models/product";
import {ShoppingCart} from "../../models/shopping-cart";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  {
  @Input('product') product!: Product;
  @Input('id') id!: string;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product, this.id);
  }
}
