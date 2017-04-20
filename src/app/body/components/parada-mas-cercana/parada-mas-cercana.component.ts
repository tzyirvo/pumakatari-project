import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-parada-mas-cercana',
  templateUrl: './parada-mas-cercana.component.html'
})
export class ParadaMasCercanaComponent implements OnInit {

  constructor(private elRef:ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('inicio-tab')
    classList.add('other-tab')
  }

}
