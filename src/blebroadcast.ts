import * as Noble from 'noble';
import { BatteryBroadcast } from './batterybroadcast';
import { RuuviTagBroadcast } from './ruuvitagbroadcast';

export class BleBroadcast {
  public data: BatteryBroadcast | RuuviTagBroadcast;
  public peripheral: Noble.Peripheral;
}
