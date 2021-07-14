import { Component, OnInit } from '@angular/core';
import { AuthoursService } from './authours.service';

@Component({
  selector: 'authours',
  templateUrl: './authours.component.html',
  styleUrls: ['./authours.component.css']
})
export class AuthoursComponent implements OnInit {
  authours;

  constructor(service: AuthoursService) {
    this.authours = service.getAuthours();
   }

  ngOnInit(): void {
  }

}
