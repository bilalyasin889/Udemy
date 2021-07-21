import { Component } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'boot-navbar',
  templateUrl: './boot-navbar.component.html',
  styleUrls: ['./boot-navbar.component.scss']
})
export class BootNavbarComponent {
  collapsed = true;
  appUser: any;

  constructor(private authService: AuthService) {
    authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() { this.authService.LogoutUser() }

}
