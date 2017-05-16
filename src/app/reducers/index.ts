import { ActionReducer, combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as userReducer from './user.reducer'
import * as dbReducer from './db.reducer'

export interface State {
  user: userReducer.State;
  db: dbReducer.State;
}

const reducers = {
  user: userReducer.reducer,
  db: dbReducer.reducer
};

export function reducer(state:any, action:any) {
  return combineReducers(reducers)(state, action);
}

export const getUserState = (state:State) => state.user;

export const isUserLoggedIn = createSelector(getUserState, userReducer.isUserLoggedIn);
export const isNotUserLoggedIn = createSelector(getUserState, userReducer.isNotUserLoggedIn);
export const getUserEmail = createSelector(getUserState, userReducer.getUserEmail);

export const getDbState = (state:State) => state.db;

export const getRoutes = createSelector(getDbState, dbReducer.getRoutes);
export const getStops = createSelector(getDbState, dbReducer.getStops);
export const getCurrentLocation = createSelector(getDbState, dbReducer.getCurrentLocation);
