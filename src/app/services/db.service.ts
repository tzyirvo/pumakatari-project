import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class DbService {

  constructor(public af: AngularFire) { }

  getRoutesList(): FirebaseListObservable<any> {
    return this.af.database.list(`rutas`)
  }

  getStopsList(): FirebaseListObservable<any> {
    return this.af.database.list(`paradas`)
  }

  getRoute(routeKey: string): FirebaseObjectObservable<any> {
    return this.af.database.object(`rutas/${routeKey}`)
  }

  getStop(stopKey: string): FirebaseObjectObservable<any> {
    return this.af.database.object(`paradas/${stopKey}`)
  }

}
