import * as Noble from 'noble';
import { AccelerationBroadcast } from './accelerationbroadcast';
import { BatteryBroadcast } from './batterybroadcast';
import { RuuviTagBroadcast } from './ruuvitagbroadcast';

export class BleBroadcast {
  public readonly data: AccelerationBroadcast | BatteryBroadcast | RuuviTagBroadcast;
  public readonly peripheral: Noble.Peripheral;
  public readonly manufacturerId: number;

  public constructor(
    data: AccelerationBroadcast | BatteryBroadcast | RuuviTagBroadcast | null,
    peripheral: Noble.Peripheral,
    manufacturer: number | null,
  ) {
    if (null !== data) {
      this.data = data;
    } else {
      this.data = new RuuviTagBroadcast();
    }
    this.peripheral = peripheral;
    if (null !== manufacturer) {
      this.manufacturerId = manufacturer;
    } else {
      this.manufacturerId = 0xffff;
    }
  }
}
