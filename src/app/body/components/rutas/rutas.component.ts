import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import "rxjs/add/operator/map";

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

  constructor(public af: AngularFire) {
    this.routes$ = af.database.list(`rutas`)
    this.routes$.subscribe(console.log)
  }

  updateRoute(route: string) {
    this.firstStop = false
    this.positions = []
    this.af.database.list(`rutas/${route}/paradas`)
      .subscribe(paradas => {
        paradas.map(parada => {
          this.af.database.object(`paradas/` + parada.$value).subscribe(stop => {
            this.positions.push([stop.lat, stop.lng])
            if (!this.firstStop) {
              this.firstStop = true
              this.center = '' + stop.lat + ',' + stop.lng
            }
          })
        })
      })
  }

  ngOnInit() {
  }

}
