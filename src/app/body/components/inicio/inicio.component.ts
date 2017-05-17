import { Component, OnInit, ElementRef } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { DbService } from '../../../services/db.service'


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  items: FirebaseListObservable<any[]>;

  constructor(private db:DbService, private elRef:ElementRef) {
  }

  ngOnInit() {
    this.db.getRoutesList().subscribe(routes$ => {
      if (!routes$) {
        this.items = this.db.loadRoutesList()
      } else {
        this.items = routes$
      }
    })
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('other-tab')
    classList.add('inicio-tab')
  }

}
