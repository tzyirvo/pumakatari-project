import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-proximo-bus',
  templateUrl: './proximo-bus.component.html'
})
export class ProximoBusComponent implements OnInit {

  constructor(private elRef:ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('inicio-tab')
    classList.add('other-tab')
  }

}
