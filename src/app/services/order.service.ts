import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {ShoppingCartService} from "./shopping-cart.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  getAll() {
    return this.db.list('/orders')
      .snapshotChanges()
      .pipe(map(actions => actions.
      map(this.documentToDomainObject)));
  }

  get(orderId: any) {
    return this.db.object('/orders/' + orderId)
      .valueChanges();
  }

  getByUser(userId: any) {
    return this.db.list('/orders', ref =>
      ref.orderByChild('userId').equalTo(userId)
    ).snapshotChanges()
      .pipe(map(actions => actions.
      map(this.documentToDomainObject)));
  }

  async placeOrder(order: any){
    let result = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  private documentToDomainObject = (c: any) => {
    const data = c.payload.exportVal();
    const id = c.key;
    return {id, data};
  }
}
