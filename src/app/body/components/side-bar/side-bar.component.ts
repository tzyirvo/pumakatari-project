import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html'
})
export class SideBarComponent implements OnInit {

  @Input() isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
