import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/';
import * as db from '../actions/db.action';

@Injectable()
export class DbService {

  private db:any

  constructor(private af:AngularFire, private store:Store<fromRoot.State>) {
    this.db = af.database
  }

  getRoutesList() {
    return this.store.select(fromRoot.getRoutes)
  }

  loadRoutesList() {
    let routes$ = this.loadRoutesListFromDb()
    routes$.subscribe(() => {
      this.store.dispatch(new db.LoadDbRoutes(routes$ as FirebaseListObservable<any>))
    })
    return routes$
  }

  getStopsList() {
    return this.store.select(fromRoot.getStops)
  }

  loadStopsList() {
    let stops$ = this.loadStopsListFromDb()
    stops$.subscribe(() => {
      this.store.dispatch(new db.LoadDbStops(stops$ as FirebaseListObservable<any>))
    })
    return stops$
  }

  private loadRoutesListFromDb() {
    return this.db.list(`rutas`)
  }

  private loadStopsListFromDb() {
    return this.db.list(`paradas`)
  }

  getRoute(routeKey:string):FirebaseObjectObservable<any> {
    return this.db.object(`rutas/${routeKey}`)
  }

  getStop(stopKey:string):FirebaseObjectObservable<any> {
    return this.db.object(`paradas/${stopKey}`)
  }

  getPersonnelList():FirebaseListObservable<any> {
    return this.db.list(`personal`)
  }

  getPersonnel(personnelKey:string):FirebaseObjectObservable<any> {
    return this.db.object(`personal/${personnelKey}`)
  }

  getBusesList():FirebaseListObservable<any> {
    return this.db.list(`buses`)
  }

  getBus(busKey:string):FirebaseObjectObservable<any> {
    return this.db.object(`buses/${busKey}`)
  }

  getBusesPerRoute(route:string):FirebaseListObservable<any> {
    return this.db.list(`buses`, {
      query: {
        orderByChild: 'ruta',
        equalTo: route
      }
    })
  }

  getBusPosition(plateKey:string):FirebaseObjectObservable<any> {
    return this.db.object(`buses/${plateKey}/posicion`)
  }

}
