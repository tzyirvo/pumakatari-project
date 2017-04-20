import { Component, OnInit, ElementRef } from '@angular/core';
import {AF} from "../../../../providers/af";

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html'
})
export class ContactanosComponent implements OnInit {
  public error:any;

  constructor(public afService:AF, private elRef:ElementRef) { }

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

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('inicio-tab')
    classList.add('other-tab')
  }

}
