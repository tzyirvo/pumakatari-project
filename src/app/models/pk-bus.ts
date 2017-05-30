import {Conductor} from "./admin";
import {LatLng} from "./latlng";
export class Bus {
  //
  private conductor:Conductor
  private placa:String
  private posicion:LatLng

  constructor(o:any) {
    this.conductor = new Conductor(o.conductor)
    this.placa = o.placa
    this.posicion = new LatLng(o.lat, o.lng)
  }

  getConductor():Conductor {
    return this.conductor
  }

  setConductor(conductor:Conductor):void {
    this.conductor = conductor
  }

  getPlaca():String {
    return this.placa
  }

  setPlaca(placa:String):void {
    this.placa = placa
  }

  getPosicion():LatLng {
    return this.posicion
  }

  setPosicion(posicion:LatLng):void {
    this.posicion = posicion
  }


}
