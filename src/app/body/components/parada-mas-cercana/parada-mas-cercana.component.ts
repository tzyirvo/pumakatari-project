import { Component, ViewChild, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DirectionsRenderer } from '@ngui/map';

@Component({
  selector: 'app-parada-mas-cercana',
  templateUrl: './parada-mas-cercana.component.html'
})
export class ParadaMasCercanaComponent implements OnInit {
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  directionsRenderer: google.maps.DirectionsRenderer;
  directionsResult: google.maps.DirectionsResult;
  public destStopKey: string
  public curPos = {lat: -16.500393, lng: -68.123077}
  public center: any = "-16.500393,-68.123077"
  public initStopLatLng: any = "-16.500393, -68.123077"
  public originLatLng: any = "-16.500393, -68.12307"
  public initialStop: any = {lat: -16.500393, lng: -68.123077}
  public destStop: any = {lat: -16.500393, lng: -68.123077}
  public zoom: any = 18
  public positions: any = []
  public middlePositions: any = []
  public icon: string = "assets/images/marker.png"
  public smallIcon: string = "assets/images/small-logo.png"
  public route: any
  public map: any
  public overlays: any = []

  constructor(private elRef:ElementRef, private router: Router, public af: AngularFire, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    let queryParams = this.router.routerState.snapshot.url.split('?')

    this.directionsRendererDirective['initialized$'].subscribe( directionsRenderer => {
      this.directionsRenderer = directionsRenderer;
    });

    if (queryParams.length > 1) {
      queryParams = queryParams[1].split('=')
      this.destStopKey = queryParams[1]
    }
    console.log('Parada destino:', this.destStopKey)
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.setCurPosition.bind(this));
    }

  }

  setCurPosition(position) {
    this.curPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    this.center = '' + this.curPos.lat + ',' + this.curPos.lng
    console.log('Posicion actual:', this.curPos)

    this.originLatLng = '' + this.curPos.lat + ',' + this.curPos.lng

    this.initRoutes()
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

  initRoutes() {
    let initialStopModified = false
    let i
    let j
    let traces
    let polyline
    this.deleteAllTraces()
    this.route = null
    this.positions = []
    if (this.destStopKey) {
      this.af.database.list(`rutas`).subscribe(routes => {
        for (i = 0; i < routes.length && !this.route; i += 1) {
          if (routes[i].paradas) {
            for (j = 0; j < routes[i].paradas.length && !this.route; j += 1) {
              if (routes[i].paradas[j] === this.destStopKey) {
                this.route = routes[i]
              }
            }
          }
        }
        if (this.route.trazos) {
          for (i = 0; i < this.route.trazos.length; i += 1) {
            traces = []
            for (j = 0; j < this.route.trazos[i].length; j += 1) {
              traces.push(this.route.trazos[i][j])
            }
            polyline = new google.maps.Polyline({
              path: traces
            })
            polyline.overlayNumber = i
            polyline.setMap(this.map)
            this.overlays.push(polyline)
          }
        }
        this.af.database.list(`paradas`).subscribe(stops => {
          stops.forEach(stop => {
            if (this.isStopinRoute(stop.$key, this.route.paradas)) {
              this.middlePositions.push({
                latLng: [stop.lat, stop.lng],
                name: stop.nombre,
                $key: stop.$key
              })
              if (!initialStopModified) {
                this.initialStop = stop
                initialStopModified = true
              } else {
                if (this.getDist(this.curPos, this.initialStop) > this.getDist(this.curPos, stop)) {
                  this.initialStop = stop
                }
              }
              if (stop.$key === this.destStopKey) {
                this.destStop = stop
                this.positions.push({
                  latLng: [stop.lat, stop.lng],
                  name: stop.nombre,
                  $key: stop.$key
                })
              }
            }
          })
          this.positions.push({
            latLng: [this.initialStop.lat, this.initialStop.lng],
            name: this.initialStop.nombre,
            $key: this.initialStop.$key
          })
          for (i = 0; i < this.middlePositions.length; i += 1) {
            if (this.middlePositions[i].$key === this.initialStop.$key || this.middlePositions[i].$key === this.destStop.$key) {
              this.middlePositions.splice(i, 1)
            }
          }
          this.initStopLatLng = '' + this.initialStop.lat + ',' + this.initialStop.lng
        })
      })
    } else {
      this.af.database.list(`paradas`).subscribe(stops => {
        stops.forEach(stop => {
          if (!initialStopModified) {
            this.initialStop = stop
            initialStopModified = true
          } else {
            if (this.getDist(this.curPos, this.initialStop) > this.getDist(this.curPos, stop)) {
              this.initialStop = stop
            }
          }
        })
        this.initStopLatLng = '' + this.initialStop.lat + ',' + this.initialStop.lng
        this.positions = [{
          latLng: [this.initialStop.lat, this.initialStop.lng],
          name: this.initialStop.nombre
        }]
      })
    }
  }

  isStopinRoute(stopKey, stops) {
    let i
    if (stops) {
      for(i = 0; i < stops.length; i += 1) {
        if (stopKey === stops[i]) {
          return true
        }
      }
    }
    return false
  }

  directionsChanged() {
    this.directionsResult = this.directionsRenderer.getDirections();
    this.cdr.detectChanges();
  }

  showDirection() {
    this.directionsRendererDirective['showDirections']({
      destination: this.initStopLatLng,
      optimizeWaypoints: true,
      origin: this.originLatLng,
      provideRouteAlternatives: true,
      travelMode: google.maps.TravelMode.WALKING
    });
  }

  getDist(latLanA, latLanB) {
    return this.distanceInKmBetweenEarthCoordinates(latLanA.lat, latLanA.lng, latLanB.lat, latLanB.lng)
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(lat2 - lat1);
    var dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
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
