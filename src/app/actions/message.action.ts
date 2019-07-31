import { Action } from "@ngrx/store";
import { actionType } from "../util/action-type";

export const ActionTypes = {
  SHOW_SUCCESS_MESSAGE: actionType("[Message] Show success message"),
  SHOW_ERROR_MESSAGE: actionType("[Message] Show error message"),
  HIDE_ERROR_MESSAGE: actionType("[Message] Hide error message"),
  HIDE_SUCCESS_MESSAGE: actionType("[Message] Hide success Message")
};

export class ShowSuccessMessage implements Action {
  type = ActionTypes.SHOW_SUCCESS_MESSAGE;

  constructor(public payload: string) {}
}

export class ShowErrorMessage implements Action {
  type = ActionTypes.SHOW_ERROR_MESSAGE;

  constructor(public payload: string) {}
}

export class HideErrorMessage implements Action {
  type = ActionTypes.HIDE_ERROR_MESSAGE;

  constructor() {}
}

export class HideSuccessMessage implements Action {
  type = ActionTypes.HIDE_SUCCESS_MESSAGE;

  constructor() {}
}
