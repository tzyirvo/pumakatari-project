import { Action } from '@ngrx/store';
import { actionType } from '../util/action-type';
import {LatLng} from "../models/latlng";
import { FirebaseListObservable } from 'angularfire2';

export const ActionTypes = {
  LOAD_DB_ROUTES: actionType('[Db] Load db data: ROUTES'),
  LOAD_DB_STOPS: actionType('[Db] Load db data: STOPS'),
  LOAD_CUR_LAT_LNG: actionType('[Loc] Load current LatLng')
};

export class LoadDbRoutes implements Action {
  type = ActionTypes.LOAD_DB_ROUTES;

  constructor(public payload:FirebaseListObservable<any>) {
  }
}

export class LoadDbStops implements Action {
  type = ActionTypes.LOAD_DB_STOPS;

  constructor(public payload:FirebaseListObservable<any>) {
  }
}

export class loadCurLatLng implements Action {
  type = ActionTypes.LOAD_CUR_LAT_LNG;

  constructor(public payload:LatLng) {
  }
}
