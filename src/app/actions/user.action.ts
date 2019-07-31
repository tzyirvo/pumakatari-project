import { Action } from "@ngrx/store";
import { actionType } from "../util/action-type";

export const ActionTypes = {
  LOG_IN: actionType("[User] Log in"),
  LOG_OUT: actionType("[User] Log out")
};

export class LogIn implements Action {
  type = ActionTypes.LOG_IN;
  constructor(public payload: string) {}
}

export class LogOut implements Action {
  type = ActionTypes.LOG_OUT;
  constructor() {}
}
