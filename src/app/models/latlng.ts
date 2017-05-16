export class LatLng {
  constructor(public lat:number, public lng:number) {
  }

  getLat():number {
    return this.lat;
  }

  setLat(lat:number) {
    this.lat = lat;
  }

  getLng():number {
    return this.lng;
  }

  setLng(lng:number) {
    this.lng = lng;
  }
}
