import {Bus} from "./pk-bus";
import {Parada} from "./parada";
export class Ruta {
  private nombre:String
  private buses:Array<Bus>
  private paradas:Array<Parada>

  constructor(o:any) {
    this.buses = o.buses
    this.nombre = o.nombre
    this.paradas = o.paradas
  }

  getBuses():Array<Bus> {
    return this.buses
  }

  setBuses(buses:Array<Bus>):void {
    this.buses = buses
  }

  getNombre():String {
    return this.nombre
  }

  setNombre(nombre:String):void {
    this.nombre = nombre
  }

  getParadas():Array<Parada> {
    return this.paradas
  }

  setParadas(paradas:Array<Parada>):void {
    this.paradas = paradas
  }


}
