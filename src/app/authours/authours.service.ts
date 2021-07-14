import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthoursService {

  getAuthours(){
    return ["author1", "author2", "author3"];
  }
}
