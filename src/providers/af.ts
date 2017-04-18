import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import { DatePipe } from '@angular/common';

@Injectable()
export class AF {

  constructor(public af:AngularFire) {
  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
  }

  /**
   * Calls the AngularFire2 service to register a new user
   * @param {string} email
   * @param {string} password
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    console.log(email);
    return this.af.auth.createUser({
      email: email,
      password: password
    });
  }

  /**
   * Saves information to display to screen when user is logged in
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email) {
    return this.af.database.object('registeredUsers/' + uid).set({
      name: name,
      email: email,
    });
  }

  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(email, password) {
    return this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  /**
   * @param {String} name
   * @param {String} email
   * @param {String} message
   * @returns {firebase.Promise<void>}
   */
  addNewMessage(name, email, message) {
    var datePipe = new DatePipe('es-BO');
    return this.af.database.list(`mensajes`).push({
      nombre: name,
      email: email,
      mensaje: message,
      leido: false,
      fecha: datePipe.transform(Date.now(), 'dd-MM-yyyy hh:mm:ss')
    })
  }

}
