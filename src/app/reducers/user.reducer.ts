import * as user from "../actions/user.action";

export interface State {
  isUserLoggedIn: boolean;
  isNotUserLoggedIn: boolean;
  email: string;
}

const initialState: State = {
  isUserLoggedIn: false,
  isNotUserLoggedIn: true,
  email: ""
};

// @TODO: Hardcoding this only for testing purposes, this needs to be reverted
//const initialState:State = {
//  isUserLoggedIn: true,
//  isNotUserLoggedIn: false,
//  email: 'only-for-testing@admin.com'
//};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case user.ActionTypes.LOG_IN:
      return {
        isUserLoggedIn: true,
        isNotUserLoggedIn: false,
        email: action.payload
      };
    case user.ActionTypes.LOG_OUT:
      return {
        isUserLoggedIn: false,
        isNotUserLoggedIn: true,
        email: ""
      };
    default:
      return state;
  }
}

export const isUserLoggedIn = (state: State) => state.isUserLoggedIn;
export const isNotUserLoggedIn = (state: State) => state.isNotUserLoggedIn;
export const getUserEmail = (state: State) => state.email;
