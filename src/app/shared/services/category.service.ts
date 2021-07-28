import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<any> {
    return this.db.list('/categories',
        ref => ref.orderByChild('name'))
      .snapshotChanges().pipe(map(actions => actions.map(this.documentToDomainObject)));
  }

  documentToDomainObject = (c: any) => {
    const data = c.payload.exportVal();
    const id = c.key;
    return {id, data};
  }
}
