import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {AF} from "../../../../providers/af";

@Component({
  selector: 'app-rutas-eliminar',
  templateUrl: './rutas-eliminar.component.html'
})
export class RutasEliminarComponent implements OnInit {

  routes$: FirebaseListObservable<any[]>
  routeToDeleteKey: string = ''

  constructor(public af: AngularFire, public afService:AF) {
    this.routes$ = af.database.list(`rutas`)
  }

  ngOnInit() {
  }

  setRouteToDeleteKey(routeToDeleteKey) {
    this.routeToDeleteKey = routeToDeleteKey
  }

  deleteRoute() {
    if (this.routeToDeleteKey !== '') {
      this.afService.deleteRoute(this.routeToDeleteKey)
    }
  }

}
