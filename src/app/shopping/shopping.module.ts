import {NgModule} from '@angular/core';
import {CheckOutComponent} from "./components/check-out/check-out.component";
import {MyOrdersComponent} from "./components/my-orders/my-orders.component";
import {OrderSuccessComponent} from "./components/order-success/order-success.component";
import {ProductFilterComponent} from "./components/product-filter/product-filter.component";
import {ProductsComponent} from "./components/products/products.component";
import {ShippingFormComponent} from "./components/shipping-form/shipping-form.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {ShoppingCartSummaryComponent} from "./components/shopping-cart-summary/shopping-cart-summary.component";
import {RouterModule} from "@angular/router";
import {AuthGuardService} from "shared/services/auth-guard.service";
import {SharedModule} from "shared/shared.module";
import {OrderDetailsComponent} from "shared/components/order-details/order-details.component";


@NgModule({
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductFilterComponent,
    ProductsComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuardService]},
      {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
      {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},

      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent}
    ])
  ],
  exports: [
    ProductsComponent
  ]
})
export class ShoppingModule { }
