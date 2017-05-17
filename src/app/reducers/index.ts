import { ActionReducer, combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as userReducer from './user.reducer'
import * as dbReducer from './db.reducer'
import * as messagesReducer from './messages.reducer'

export interface State {
  user: userReducer.State;
  db: dbReducer.State;
  messages: messagesReducer.State;
}

const reducers = {
  user: userReducer.reducer,
  db: dbReducer.reducer,
  messages: messagesReducer.reducer
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

export const getMessagesState = (state:State) => state.messages

export const showSuccessMessage = createSelector(getMessagesState, messagesReducer.showSuccessMessage)
export const showErrorMessage = createSelector(getMessagesState, messagesReducer.showErrorMessage)
export const getSuccessMessage = createSelector(getMessagesState, messagesReducer.getSuccessMessage)
export const getErrorMessage = createSelector(getMessagesState, messagesReducer.getErrorMessage)
