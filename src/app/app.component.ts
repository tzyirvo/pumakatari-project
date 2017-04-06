import { Component } from '@angular/core';
//import { AngularFire } from 'angularfire2';
//import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 7.809007;
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
