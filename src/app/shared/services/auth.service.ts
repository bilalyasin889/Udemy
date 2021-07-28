import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import {Observable, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  userId!: any

  constructor(
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.user$ = afAuth.authState;
  }

  LoginUser() {
    let returnUrl  = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then();
  }

  LogoutUser() {
    this.afAuth.signOut().then();
  }

  get appUser$(): Observable<any>  {
    return this.user$
      .pipe(switchMap(user => {
        if (user) {
          this.userId = user.uid;
          return this.userService.get(user.uid);
        }
        else return of(null);
      }))
  }
}
