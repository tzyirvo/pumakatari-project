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

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
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
