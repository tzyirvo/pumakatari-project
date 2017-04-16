import { ActionReducer, combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as userReducer from './user.reducer'

export interface State {
  user: userReducer.State;
}

const reducers = {
  user: userReducer.reducer
};

export function reducer (state: any, action: any) {
  return combineReducers(reducers)(state, action);
}

export const getUserState = (state: State) => state.user;

export const isUserLoggedIn = createSelector(getUserState, userReducer.isUserLoggedIn);
export const isNotUserLoggedIn = createSelector(getUserState, userReducer.isNotUserLoggedIn);
export const getUserEmail = createSelector(getUserState, userReducer.getUserEmail);
