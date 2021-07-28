import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products')
      .snapshotChanges()
      .pipe(map(actions => actions.
      map(this.documentToDomainObject)));
  }

  get(productId: any) {
    return this.db.object('/products/' + productId)
      .valueChanges();
  }

  update(productId: any, product: Product) {
    return this.db.object('/products/' + productId).update(product)
  }

  private documentToDomainObject = (c: any) => {
    const data = c.payload.exportVal();
    const id = c.key;
    return {id, data};
  }

  delete(productId: any) {
    this.db.object('/products/' + productId).remove();
  }
}
