import { Component, OnInit } from '@angular/core';
import {AF} from "../../../../providers/af";

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html'
})
export class ContactanosComponent implements OnInit {
  public error:any;

  constructor(public afService:AF) { }

  ngOnInit() {
  }

  sendMessage(event, name, email, message) {
    this.afService.addNewMessage(name, email, message)
      .then(() => {
        this.clearFields()
        this.setSuccessMsg()
      })
      .catch((error:any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
          this.setErrorMsg()
        }
      })
  }

  setSuccessMsg() {
    //@TODO
  }

  setErrorMsg() {
    //@TODO
  }

  clearFields() {
    //@TODO
  }

}
