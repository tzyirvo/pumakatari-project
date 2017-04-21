import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {AF} from "../../../../providers/af";

@Component({
  selector: 'app-paradas-eliminar',
  templateUrl: './paradas-eliminar.component.html'
})
export class ParadasEliminarComponent implements OnInit {

  stops$: FirebaseListObservable<any[]>
  stopToDeleteKey: string = ''

  constructor(public af: AngularFire, public afService:AF, private elRef:ElementRef) {
    this.stops$ = af.database.list(`paradas`)
  }

  ngOnInit() {
  }

  setStopToDeleteKey(stopToDeleteKey) {
    this.stopToDeleteKey = stopToDeleteKey
  }

  deleteStop() {
    if (this.stopToDeleteKey !== '') {
      this.afService.deleteStop(this.stopToDeleteKey)
    }
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('other-tab')
    classList.add('inicio-tab')
  }

}
