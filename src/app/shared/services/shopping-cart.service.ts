import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map, take} from "rxjs/operators";
import {Product} from "../models/product";
import {ShoppingCart} from "../models/shopping-cart";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart():  Promise<Observable<ShoppingCart>> {
    let cartId = await this.getCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map((x: any) => {
          let items = x.payload.exportVal().items;
          return new ShoppingCart(items);
        }));
  }

  async addToCart(product: Product, productId: any){
    this.updateItem(product, productId, 1);
  }

  async removeFromCart(product: Product, productId: any){
    this.updateItem(product, productId, -1);
  }

  async clearCart() {
    let cartId = await this.getCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove().then();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId +
      '/items/' + productId);
  }

  private async getCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key as string);
    return result.key as string;
  }

  private async updateItem(product: Product, productId: any, quantity: number){
    let cartId = await this.getCartId();
    let item = this.getItem(cartId, productId);
    item.snapshotChanges().pipe(take(1)).subscribe( i => {
      let data = i.payload.exportVal();
      let newQuantity = (data && data.quantity || 0) + quantity;

      if(newQuantity === 0) item.remove();
      else item.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: newQuantity
      })
    });
  }

}
