import { Component, OnInit, ElementRef } from "@angular/core";
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";
import { AF } from "../../../../providers/af";
import { DbService } from "../../../services/db.service";
import { MessageService } from "../../../services/message.service";

@Component({
  selector: "app-paradas-eliminar",
  templateUrl: "./paradas-eliminar.component.html"
})
export class ParadasEliminarComponent implements OnInit {
  stops$: FirebaseListObservable<any[]>;
  stopToDeleteKey = "";
  error: any = null;

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

  setStopToDeleteKey(stopToDeleteKey) {
    this.stopToDeleteKey = stopToDeleteKey;
  }

  deleteStop() {
    if (this.stopToDeleteKey !== "") {
      this.afService
        .deleteStop(this.stopToDeleteKey)
        .then(() => {
          this.msgService.showSuccessMessage("Parada eliminada exitosamente!");
        })
        .catch((error: any) => {
          if (error) {
            this.error = error;
            console.error(this.error);
            this.msgService.showErrorMessage("Error al eliminar la parada.");
          }
        });
    }
  }

  AfterViewInit() {
    const classList = this.elRef.nativeElement.parentElement.parentElement
      .parentElement.parentElement.parentElement.parentElement.classList;
    classList.remove("other-tab");
    classList.add("inicio-tab");
  }
}
