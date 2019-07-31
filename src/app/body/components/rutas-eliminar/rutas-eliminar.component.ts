import { Component, OnInit, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";
import { AF } from "../../../../providers/af";
import { DbService } from "../../../services/db.service";
import { MessageService } from "../../../services/message.service";

@Component({
  selector: "app-rutas-eliminar",
  templateUrl: "./rutas-eliminar.component.html"
})
export class RutasEliminarComponent implements OnInit {
  routes$: FirebaseListObservable<any[]>;
  routeToDeleteKey = "";
  error: any = null;

  constructor(
    private msgService: MessageService,
    private db: DbService,
    public afService: AF,
    private elRef: ElementRef
  ) {}

  ngOnInit() {
    this.db.getRoutesList().subscribe(routes$ => {
      if (!routes$) {
        this.routes$ = this.db.loadRoutesList();
      } else {
        this.routes$ = routes$;
      }
    });
  }

  setRouteToDeleteKey(routeToDeleteKey) {
    this.routeToDeleteKey = routeToDeleteKey;
  }

  deleteRoute() {
    if (this.routeToDeleteKey !== "") {
      this.afService
        .deleteRoute(this.routeToDeleteKey)
        .then(() => {
          this.msgService.showSuccessMessage("Ruta eliminada exitosamente!");
        })
        .catch((error: any) => {
          if (error) {
            this.error = error;
            console.error(this.error);
            this.msgService.showErrorMessage("Error al eliminar la ruta.");
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
