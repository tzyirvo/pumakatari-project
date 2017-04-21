import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-rutas-modificar',
  templateUrl: './rutas-modificar.component.html'
})
export class RutasModificarComponent implements OnInit {

  constructor(private elRef:ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('other-tab')
    classList.add('inicio-tab')
  }

}
