import { Component } from '@angular/core';
import { DbService } from './services/db.service'
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers/';
import * as db from './actions/db.action';
import {LatLng} from "./models/latlng";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private dbService:DbService, private store:Store<fromRoot.State>) {
  }

  ngOnInit() {
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
    console.log('code:' + error.code + '\n' + 'message: ' + error.message + '\n');
  }
}
