import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html'
})
export class MapaComponent implements OnInit {

  public lat: number = -16.497317;
  public lng: number = -68.109008;
  public iconUrl: string = 'assets/images/marker.png';

  stops$: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire) {
    this.stops$ = af.database.list(`paradas`)
    this.stops$.subscribe(console.log)
  }

  ngOnInit() {
  }

  private convertStringToNumber(value: string): number {
    return +value;
  }

}
