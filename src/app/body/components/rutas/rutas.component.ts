import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html'
})
export class RutasComponent implements OnInit {

  public iconUrl: string = 'assets/images/marker.png';

  routes$: FirebaseListObservable<any[]>;
  stops$: FirebaseListObservable<any[]>;
  firstStop$: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire) {
    this.routes$ = af.database.list(`rutas`)
    this.routes$.subscribe(console.log)
  }

  updateRoute(route: string) {
    this.updateFirstStop(route)

    this.stops$ = this.af.database.list(`rutas/${route}/paradas`)
      .map((paradas) => {
        return paradas.map(parada => {
          parada =  this.af.database.object(`paradas/` + parada.$value)
          return parada
        })
      }) as FirebaseListObservable<any[]>
    this.stops$.subscribe(console.log)
  }

  updateFirstStop(route: string) {
    this.af.database.object(`rutas/${route}/paradas`).subscribe(stops => {
      this.firstStop$ = this.af.database.object(`paradas/` + stops[0])
      this.firstStop$.subscribe(console.log)
    })
  }

  ngOnInit() {
  }

  private convertStringToNumber(value: string): number {
    return +value;
  }

}
