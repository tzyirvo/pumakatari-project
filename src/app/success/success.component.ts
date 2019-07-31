import { Component, OnInit } from "@angular/core";
import * as fromRoot from "../reducers/";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-success",
  templateUrl: "./success.component.html"
})
export class SuccessComponent implements OnInit {
  public showMessage: Observable<boolean>;
  public message: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.showMessage = this.store.select(fromRoot.showSuccessMessage);
    this.message = this.store.select(fromRoot.getSuccessMessage);
  }
}
