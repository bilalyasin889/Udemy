import {Component} from '@angular/core';
import {CategoryService} from "shared/services/category.service";
import {ProductService} from "shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import { take } from 'rxjs/operators';
import {Product} from "shared/models/product";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  categories$;
  product: Product;
  id: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    this.product = new Product();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).pipe(take(1))
      .subscribe(p => this.product = p as Product);
  }

  save(product: Product) {
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
