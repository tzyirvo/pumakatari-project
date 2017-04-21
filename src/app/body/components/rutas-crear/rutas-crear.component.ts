import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-rutas-crear',
  templateUrl: './rutas-crear.component.html'
})
export class RutasCrearComponent implements OnInit {

  constructor(private elRef:ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('other-tab')
    classList.add('inicio-tab')
  }

}
