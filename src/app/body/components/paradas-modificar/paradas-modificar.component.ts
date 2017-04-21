import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
//noinspection TypeScriptCheckImport
import {AF} from "../../../../providers/af";
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-paradas-modificar',
  templateUrl: './paradas-modificar.component.html'
})
export class ParadasModificarComponent implements OnInit {
  public error: any
  stops$: FirebaseListObservable<any[]>
  public positions: any = []
  public stop: any = null
  public icon: string = "assets/images/marker.png"
  public center: any = "-16.500393,-68.123077"
  public zoom: any = 14

  constructor(public afService:AF, public af: AngularFire, private elRef:ElementRef) {
    this.stops$ = af.database.list(`paradas`)
  }

  ngOnInit() { }

  updateStop(event, key) {
    this.af.database.object(`paradas/${key}`).subscribe(stop => {
      this.stop = {
        key: stop.$key,
        lat: stop.lat,
        lng: stop.lng,
        nombre: stop.nombre
      }
      console.log(this.stop)
      this.center = '' + stop.lat + ',' + stop.lng
      this.positions = [{
        latLng: [stop.lat, stop.lng],
        name: stop.nombre
      }]
      this.zoom = 18
    })
  }

  onDragEnd(event) {
    this.stop.lat = event.latLng.lat()
    this.stop.lng = event.latLng.lng()
    console.log(this.stop)
  }

  modifyStop(event) {
    console.log('modify stop!')
    if (this.stop) {
      this.resetValues()
      this.afService.modifyStop(this.stop).then(() => {
        this.resetValues()
        console.log('bus stop modified!', 'stop key:', this.stop.key)
        this.setSuccessMsg()
      }).catch((error:any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
          this.setErrorMsg()
        }
      })
    } else {
      alert('Seleccionar una parada a modificar primero')
    }
  }

  setErrorMsg() {
    //@TODO
  }

  setSuccessMsg() {
    //@TODO
  }

  resetValues() {
    this.center = "-16.500393,-68.123077"
    this.positions = []
    this.zoom = 14
  }

  clicked(event) {
    var marker = event.target;
    marker.nguiMapComponent.openInfoWindow('iw', marker, {
      stopName: marker.getTitle()
    });
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('other-tab')
    classList.add('inicio-tab')
  }

}
