import {NgModule} from '@angular/core';
import {BootNavbarComponent} from "./components/boot-navbar/boot-navbar.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "shared/shared.module";


@NgModule({
  declarations: [
    BootNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  exports: [
    BootNavbarComponent
  ]
})
export class CoreModule { }
