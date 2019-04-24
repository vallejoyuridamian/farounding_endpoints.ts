import { AccelerationBroadcast } from './accelerationbroadcast';
import { BatteryBroadcast } from './batterybroadcast';
import { dfacparser } from './ojousima_endpoint_ac';
import { dfbaparser } from './ojousima_endpoint_ba';
import { dffeparser } from './ojousima_endpoint_fe';
import { df3parser } from './ruuvi_endpoint_3';
import { df5parser } from './ruuvi_endpoint_5';
import { RuuviTagBroadcast } from './ruuvitagbroadcast';

export * from './accelerationbroadcast';
export * from './batterybroadcast';
export * from './blebroadcast';
export * from './ojousima_endpoint_ac';
export * from './ojousima_endpoint_ba';
export * from './ruuvitagbroadcast';
export * from './ruuvi_endpoint_3';
export * from './ruuvi_endpoint_5';

/**
 * Return correct parser for given data
 *
 * @parameter data: Uint8Array to parse, starting with header byte
 */
export type manufacturerDataParser = (data: Uint8Array) => AccelerationBroadcast | RuuviTagBroadcast | BatteryBroadcast;

export function getParser(data: Uint8Array): manufacturerDataParser {
  let parser: manufacturerDataParser;
  if (3 === data[0]) {
    parser = df3parser;
  } else if (0x05 === data[0]) {
    parser = df5parser;
  } else if (0xba === data[0]) {
    parser = dfbaparser;
  } else if (0xac === data[0]) {
    parser = dfacparser;
  } else if (0xfe === data[0]) {
    parser = dffeparser;
  } else {
    throw new Error('Unknown data');
  }
  return parser;
}
