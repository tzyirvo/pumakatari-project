import { Component, OnInit, ElementRef } from '@angular/core';
import {AF} from "../../../../providers/af";
import {Router} from "@angular/router";
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers/';
import * as user from '../../../actions/user.action';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html'
})
export class IniciarSesionComponent implements OnInit {
  public error:any;

  constructor(public afService:AF, private router:Router, private store: Store<fromRoot.State>, private elRef:ElementRef) {
  }

  ngOnInit() {
  }

  registerUser(event, email, password) {
    event.preventDefault();
    this.afService.registerUser(email, password).then(() => {
        alert('user registered')
      })
      .catch((error:any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }

  loginWithEmail(event, email, password) {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.store.dispatch(new user.LogIn(email))
        let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
        classList.add('auth')
        this.router.navigate(['inicio']);
      })
      .catch((error:any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }

}
