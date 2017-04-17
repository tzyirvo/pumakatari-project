import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-paradas',
  templateUrl: './paradas.component.html'
})
export class ParadasComponent implements OnInit {

  //@Input() lat: number = -16.536526;
  //@Input() lng: number = -68.089496;
  public iconUrl: string = 'assets/images/marker.png';
  //@Input() label: string = 'Nombre de la Parada';

  stops$: FirebaseListObservable<any[]>;
  stop$: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire) {
    let firstStop: string = '3Viejas'
    this.stops$ = af.database.list(`paradas`)
    this.updateStop(firstStop)
  }

  updateStop(stop: string) {
    this.stop$ = this.af.database.object(`paradas/${stop}`)
    this.stop$.subscribe(console.log)
  }

  ngOnInit() {
  }

}
