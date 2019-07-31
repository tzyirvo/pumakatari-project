import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from "../reducers/";
import * as messageAction from "../actions/message.action";

@Injectable()
export class MessageService {
  constructor(private store: Store<fromRoot.State>) {}

  showSuccessMessage(message: string) {
    this.store.dispatch(new messageAction.ShowSuccessMessage(message));
    setTimeout(() => {
      this.store.dispatch(new messageAction.HideSuccessMessage());
    }, 5000);
  }

  showErrorMessage(message: string) {
    this.store.dispatch(new messageAction.ShowErrorMessage(message));
    setTimeout(() => {
      this.store.dispatch(new messageAction.HideErrorMessage());
    }, 5000);
  }
}
