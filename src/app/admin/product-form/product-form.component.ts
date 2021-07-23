import {Component} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import { take } from 'rxjs/operators';
import {ShopProduct} from "../../models/shop-product";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  categories$;
  product: any;
  id: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    this.product = new ShopProduct();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).pipe(take(1))
      .subscribe(p => this.product = p);
  }

  save(product: any) {
    if(this.id) this.productService.update(this.id, product).then();
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Confirm Delete')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']).then();
    }
  }
}
