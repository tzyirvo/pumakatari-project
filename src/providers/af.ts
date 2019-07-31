import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods } from "angularfire2";
import { DatePipe } from "@angular/common";

@Injectable()
export class AF {
  constructor(public af: AngularFire) {}

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
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
    return this.af.database.object("registeredUsers/" + uid).set({
      name: name,
      email: email
    });
  }

  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(email, password) {
    return this.af.auth.login(
      {
        email: email,
        password: password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }
    );
  }

  /**
   * @param {String} name
   * @param {String} email
   * @param {String} message
   * @returns {firebase.Promise<void>}
   */
  addNewMessage(name, email, message) {
    const datePipe = new DatePipe("es-BO");
    return this.af.database.list(`mensajes`).push({
      nombre: name,
      email: email,
      mensaje: message,
      leido: false,
      fecha: datePipe.transform(Date.now(), "dd-MM-yyyy hh:mm:ss")
    });
  }

  /**
   * @param {String} stop
   * @returns {firebase.Promise<void>}
   */
  deleteStop(stop) {
    return this.af.database.object(`paradas/${stop}`).remove();
  }

  /**
   * @param {String} route
   * @returns {firebase.Promise<void>}
   */
  deleteRoute(route) {
    return this.af.database.object(`rutas/${route}`).remove();
  }

  /**
   * @param name
   * @param lat
   * @param lng
   * @returns {firebase.Promise<void>}
   */
  saveNewStop(name, lat, lng) {
    return this.af.database.list(`paradas`).push({
      nombre: name,
      lat: lat,
      lng: lng
    });
  }

  /**
   * @param {Object} stop
   * @returns {firebase.Promise<void>}
   */
  modifyStop(stop) {
    return this.af.database.object(`paradas/${stop.key}`).set({
      nombre: stop.nombre,
      lat: stop.lat,
      lng: stop.lng
    });
  }

  /**
   * @param {Array} overlays
   * @param {Object} selectedRoute
   * @param {Array} selectedPositions
   * @returns {firebase.Promise<void>}
   */
  modifyRoute(overlays, selectedRoute, selectedPositions) {
    const routeStops = {};
    const routeTraces = {};

    for (let i = 0; i < selectedPositions.length; i += 1) {
      routeStops[i] = selectedPositions[i].$key;
    }
    for (let i = 0; i < overlays.length; i += 1) {
      routeTraces[i] = {};
      let j = 0;
      overlays[i].getPath().forEach(path => {
        routeTraces[i][j] = {
          lat: path.lat(),
          lng: path.lng()
        };
        j += 1;
      });
    }

    return this.af.database.object(`rutas/${selectedRoute.$key}`).set({
      nombre: selectedRoute.name,
      paradas: routeStops,
      trazos: routeTraces
    });
  }

  /**
   * @param {Array} overlays
   * @param {String} routeName
   * @param {Array} selectedPositions
   * @returns {firebase.Promise<void>}
   */
  createRoute(overlays, routeName, selectedPositions) {
    const routeStops = {};
    const routeTraces = {};

    for (let i = 0; i < selectedPositions.length; i += 1) {
      routeStops[i] = selectedPositions[i].$key;
    }
    for (let i = 0; i < overlays.length; i += 1) {
      routeTraces[i] = {};
      let j = 0;
      overlays[i].getPath().forEach(path => {
        routeTraces[i][j] = {
          lat: path.lat(),
          lng: path.lng()
        };
        j += 1;
      });
    }

    return this.af.database.list(`rutas`).push({
      nombre: routeName,
      paradas: routeStops,
      trazos: routeTraces
    });
  }
}
