import * as Noble from 'noble';
import { BatteryBroadcast } from './batterybroadcast';
import { RuuviTagBroadcast } from './ruuvitagbroadcast';

export class BleBroadcast {
  public data: BatteryBroadcast | RuuviTagBroadcast;
  public peripheral: Noble.Peripheral;

  public constructor(
    _data: BatteryBroadcast | RuuviTagBroadcast,
    _peripheral: Noble.Peripheral
    )
  {
    this.data = _data;
    this.peripheral = _peripheral;
  }
}
