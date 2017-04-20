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
  public positions: any = []
  public center: any = "-16.500393,-68.123077"
  public zoom: any = 16
  public icon: string = "assets/images/marker.png"

  constructor(public af: AngularFire) {
    this.stops$ = af.database.list(`paradas`)
  }

  updateStop(stop: string) {
    this.af.database.object(`paradas/${stop}`).subscribe(stop => {
      console.log(stop)
      this.center = '' + stop.lat + ',' + stop.lng
      this.positions = [{
        latLng: [stop.lat, stop.lng],
        name: stop.nombre
      }]
    })
  }

  ngOnInit() {
  }

  clicked(event) {
    var marker = event.target;
    marker.nguiMapComponent.openInfoWindow('iw', marker, {
      stopName: marker.getTitle()
    });
  }

}
