import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {environment} from "../environments/environment";

import {AngularFireModule} from "@angular/fire";
import {RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {LoginComponent} from './core/components/login/login.component';
import {SharedModule} from "shared/shared.module";
import {AdminModule} from "./admin/admin.module";
import {ShoppingModule} from "./shopping/shopping.module";
import {CoreModule} from "./core/core.module";
import {ProductsComponent} from "./shopping/components/products/products.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: '', component: ProductsComponent},
    ]),
    AngularFireModule.initializeApp(environment.firebase, 'oshop')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
