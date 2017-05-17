import { Component, OnInit, ElementRef } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import "rxjs/add/operator/map";
import { DbService } from '../../../services/db.service'

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html'
})
export class RutasComponent implements OnInit {

  routes$: FirebaseListObservable<any[]>;
  public firstStop: boolean = false

  public positions: any = []
  public center: any = "-16.500393,-68.123077"
  public zoom: any = 14
  public icon: string = "assets/images/marker.png"
  public map: any
  public overlays: any = []

  constructor(private db:DbService, private elRef:ElementRef) {
  }

  ngOnInit() {
    this.db.getRoutesList().subscribe(routes$ => {
      if (!routes$) {
        this.routes$ = this.db.loadRoutesList()
      } else {
        this.routes$ = routes$
      }
    })
  }

  deleteAllTraces() {
    let i
    let overlaysLength = this.overlays.length
    for (i = 0; i < overlaysLength; i += 1) {
      this.deleteTrace(0)
    }
  }

  deleteTrace(traceNumber) {
    let i
    this.overlays[traceNumber].setMap(null)
    this.overlays.splice(traceNumber, 1)
    for (i = 0; i < this.overlays.length; i += 1) {
      this.overlays[i].overlayNumber = i
    }
  }

  updateRoute(routeKey: string) {
    let i
    let j
    let traces
    let polyline
    this.deleteAllTraces()
    this.firstStop = false
    this.positions = []
    this.db.getRoute(routeKey).subscribe(route => {
      if (route.trazos) {
        for (i = 0; i < route.trazos.length; i += 1) {
          traces = []
          for (j = 0; j < route.trazos[i].length; j += 1) {
            traces.push(route.trazos[i][j])
          }
          polyline = new google.maps.Polyline({
            path: traces
          })
          polyline.overlayNumber = i
          polyline.setMap(this.map)
          this.overlays.push(polyline)
        }
      }
      if (route.paradas) {
        for (i = 0; i < route.paradas.length; i += 1) {
          this.db.getStop(route.paradas[i]).subscribe(stop => {
            this.positions.push({
              latLng: [stop.lat, stop.lng],
              name: stop.nombre
            })
            if (!this.firstStop) {
              this.firstStop = true
              this.center = '' + stop.lat + ',' + stop.lng
            }
          })
        }
      }
    })
  }

  onMapReady(event) {
    this.map = event
    console.log(event)
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
