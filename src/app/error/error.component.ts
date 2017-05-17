import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../reducers/';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

  public showMessage: Observable<boolean>
  public message: Observable<string>

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.showMessage = this.store.select(fromRoot.showErrorMessage);
    this.message = this.store.select(fromRoot.getErrorMessage);
  }

}
