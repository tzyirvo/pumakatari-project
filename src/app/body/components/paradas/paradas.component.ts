import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-paradas',
  templateUrl: './paradas.component.html'
})
export class ParadasComponent implements OnInit {

  //@Input() lat: number = -16.536526;
  //@Input() lng: number = -68.089496;
  @Input() iconUrl: string = 'assets/images/marker.png';
  //@Input() label: string = 'Nombre de la Parada';

  stops$: FirebaseListObservable<any[]>;
  stop$: FirebaseObjectObservable<any>;

  constructor(af: AngularFire) {
    let firstStop: string = '3Viejas';
    this.stops$ = af.database.list(`paradas`);
    this.stop$ = af.database.object(`paradas/` + firstStop)
    this.stop$.subscribe(console.log)
  }

  ngOnInit() {
  }

  onSelectStop(event, value) {
    console.warn('Parada seleccionada!', value);
  }

}
