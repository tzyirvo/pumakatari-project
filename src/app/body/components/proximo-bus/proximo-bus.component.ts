import { Component, OnInit, ElementRef } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Router} from "@angular/router";
import { DbService } from '../../../services/db.service'

@Component({
  selector: 'app-proximo-bus',
  templateUrl: './proximo-bus.component.html'
})
export class ProximoBusComponent implements OnInit {

  stops$:FirebaseListObservable<any[]>;

  constructor(private db:DbService, private router:Router, private elRef:ElementRef) {
  }

  ngOnInit() {
    this.db.getStopsList().subscribe(stops$ => {
      if (!stops$) {
        this.stops$ = this.db.loadStopsList()
      } else {
        this.stops$ = stops$
      }
    })
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('inicio-tab')
    classList.add('other-tab')
  }

  selectStop(stopKey:string) {
    this.router.navigate(['parada-mas-cercana'], {queryParams: {stop: stopKey}});
  }

}
