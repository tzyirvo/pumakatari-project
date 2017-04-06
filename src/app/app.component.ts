import { Component, Input } from '@angular/core';
//import { AngularFire } from 'angularfire2';
//import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() title: string = 'Pumakatari Project';
  @Input() lat: number = -16.536526;
  @Input() lng: number = -68.089496;
  @Input() zoom: number = 16;
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
