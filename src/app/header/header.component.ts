import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = 'Pumakatari';
  @Input() loginText: string = 'Iniciar Sesion';
  @Input() logoutText: string = 'Cerrar Sesion';
  @Input() username: string = 'Admin';

  constructor() { }

  ngOnInit() {
  }

  logout() {
    alert('logout of ' + this.username)
  }

}
