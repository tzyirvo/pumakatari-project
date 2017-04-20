import { Component, OnInit, ElementRef } from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import * as fromRoot from '../reducers/';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as user from '../actions/user.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public error: any;

  public title: string = 'Pumakatari';
  public loginText: string = 'Iniciar Sesion';
  public logoutText: string = 'Cerrar Sesion';
  public username: Observable<string>;
  public isLoggedIn: Observable<boolean>;
  public isNotLoggedIn: Observable<boolean>;

  constructor(public afService:AF, private router:Router, private store: Store<fromRoot.State>, private elRef:ElementRef) {
    this.username = this.store.select(fromRoot.getUserEmail);
    this.isLoggedIn = this.store.select(fromRoot.isUserLoggedIn);
    this.isNotLoggedIn = this.store.select(fromRoot.isNotUserLoggedIn);
  }

  ngOnInit() {
  }

  logout() {
    this.afService.logout().then(() => {
        let classList = this.elRef.nativeElement.parentElement.parentElement.classList
        classList.remove('auth')
        this.store.dispatch(new user.LogOut())
        this.router.navigate(['inicio']);
      })
      .catch((error:any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });

  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('auth')
  }

}
