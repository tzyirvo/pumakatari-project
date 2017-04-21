import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html'
})
export class MapaComponent implements OnInit {

  public iconUrl: string = 'assets/images/marker.png';
  public positions: any = []
  public center: any = "-16.497317,-68.109008"
  public zoom: any = 12
  public icon: string = "assets/images/marker.png"

  constructor(public af: AngularFire, private elRef:ElementRef) {
    af.database.list(`paradas`).subscribe(stops => {
      stops.forEach(stop => {
        this.positions.push({
          name: stop.nombre,
          latLng: [stop.lat, stop.lng]
        })
      })
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

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('inicio-tab')
    classList.add('other-tab')
  }

}
