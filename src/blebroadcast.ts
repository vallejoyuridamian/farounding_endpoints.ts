import { BatteryBroadcast } from './batterybroadcast';
import { RuuviTagBroadcast } from './ruuvitagbroadcast';

export class BleBroadcast {
  public data: BatteryBroadcast | RuuviTagBroadcast;
  public peripheral: Noble.Peripheral;

  public constructor(data: BatteryBroadcast | RuuviTagBroadcast, peripheral: Noble.Peripheral) {
    this.data = data;
    this.peripheral = peripheral;
  }
}
