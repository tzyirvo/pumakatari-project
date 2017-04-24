import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-proximo-bus',
  templateUrl: './proximo-bus.component.html'
})
export class ProximoBusComponent implements OnInit {

  stops$: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire, private router:Router, private elRef:ElementRef) {
    this.stops$ = af.database.list(`paradas`)
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('inicio-tab')
    classList.add('other-tab')
  }

  selectStop(stop: string) {
    this.router.navigate(['parada-mas-cercana'], { queryParams: { stop: stop } });
  }

}
