export class LatLng {
  constructor(private lat: number, private lng: number) {}

  getLat(): number {
    return this.lat;
  }

  setLat(lat: number) {
    this.lat = lat;
  }

  getLng(): number {
    return this.lng;
  }

  setLng(lng: number) {
    this.lng = lng;
  }

  getLanLngObject(): any {
    return {
      lat: this.getLat(),
      lng: this.getLng()
    };
  }

  getLatLng(): any {
    return [this.getLat(), this.getLng()];
  }
}
