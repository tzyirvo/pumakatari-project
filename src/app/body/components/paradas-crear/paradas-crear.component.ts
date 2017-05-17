import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
//noinspection TypeScriptCheckImport
import { DrawingManager } from '@ngui/map';
import {AF} from "../../../../providers/af";

@Component({
  selector: 'app-paradas-crear',
  templateUrl: './paradas-crear.component.html'
})
export class ParadasCrearComponent implements OnInit {
  selectedOverlay:any;
  @ViewChild(DrawingManager) drawingManager:DrawingManager;
  public error:any

  constructor(public afService:AF, private elRef:ElementRef) {
  }

  ngOnInit() {
    this.drawingManager['initialized$'].subscribe(dm => {
      google.maps.event.addListener(dm, 'overlaycomplete', event => {
        this.deleteSelectedOverlay()
        this.selectedOverlay = event.overlay
      });
    });
  }

  saveStop(event, name) {
    if (this.selectedOverlay) {
      this.afService.saveNewStop(name, this.selectedOverlay.position.lat(), this.selectedOverlay.position.lng()).then(() => {
        console.log('bus stop created!', 'bus name:', name)
        this.setSuccessMsg()
        this.clearFields()
      }).catch((error:any) => {
        if (error) {
          this.error = error;
          console.error(this.error);
          this.setErrorMsg()
        }
      })
    } else {
      alert('¡Selecciona la posicion de la parada en el mapa primero!')
    }
  }

  deleteSelectedOverlay() {
    if (this.selectedOverlay) {
      this.selectedOverlay.setMap(null);
      delete this.selectedOverlay;
    }
  }

  setErrorMsg() {
    //@TODO
  }

  setSuccessMsg() {
    //@TODO
  }

  clearFields() {
    //@TODO
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('other-tab')
    classList.add('inicio-tab')
  }

}
