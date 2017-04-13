import { Component, OnInit } from '@angular/core';
import {AF} from "../../../../providers/af";
import {Router} from "@angular/router";

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {
  public error: any;

  constructor(public afService:AF, private router:Router) {
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
