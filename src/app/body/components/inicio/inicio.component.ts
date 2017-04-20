import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  items: FirebaseListObservable<any[]>;

  constructor(af: AngularFire, private elRef:ElementRef) {
    this.items = af.database.list(`rutas`);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('other-tab')
    classList.add('inicio-tab')
  }

}
