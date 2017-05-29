import {LatLng} from "./latlng";
export class Parada {
  private name:String
  private position:LatLng
  private key:String

  constructor(o:any) {
    this.name = o.nombre
    this.position = new LatLng(o.lat, o.lng)
    this.key = o.$key
  }

  getName():String {
    return this.name
  }

  setName(name:String):void {
    this.name = name
  }

  getPosition():LatLng {
    return this.position
  }

  setPosition(position:LatLng):void {
    this.position = position
  }

  getKey():String {
    return this.key
  }

  setKey(key:String):void {
    this.key = key
  }

  getPositionText():String {
    return '' + this.getPosition().getLat() + ',' + this.getPosition().getLng()
  }

  getPositionObject():any {
    return {
      latLng: this.getPosition().getLatLng(),
      name: this.getName(),
      $key: this.getKey()
    };
  }
}
