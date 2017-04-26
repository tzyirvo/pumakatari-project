import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class DbService {

  private db: any

  constructor(public af: AngularFire) {
    this.db = af.database
  }

  getRoutesList(): FirebaseListObservable<any> {
    return this.db.list(`rutas`)
  }

  getStopsList(): FirebaseListObservable<any> {
    return this.db.list(`paradas`)
  }

  getRoute(routeKey: string): FirebaseObjectObservable<any> {
    return this.db.object(`rutas/${routeKey}`)
  }

  getStop(stopKey: string): FirebaseObjectObservable<any> {
    return this.db.object(`paradas/${stopKey}`)
  }

  getPersonnelList(): FirebaseListObservable<any> {
    return this.db.list(`personal`)
  }

  getPersonnel(personnelKey: string): FirebaseObjectObservable<any> {
    return this.db.object(`personal/${personnelKey}`)
  }

  getBusesList(): FirebaseListObservable<any> {
    return this.db.list(`buses`)
  }

  getBus(busKey: string): FirebaseObjectObservable<any> {
    return this.db.object(`buses/${busKey}`)
  }

  getBusesPerRoute(route: string): FirebaseListObservable<any> {
    return this.db.list(`buses`, {
      query: {
        orderByChild: 'ruta',
        equalTo: route
      }
    })
  }

  getBusPosition(plateKey: string): FirebaseObjectObservable<any> {
    return this.db.object(`buses/${plateKey}/posicion`)
  }

}
