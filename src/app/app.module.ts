import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //AngularFireModule.initializeApp({
    //  apiKey: "AIzaSyDFbuKX0UeXje-PRAvwIymYo2jk-uGqMa4",
    //  authDomain: "test-bc800.firebaseapp.com",
    //  databaseURL: "https://test-bc800.firebaseio.com",
    //  storageBucket: ""
    //}),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBiyMHD0bwEr3BWtkjaPLG8NqZ4Ht_AEUQ",
      authDomain: "pumakatari-project.firebaseapp.com",
      databaseURL: "https://pumakatari-project.firebaseio.com",
      //projectId: "pumakatari-project",
      storageBucket: "pumakatari-project.appspot.com",
      messagingSenderId: "147612482308"
    }),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
