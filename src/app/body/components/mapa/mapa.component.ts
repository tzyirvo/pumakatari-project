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

  onMapReady(map) {
    let i
    let j
    let k
    let route
    let traces
    let polyline
    let randomColor
    this.af.database.list(`rutas`).subscribe(routes => {
      for (k = 0; k < routes.length; k += 1) {
        route = routes[k]
        randomColor = "#" + Math.random().toString(16).slice(2, 8)
        while (randomColor[1] === 'F' || randomColor[1] === 'f') {
          randomColor = "#" + Math.random().toString(16).slice(2, 8)
        }
        if (route.trazos) {
          for (i = 0; i < route.trazos.length; i += 1) {
            traces = []
            for (j = 0; j < route.trazos[i].length; j += 1) {
              traces.push(route.trazos[i][j])
            }
            polyline = new google.maps.Polyline({
              path: traces,
              strokeColor: this.ColorLuminance(randomColor, 0.6)
            })
            polyline.setMap(map)
          }
        }
      }
    })
  }

  ColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }

    return rgb;
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
