import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  items: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
    this.items = af.database.list(`rutas`);
  }

  ngOnInit() {
  }

}

//https://github.com/angular/angularfire2
//export class AppComponent {
//  private limit: Subject<number> = new Subject<number>();
//
//  constructor(af: AngularFire) {
//    af.database.list(`test`, {
//      query: {
//        limitToFirst: this.limit
//      }
//    }).subscribe((val) => console.log(val));
//
//    this.limit.next(1);
//
//    setTimeout(() => {
//      this.limit.next(2);
//    }, 2000);
//
//    setTimeout(() => {
//      this.limit.next(3);
//    }, 4000);
//
//    let random = Math.floor(Math.random() * 10);
//    setTimeout(() => {
//      af.database.object(`test/i0`).set(random);
//    }, 6000);
//  }
//}
