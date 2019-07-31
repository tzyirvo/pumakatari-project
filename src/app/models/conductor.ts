import { Bus } from "./pk-bus";
import { Persona } from "./persona";
export class Conductor extends Persona {
  private bus: Bus;

  constructor(o: any) {
    super(o);
    this.bus = new Bus(o.bus);
  }

  getBus(): Bus {
    return this.bus;
  }

  setBus(bus: Bus): void {
    this.bus = bus;
  }
}
