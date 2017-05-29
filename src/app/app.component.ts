import { Component } from '@angular/core';
import * as db from './actions/db.action';
import {DbService} from "./services/db.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private db:DbService) {
  }

  ngOnInit() {
    this.db.loadCurLocation()
  }
}
