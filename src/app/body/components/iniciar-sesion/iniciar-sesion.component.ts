import { Component, OnInit, ElementRef } from '@angular/core';
import {AF} from "../../../../providers/af";
import {Router} from "@angular/router";
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers/';
import * as user from '../../../actions/user.action';
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html'
})
export class IniciarSesionComponent implements OnInit {
  public error:any;

  constructor(private msgService:MessageService, public afService:AF, private router:Router, private store:Store<fromRoot.State>, private elRef:ElementRef) {
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
          console.error(this.error);
        }
      });
  }

  loginWithEmail(event, email, password) {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
        this.msgService.showSuccessMessage('Inicio de sesion exitoso')
        this.store.dispatch(new user.LogIn(email))
        let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
        classList.add('auth')
        this.router.navigate(['inicio']);
      })
      .catch((error:any) => {
        if (error) {
          this.error = error;
          console.error(this.error);
          this.msgService.showErrorMessage('Error al iniciar sesion')
        }
      });
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('other-tab')
    classList.add('inicio-tab')
  }

}
