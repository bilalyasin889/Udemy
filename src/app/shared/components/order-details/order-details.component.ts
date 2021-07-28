import { Component, OnInit } from '@angular/core';
import {OrderService} from "shared/services/order.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'admin-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  id: any;
  order$: Observable<any>;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.order$ = orderService.get(this.id);
  }

  ngOnInit(): void {
  }

}
