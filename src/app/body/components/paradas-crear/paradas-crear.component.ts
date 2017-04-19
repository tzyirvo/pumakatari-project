import { Component, ViewChild, OnInit } from '@angular/core';
//noinspection TypeScriptCheckImport
import { DrawingManager } from '@ngui/map';

@Component({
  selector: 'app-paradas-crear',
  templateUrl: './paradas-crear.component.html'
})
export class ParadasCrearComponent implements OnInit {
  selectedOverlay: any;
  @ViewChild(DrawingManager) drawingManager: DrawingManager;

  constructor() { }

  ngOnInit() {
    this.drawingManager['initialized$'].subscribe(dm => {
      google.maps.event.addListener(dm, 'overlaycomplete', event => {
        this.deleteSelectedOverlay()
        this.selectedOverlay = event.overlay
      });
    });
  }

  saveStop() {
    if (this.selectedOverlay) {
      //@TODO
      //saveNewStop(name, this.selectedOverlay.position.lat(), this.selectedOverlay.position.lng())
    }
  }

  deleteSelectedOverlay() {
    if (this.selectedOverlay) {
      this.selectedOverlay.setMap(null);
      delete this.selectedOverlay;
    }
  }

}
