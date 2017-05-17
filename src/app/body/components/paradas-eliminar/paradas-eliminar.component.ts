import { Component, OnInit, ElementRef } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {AF} from "../../../../providers/af";
import { DbService } from '../../../services/db.service'

@Component({
  selector: 'app-paradas-eliminar',
  templateUrl: './paradas-eliminar.component.html'
})
export class ParadasEliminarComponent implements OnInit {

  stops$: FirebaseListObservable<any[]>
  stopToDeleteKey: string = ''

  constructor(private db:DbService, public afService:AF, private elRef:ElementRef) {
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
