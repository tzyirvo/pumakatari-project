import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../reducers/';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html'
})
export class SideBarComponent implements OnInit {

  public isLoggedIn: Observable<boolean>;
  public isNotLoggedIn: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.isLoggedIn = this.store.select(fromRoot.isUserLoggedIn);
    this.isNotLoggedIn = this.store.select(fromRoot.isNotUserLoggedIn);
  }

  ngOnInit() {
  }

}
