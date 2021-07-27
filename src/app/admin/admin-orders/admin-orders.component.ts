import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderService} from "../../services/order.service";
import {Subscription} from "rxjs";
import {TableView} from "../../models/tableView";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit, OnDestroy, AfterViewInit {
  tableView!: TableView;
  subscription!: Subscription;
  displayedColumns = ['customer', 'date', 'view'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.tableView = new TableView(this.displayedColumns);
    this.subscription = this.orderService.getAll()
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
