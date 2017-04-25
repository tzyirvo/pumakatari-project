import * as user from '../actions/db.action'
import { FirebaseListObservable } from 'angularfire2';

export interface State {
  routes$: FirebaseListObservable<any>;
  stops$: FirebaseListObservable<any>;
}

const initialState:State = {
  routes$: null,
  stops$: null
};

export function reducer(state = initialState, action:any):State {
  switch (action.type) {
    case user.ActionTypes.LOAD_DB_DATA:
      return {
        routes$: action.payload.routes$,
        stops$: action.payload.stops$
      };
    default:
      return state;
  }
}

export const getRoutes = (state:State) => state.routes$;
export const getStops = (state:State) => state.stops$;
