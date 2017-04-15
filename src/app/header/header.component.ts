import { Component, OnInit, Input } from '@angular/core';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public error: any;

  public title: string = 'Pumakatari';
  public loginText: string = 'Iniciar Sesion';
  public logoutText: string = 'Cerrar Sesion';
  public username: string = 'Admin';
  @Input() isLoggedIn: boolean = false;

  constructor(public afService:AF, private router:Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.afService.logout().then(() => {
        console.log('Logout of ' + this.username)
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
