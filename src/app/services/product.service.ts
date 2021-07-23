import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
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

  update(productId: any, product: any) {
    return this.db.object('/products/' + productId).update(product)
  }

  documentToDomainObject = (c: any) => {
    const data = c.payload.exportVal();
    const id = c.key;
    return {id, data};
  }

  delete(productId: any) {
    this.db.object('/products/' + productId).remove();
  }
}
