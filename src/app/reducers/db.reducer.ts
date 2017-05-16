import * as user from '../actions/db.action'
import { FirebaseListObservable } from 'angularfire2';
import { LatLng } from '../models/latlng'

export interface State {
  routes$: FirebaseListObservable<any>;
  stops$: FirebaseListObservable<any>;
  currentLocation: LatLng;
}

const initialState:State = {
  routes$: null,
  stops$: null,
  currentLocation: null
};

export function reducer(state = initialState, action:any):State {
  switch (action.type) {
    case user.ActionTypes.LOAD_DB_ROUTES:
      return Object.assign({}, state, {routes$: action.payload});
    case user.ActionTypes.LOAD_DB_STOPS:
      return Object.assign({}, state, {stops$: action.payload});
    case user.ActionTypes.LOAD_CUR_LAT_LNG:
      return Object.assign({}, state, {currentLocation: action.payload});
    default:
      return state;
  }
}

export const getRoutes = (state:State) => state.routes$;
export const getStops = (state:State) => state.stops$;
export const getCurrentLocation = (state:State) => state.currentLocation;
