import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from "shared/components/product-card/product-card.component";
import {ProductQuantityComponent} from "shared/components/product-quantity/product-quantity.component";
import {AuthService} from "shared/services/auth.service";
import {AuthGuardService} from "shared/services/auth-guard.service";
import {UserService} from "shared/services/user.service";
import {CategoryService} from "shared/services/category.service";
import {ProductService} from "shared/services/product.service";
import {ShoppingCartService} from "shared/services/shopping-cart.service";
import {OrderService} from "shared/services/order.service";
import {OrderDetailsComponent} from "shared/components/order-details/order-details.component";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
