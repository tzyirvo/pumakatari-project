import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DrawingManager } from '@ngui/map';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {AF} from "../../../../providers/af";
import { DbService } from '../../../services/db.service'
import {MessageService} from "../../../services/message.service";
import {Parada} from "../../../models/parada";

@Component({
  selector: 'app-rutas-crear',
  templateUrl: './rutas-crear.component.html'
})
export class RutasCrearComponent implements OnInit {
  public error: any
  selectedOverlay: any;
  @ViewChild(DrawingManager) drawingManager: DrawingManager;
  stops$: FirebaseListObservable<any[]>
  //routes$: FirebaseListObservable<any[]>
  public positions: any = []
  public selectedPositions: any = []
  public icon: string = "assets/images/marker.png"
  public center: any = "-16.500393,-68.123077"
  public zoom: any = 14
  public routeName: string = ''
  public overlays: any = []
  public map: any
  public firstStop: boolean = false

  constructor(private msgService:MessageService, private db:DbService, private elRef:ElementRef, public afService:AF) {
  }

  ngOnInit() {
    this.db.getStopsList().subscribe(stops$ => {
      if (!stops$) {
        this.db.loadStopsList().subscribe(stops => {
          this.initPositions(stops)
        })
      } else {
        stops$.subscribe(stops => {
          this.initPositions(stops)
        })
      }
    })

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

  initPositions(stops) {
    stops.forEach(stop => {
      let curStop = new Parada(stop)
      this.positions.push(curStop.getPositionObject())
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

  onKeyUp(event) {
    this.routeName = event.target.value
  }

  toggleStop(event, stopKey) {
    let options = event.target.options
    let length = options.length
    let classList
    let i
    let selectedCls = 'selected'
    let isSelected
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

  createRoute(event) {
    this.afService.createRoute(this.overlays, this.routeName, this.selectedPositions).then(() => {
      this.resetValues()
      this.msgService.showSuccessMessage('Nueva ruta creada exitosamente!')
    }).catch((error:any) => {
      if (error) {
        this.error = error;
        console.error(this.error);
        this.msgService.showErrorMessage('Error al crear la nueva ruta')
      }
    })
  }

  resetValues () {
    //TODO
  }

  onMapReady(event) {
    this.map = event
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
