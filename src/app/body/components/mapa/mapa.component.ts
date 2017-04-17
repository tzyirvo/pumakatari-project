import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html'
})
export class MapaComponent implements OnInit {

  @Input() lat: number = -16.536526;
  @Input() lng: number = -68.089496;
  @Input() zoom: number = 16;
  @Input() iconUrl: string = 'assets/images/marker.png';
  @Input() label: string = 'Nombre de la Parada';


  constructor() { }

  ngOnInit() {
  }

}
