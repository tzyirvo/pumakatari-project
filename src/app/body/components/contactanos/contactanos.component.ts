import { Component, OnInit, ElementRef } from '@angular/core';
import {AF} from "../../../../providers/af";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html'
})
export class ContactanosComponent implements OnInit {
  public error:any;

  constructor(private msgService:MessageService, public afService:AF, private elRef:ElementRef) { }

  ngOnInit() {
  }

  sendMessage(event, name, email, message) {
    this.afService.addNewMessage(name, email, message)
      .then(() => {
        this.clearFields()
        this.msgService.showSuccessMessage('Mensaje enviado correctamente!')
      })
      .catch((error:any) => {
        if (error) {
          this.error = error;
          console.error(this.error);
          this.msgService.showErrorMessage('Se produjo un error al enviar el mensaje, intente nuevamente!')
        }
      })
  }

  clearFields() {
    //@TODO
  }

  ngAfterViewInit() {
    let classList = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList
    classList.remove('inicio-tab')
    classList.add('other-tab')
  }

}
