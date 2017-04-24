import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {AF} from "../../../../providers/af";

@Component({
  selector: 'app-rutas-modificar',
  templateUrl: './rutas-modificar.component.html'
})
export class RutasModificarComponent implements OnInit {
  stops$: FirebaseListObservable<any[]>
  routes$: FirebaseListObservable<any[]>
  public positions: any = []
  public selectedPositions: any = []
  //public stop: any = null
  public icon: string = "assets/images/marker.png"
  public center: any = "-16.500393,-68.123077"
  public zoom: any = 14
  public routeSelected: boolean = false

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
  }

  updateRoute(event, routeKey) {
    let i
    this.selectedPositions = []
    let options = this.elRef.nativeElement.firstChild.childNodes[3].childNodes[1].childNodes[3].childNodes[1].options;
    for(i = 0; i < options.length; i += 1) {
      options[i].selected = false
      options[i].classList.remove('selected')
    }
    this.af.database.list(`rutas/${routeKey}/paradas`).subscribe(paradas => {
      this.stops$.forEach(stops => {
        stops.map(stop => {
          if (this.isStopinRoute(stop.$key, paradas)) {
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

  toggleStop(event, stopKey) {
    event.preventDefault()
    let options = event.target.options
    let length = options.length
    let classList
    let i
    let selectedCls = 'selected'
    let isSelected
    if (!this.routeSelected) {
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
  }

  deleteTrace(event) {
    //@TODO
  }

  updateSelectList() {
    let options = this.elRef.nativeElement.firstChild.childNodes[3].childNodes[1].childNodes[3].childNodes[1].options;
    let i
    for(i = 0; i < options.length; i += 1) {
      options[i].selected = (this.selectedPositions.indexOf(options[i].value) > -1)
    }
    this.routeSelected = true
  }

  isStopinRoute(stopKey, paradas) {
    let i
    for(i = 0; i < paradas.length; i += 1) {
      if (stopKey === paradas[i].$value) {
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
