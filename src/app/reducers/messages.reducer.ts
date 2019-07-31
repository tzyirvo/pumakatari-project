import * as message from "../actions/message.action";

export interface State {
  showSuccessMessage: boolean;
  successMessage: string;
  showErrorMessage: boolean;
  errorMessage: string;
}

const initialState: State = {
  showSuccessMessage: false,
  successMessage: "",
  showErrorMessage: false,
  errorMessage: ""
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case message.ActionTypes.SHOW_SUCCESS_MESSAGE:
      return {
        showSuccessMessage: true,
        successMessage: action.payload,
        showErrorMessage: false,
        errorMessage: ""
      };
    case message.ActionTypes.SHOW_ERROR_MESSAGE:
      return {
        showSuccessMessage: false,
        successMessage: "",
        showErrorMessage: true,
        errorMessage: action.payload
      };
    case message.ActionTypes.HIDE_ERROR_MESSAGE:
    case message.ActionTypes.HIDE_SUCCESS_MESSAGE:
      return {
        showSuccessMessage: false,
        successMessage: "",
        showErrorMessage: false,
        errorMessage: ""
      };
    default:
      return state;
  }
}

export const showSuccessMessage = (state: State) => state.showSuccessMessage;
export const showErrorMessage = (state: State) => state.showErrorMessage;
export const getSuccessMessage = (state: State) => state.successMessage;
export const getErrorMessage = (state: State) => state.errorMessage;
