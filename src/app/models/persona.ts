import { Bus } from "./pk-bus";
export class Persona {
  private nombre: String;
  private apellido: String;
  private ci: String;
  private email: String;
  private rol: String;

  constructor(o: any) {
    this.nombre = o.nombre;
    this.apellido = o.apellido;
    this.ci = o.ci;
    this.email = o.email;
    this.rol = o.rol;
  }

  getNombre(): String {
    return this.nombre;
  }

  setNombre(nombre: String): void {
    this.nombre = nombre;
  }

  getApellido(): String {
    return this.apellido;
  }

  setApellido(apellido: String): void {
    this.apellido = apellido;
  }

  getCi(): String {
    return this.ci;
  }

  setCi(ci: String): void {
    this.ci = ci;
  }

  getEmail(): String {
    return this.email;
  }

  setEmail(email: String): void {
    this.email = email;
  }

  getRol(): String {
    return this.rol;
  }

  setRol(rol: String): void {
    this.rol = rol;
  }
}
