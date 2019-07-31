import { Component, ViewChild, OnInit, ElementRef } from "@angular/core";
//noinspection TypeScriptCheckImport
import { AF } from "../../../../providers/af";
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";
import { DbService } from "../../../services/db.service";
import { MessageService } from "../../../services/message.service";
import { Parada } from "../../../models/parada";

@Component({
  selector: "app-paradas-modificar",
  templateUrl: "./paradas-modificar.component.html"
})
export class ParadasModificarComponent implements OnInit {
  public error: any;
  stops$: FirebaseListObservable<any[]>;
  public positions: any = [];
  public stop: any = null;
  public icon = "assets/images/marker.png";
  public center: any = "-16.500393,-68.123077";
  public zoom: any = 14;

  constructor(
    private msgService: MessageService,
    private db: DbService,
    public afService: AF,
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    this.db.getStopsList().subscribe(stops$ => {
      if (!stops$) {
        this.stops$ = this.db.loadStopsList();
      } else {
        this.stops$ = stops$;
      }
    });
  }

  updateStop(event, key) {
    this.db.getStop(key).subscribe(stop => {
      const curStop = new Parada(stop);
      this.stop = {
        key: stop.$key,
        lat: stop.lat,
        lng: stop.lng,
        nombre: stop.nombre
      };
      this.center = curStop.getPositionText();
      this.positions = [curStop.getPositionObject()];
      this.zoom = 18;
    });
  }

  onKeyUp(event) {
    if (this.stop) {
      this.stop.nombre = event.target.value;
    } else {
      event.target.value = "";
    }
  }

  onDragEnd(event) {
    this.stop.lat = event.latLng.lat();
    this.stop.lng = event.latLng.lng();
  }

  modifyStop(event) {
    if (this.stop) {
      this.resetValues();
      this.afService
        .modifyStop(this.stop)
        .then(() => {
          this.resetValues();
          this.msgService.showSuccessMessage("Parada modificada exitosamente!");
        })
        .catch((error: any) => {
          if (error) {
            this.error = error;
            console.error(this.error);
            this.msgService.showErrorMessage("Error al modificar la parada");
          }
        });
    } else {
      alert("Seleccionar una parada a modificar primero");
    }
  }

  resetValues() {
    this.center = "-16.500393,-68.123077";
    this.positions = [];
    this.zoom = 14;
  }

  clicked(event) {
    const marker = event.target;
    marker.nguiMapComponent.openInfoWindow("iw", marker, {
      stopName: marker.getTitle()
    });
  }

  AfterViewInit() {
    const classList = this.elRef.nativeElement.parentElement.parentElement
      .parentElement.parentElement.parentElement.parentElement.classList;
    classList.remove("other-tab");
    classList.add("inicio-tab");
  }
}
