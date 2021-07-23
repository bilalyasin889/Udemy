import { Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  category: any;
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor( route: ActivatedRoute,
               private productService: ProductService) {
    productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    }))
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter( p => p.data.category === this.category) :
          this.products;
      });
  }
}
