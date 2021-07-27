import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderService} from "../services/order.service";
import {AuthService} from "../services/auth.service";
import {TableView} from "../models/tableView";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, OnDestroy, AfterViewInit {
  userId: any;
  tableView!: TableView;
  subscription!: Subscription;
  displayedColumns = ['customer', 'date', 'view'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authService: AuthService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.tableView = new TableView(this.displayedColumns);
    this.userId = this.authService.userId;
    this.subscription = this.orderService.getByUser(this.userId)
      .subscribe(orders => {
        this.tableView.init(orders, this.sort);
      });
  }

  ngAfterViewInit() {
    this.tableView.afterViewInit(this.paginator);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
