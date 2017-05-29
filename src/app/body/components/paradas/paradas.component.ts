import { Component, OnInit, ElementRef } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DbService } from '../../../services/db.service'
import {Parada} from "../../../models/parada";

@Component({
  selector: 'app-paradas',
  templateUrl: './paradas.component.html'
})
export class ParadasComponent implements OnInit {

  public iconUrl:string = 'assets/images/marker.png';
  stops$:FirebaseListObservable<any[]>;
  public positions:any = []
  public center:any = "-16.500393,-68.123077"
  public zoom:any = 16
  public icon:string = "assets/images/marker.png"

  constructor(private db:DbService, private elRef:ElementRef) {
  }

  ngOnInit() {
    this.db.getStopsList().subscribe(stops$ => {
      if (!stops$) {
        this.stops$ = this.db.loadStopsList()
      } else {
        this.stops$ = stops$
      }
    })
  }

  updateStop(stopKey:string) {
    this.db.getStop(stopKey).subscribe(stop => {
      let curStop = new Parada(stop)
      this.center = curStop.getPositionText()
      this.positions = [curStop.getPositionObject()]
    })
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
