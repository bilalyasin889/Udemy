import {NgModule} from '@angular/core';
import {AdminProductsComponent} from "./components/admin-products/admin-products.component";
import {AdminOrdersComponent} from "./components/admin-orders/admin-orders.component";
import {OrderDetailsComponent} from "shared/components/order-details/order-details.component";
import {ProductFormComponent} from "./components/product-form/product-form.component";
import {AdminAuthGuardService} from "./services/admin-auth-guard.service";
import {SharedModule} from "shared/shared.module";
import {RouterModule} from "@angular/router";
import {AuthGuardService} from "shared/services/auth-guard.service";


@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/product-form/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/product-form',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/orders/:id',
        component: OrderDetailsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
    ])
  ],
  providers: [
    AdminAuthGuardService
  ]
})
export class AdminModule { }
