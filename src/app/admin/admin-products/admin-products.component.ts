import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  products: any[] = [];
  subscription: Subscription;
  displayedColumns = ['position', 'title', 'price' , 'edit'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(p => {
        this.dataSource.data = this.products = p;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (prod: any, filter: string) => {
      return !filter || prod.data.title.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        default: return item.data[property];
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();
  }

}
