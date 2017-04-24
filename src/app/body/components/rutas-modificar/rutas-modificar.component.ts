import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DrawingManager } from '@ngui/map';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {AF} from "../../../../providers/af";

@Component({
  selector: 'app-rutas-modificar',
  templateUrl: './rutas-modificar.component.html'
})
export class RutasModificarComponent implements OnInit {
  public error: any
  selectedOverlay: any;
  @ViewChild(DrawingManager) drawingManager: DrawingManager;
  stops$: FirebaseListObservable<any[]>
  routes$: FirebaseListObservable<any[]>
  public positions: any = []
  public selectedPositions: any = []
  //public stop: any = null
  public icon: string = "assets/images/marker.png"
  public center: any = "-16.500393,-68.123077"
  public zoom: any = 14
  public selectedRoute: any = null
  public overlays: any = []
  public map: any

  constructor(private elRef:ElementRef, public afService:AF, public af: AngularFire) {
    this.routes$ = af.database.list(`rutas`)
    this.stops$ = af.database.list(`paradas`)
    this.stops$.subscribe(stops => {
      stops.forEach(stop => {
        this.positions.push({
          latLng: [stop.lat, stop.lng],
          name: stop.nombre,
          $key: stop.$key
        })
      })
    })
  }

  ngOnInit() {
    this.drawingManager['initialized$'].subscribe(dm => {
      google.maps.event.addListener(dm, 'overlaycomplete', event => {
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          dm.setDrawingMode(null);
          event.overlay.overlayNumber = this.overlays.length
          this.overlays.push(event.overlay)
          google.maps.event.addListener(event.overlay, 'click', e => {
            this.selectedOverlay = event.overlay.overlayNumber;
            this.overlays[this.selectedOverlay].setEditable(true);
          });
        }
      });
    });
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

  updateRoute(event, routeKey) {
    let i
    let j
    let traces
    let polyline
    this.deleteAllTraces()
    this.selectedPositions = []
    this.overlays = []
    let options = this.elRef.nativeElement.firstChild.childNodes[3].childNodes[1].childNodes[3].childNodes[1].options;
    for(i = 0; i < options.length; i += 1) {
      options[i].selected = false
      options[i].classList.remove('selected')
    }
    this.af.database.object(`rutas/${routeKey}`).subscribe(route => {
      this.selectedRoute = {
        name: route.nombre,
        $key: route.$key
      }
      if (route.trazos) {
        for (i = 0; i < route.trazos.length; i += 1) {
          traces = []
          for (j = 0; j < route.trazos[i].length; j += 1) {
            traces.push(route.trazos[i][j])
          }
          polyline = new google.maps.Polyline({
            path: traces,
            editable: true
          })
          polyline.overlayNumber = i
          polyline.setMap(this.map)
          this.overlays.push(polyline)
        }
      }
      this.stops$.forEach(stops => {
        stops.map(stop => {
          if (this.isStopinRoute(stop.$key, route.paradas)) {
            this.selectedPositions.push({
              latLng: [stop.lat, stop.lng],
              name: stop.nombre,
              $key: stop.$key
            })
            for(i = 0; i < options.length; i += 1) {
              if (options[i].value === stop.$key) {
                options[i].selected = true
                options[i].classList.add('selected')
                break
              }
            }
          }
        })
      })
      this.updateSelectList()
    })
  }

  onKeyUp(event) {
    if (this.selectedRoute) {
      this.selectedRoute.name = event.target.value
    } else {
      event.target.value = ''
    }
  }

  toggleStop(event, stopKey) {
    let options = event.target.options
    let length = options.length
    let classList
    let i
    let selectedCls = 'selected'
    let isSelected
    if (!this.selectedRoute) {
      alert('Seleccione una ruta antes de modificar las paradas')
      return
    }
    for (i = 0; i < length; i += 1) {
      if (options[i].value === stopKey) {
        classList = options[i].classList
        isSelected = (options[i].className.indexOf(selectedCls) > -1)
        classList[isSelected ? 'remove': 'add'](selectedCls)
        options[i].selected = !isSelected
        this.toggleStopSelection(stopKey, !isSelected)
      }
    }
    event.target.value = undefined
  }

  toggleStopSelection(stopKey, addStop) {
    let i
    let stop
    for (i = 0; i < this.positions.length; i += 1) {
      if (this.positions[i].$key === stopKey) {
        stop = this.positions[i]
        break
      }
    }
    if (addStop) {
      this.selectedPositions.push(stop)
      return
    }
    for (i = 0; i < this.selectedPositions.length; i += 1) {
      if (this.selectedPositions[i].$key === stopKey) {
        this.selectedPositions.splice(i, 1)
        return
      }
    }
  }

  modifyRoute(event) {
    //@TODO
    this.afService.modifyRoute(this.overlays, this.selectedRoute, this.selectedPositions).then(() => {
      this.resetValues()
      console.log('bus stop modified!', 'route key:', this.selectedRoute.$key)
      this.setSuccessMsg()
    }).catch((error:any) => {
      if (error) {
        this.error = error;
        console.log(this.error);
        this.setErrorMsg()
      }
    })
  }

  resetValues () {
    //TODO
  }

  setSuccessMsg() {
    //TODO
  }

  setErrorMsg() {
    //TODO
  }

  onMapReady(event) {
    this.map = event
    console.log(event)
  }

  updateSelectList() {
    let options = this.elRef.nativeElement.firstChild.childNodes[3].childNodes[1].childNodes[3].childNodes[1].options;
    let i
    for(i = 0; i < options.length; i += 1) {
      options[i].selected = (this.selectedPositions.indexOf(options[i].value) > -1)
    }
  }

  isStopinRoute(stopKey, paradas) {
    let i
    for(i = 0; i < paradas.length; i += 1) {
      if (stopKey === paradas[i]) {
        return true
      }
    }
    return false
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('other-tab')
    classList.add('inicio-tab')
  }

  clicked(event) {
    var marker = event.target;
    marker.nguiMapComponent.openInfoWindow('iw', marker, {
      stopName: marker.getTitle()
    });
  }

}
