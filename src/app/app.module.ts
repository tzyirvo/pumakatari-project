import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AngularFireModule } from "angularfire2";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { AgmCoreModule } from "angular2-google-maps/core";
import { HeaderComponent } from "./header/header.component";
import { BodyComponent } from "./body/body.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { SideBarComponent } from "./body/components/side-bar/side-bar.component";
import { ContentComponent } from "./body/components/content/content.component";
import { InicioComponent } from "./body/components/inicio/inicio.component";
import { RutasComponent } from "./body/components/rutas/rutas.component";
import { ParadasComponent } from "./body/components/paradas/paradas.component";
import { ParadaMasCercanaComponent } from "./body/components/parada-mas-cercana/parada-mas-cercana.component";
import { ProximoBusComponent } from "./body/components/proximo-bus/proximo-bus.component";
import { MapaComponent } from "./body/components/mapa/mapa.component";
import { ContactanosComponent } from "./body/components/contactanos/contactanos.component";
import { RutasCrearComponent } from "./body/components/rutas-crear/rutas-crear.component";
import { RutasModificarComponent } from "./body/components/rutas-modificar/rutas-modificar.component";
import { RutasEliminarComponent } from "./body/components/rutas-eliminar/rutas-eliminar.component";
import { ParadasCrearComponent } from "./body/components/paradas-crear/paradas-crear.component";
import { ParadasModificarComponent } from "./body/components/paradas-modificar/paradas-modificar.component";
import { ParadasEliminarComponent } from "./body/components/paradas-eliminar/paradas-eliminar.component";
import { IniciarSesionComponent } from "./body/components/iniciar-sesion/iniciar-sesion.component";
import { AF } from "../providers/af";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./reducers/";
import { NguiMapModule } from "@ngui/map";
import { DbService } from "./services/db.service";
import { MessageService } from "./services/message.service";
import { SuccessComponent } from "./success/success.component";
import { ErrorComponent } from "./error/error.component";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BodyComponent,
    SideBarComponent,
    ContentComponent,
    InicioComponent,
    RutasComponent,
    ParadasComponent,
    ParadaMasCercanaComponent,
    ProximoBusComponent,
    MapaComponent,
    ContactanosComponent,
    RutasCrearComponent,
    RutasModificarComponent,
    RutasEliminarComponent,
    ParadasCrearComponent,
    ParadasModificarComponent,
    ParadasEliminarComponent,
    IniciarSesionComponent,
    SuccessComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore(reducer),
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBiyMHD0bwEr3BWtkjaPLG8NqZ4Ht_AEUQ",
      authDomain: "pumakatari-project.firebaseapp.com",
      databaseURL: "https://pumakatari-project.firebaseio.com",
      //projectId: "pumakatari-project",
      storageBucket:
        "pumakatari-project.appspot.com" /*,
      messagingSenderId: "147612482308"*/
    }),
    FormsModule,
    NguiMapModule.forRoot({
      apiUrl:
        "https://maps.google.com/maps/api/js?key=AIzaSyBJ4KQ9Toja55Lqf78LzRDZgEkdBPufSQ8&sensor=false&libraries=drawing"
    }),
    HttpModule
  ],
  providers: [AF, DbService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
