import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-paradas',
  templateUrl: './paradas.component.html'
})
export class ParadasComponent implements OnInit {

  public iconUrl: string = 'assets/images/marker.png';

  stops$: FirebaseListObservable<any[]>;
  stop$: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire) {
    this.stops$ = af.database.list(`paradas`)
  }

  updateStop(stop: string) {
    this.stop$ = this.af.database.object(`paradas/${stop}`)
    this.stop$.subscribe(console.log)
  }

  ngOnInit() {
  }

  private convertStringToNumber(value: string): number {
    return +value;
  }

}
