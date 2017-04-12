import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SideBarComponent } from './body/components/side-bar/side-bar.component';
import { ContentComponent } from './body/components/content/content.component';
import { InicioComponent } from './body/components/inicio/inicio.component';
import { RutasComponent } from './body/components/rutas/rutas.component';
import { ParadasComponent } from './body/components/paradas/paradas.component';
import { ParadaMasCercanaComponent } from './body/components/parada-mas-cercana/parada-mas-cercana.component';
import { ProximoBusComponent } from './body/components/proximo-bus/proximo-bus.component';
import { MapaComponent } from './body/components/mapa/mapa.component';
import { ContactanosComponent } from './body/components/contactanos/contactanos.component';

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
    ContactanosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBiyMHD0bwEr3BWtkjaPLG8NqZ4Ht_AEUQ",
      authDomain: "pumakatari-project.firebaseapp.com",
      databaseURL: "https://pumakatari-project.firebaseio.com",
      //projectId: "pumakatari-project",
      storageBucket: "pumakatari-project.appspot.com",
      messagingSenderId: "147612482308"
    }),
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJ4KQ9Toja55Lqf78LzRDZgEkdBPufSQ8'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
