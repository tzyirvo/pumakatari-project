import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/';
import * as db from '../actions/db.action';
import {Observable} from 'rxjs/Observable';
import {LatLng} from "../models/latlng";

@Injectable()
export class DbService {

  private db:any

  constructor(private af:AngularFire, private store:Store<fromRoot.State>) {
    this.db = af.database
  }

  getRoutesList():Observable<FirebaseListObservable<any>> {
    return this.store.select(fromRoot.getRoutes)
  }

  loadRoutesList():FirebaseListObservable<any> {
    let routes$ = this.loadRoutesListFromDb()
    routes$.subscribe(() => {
      this.store.dispatch(new db.LoadDbRoutes(routes$ as FirebaseListObservable<any>))
    })
    return routes$
  }

  private loadRoutesListFromDb():FirebaseListObservable<any> {
    return this.db.list(`rutas`)
  }

  getStopsList():Observable<FirebaseListObservable<any>> {
    return this.store.select(fromRoot.getStops)
  }

  loadStopsList():FirebaseListObservable<any> {
    let stops$ = this.loadStopsListFromDb()
    stops$.subscribe(() => {
      this.store.dispatch(new db.LoadDbStops(stops$ as FirebaseListObservable<any>))
    })
    return stops$
  }

  private loadStopsListFromDb():FirebaseListObservable<any> {
    return this.db.list(`paradas`)
  }

  getRoute(routeKey:string):FirebaseObjectObservable<any> {
    return this.db.object(`rutas/${routeKey}`)
  }

  getStop(stopKey:string):FirebaseObjectObservable<any> {
    return this.db.object(`paradas/${stopKey}`)
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

  getCurLocation():Observable<LatLng> {
    return this.store.select(fromRoot.getCurrentLocation)
  }

  loadCurLocation():any {
    let me = this
    navigator.geolocation.getCurrentPosition(
      me.onMapWatchSuccess.bind(me),
      me.onMapError.bind(me),
      {enableHighAccuracy: true}
    );
  }

  onMapWatchSuccess(position) {
    this.store.dispatch(new db.loadCurLatLng(new LatLng(position.coords.latitude, position.coords.longitude)))
  }

  onMapError(error) {
    console.error('code:' + error.code + '\n' + 'message: ' + error.message + '\n');
  }

}
