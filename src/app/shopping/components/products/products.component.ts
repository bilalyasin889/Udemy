import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "shared/services/product.service";
import {switchMap} from "rxjs/operators";
import {ShoppingCartService} from "shared/services/shopping-cart.service";
import {Observable} from "rxjs";
import {ShoppingCart} from "shared/models/shopping-cart";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  category: any;
  products: any[] = [];
  filteredProducts: any[] = [];
  cart$!: Observable<ShoppingCart>;

  constructor( private route: ActivatedRoute,
               private productService: ProductService,
               private cartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    }))
      .subscribe((params: any) => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }
  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter( p => p.data.category === this.category) :
      this.products;
  }

}
