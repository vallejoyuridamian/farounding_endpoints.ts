import { RuuviTagBroadcast } from '../ruuvitagbroadcast';
import { df5parser } from '../ruuvi_endpoint_5';

/* https://gist.github.com/tauzen/3d18825ae41ff3fc8981 */
function hexStringToByte(str: string): Uint8Array {
  if (!str) {
    return new Uint8Array(0);
  }

  let a: number[] = [];
  for (let i: number = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(a);
}

test('test_df5decode_is_valid', () => {
  const data_format = '05'
  const temp = '12FC'
  const humidity = '5394'
  const pressure = 'C37C'
  const accX = '0004'
  const accY = 'FFFC'
  const accZ = '040C'
  const power_info = 'AC36'
  const movement_counter = '42'
  const measurement_sequence = '00CD'
  const mac = 'CBB8334C884F'
  const data: Uint8Array = hexStringToByte(data_format + temp + humidity + pressure + accX + accY + accZ + power_info + movement_counter + measurement_sequence +mac);
  let tag: RuuviTagBroadcast = df5parser(data);

  expect(tag.dataFormat).toBe(5);

  expect(tag.temperatureC).toBeCloseTo(24.30, 2);
  expect(tag.humidityRh).toBeCloseTo(53.49, 2);
  expect(tag.pressurePa).toBeCloseTo(100044, 1);
  expect(tag.accelerationXG).toBeCloseTo(0.004, 3);
  expect(tag.accelerationYG).toBeCloseTo(-0.004, 3);
  expect(tag.accelerationZG).toBeCloseTo(1.036, 3);
  expect(tag.txPowerDBm).toBe(4);
  expect(tag.batteryVoltageV).toBeCloseTo(2.977, 3);
  expect(tag.movementCounter).toBe(66);
  expect(tag.measurementSequence).toBe(205);
  expect(tag.mac).toBe(0xcbb8334c884f);
});
/*
test('test_df5decode_is_valid_max_values', () => {
  let humidity: string = 'C8';
  let temp: string = '7F63';
  let pressure: string = 'FFFF';
  let accX: string = '03E8';
  let accY: string = '03E8';
  let accZ: string = '03E8';
  let batt: string = 'FFFF';
  let data: Uint8Array = hexStringToByte('03' + humidity + temp + pressure + accX + accY + accZ + batt);

  let tag: RuuviTagBroadcast = df3parser(data);
  expect(tag.dataFormat).toBe(3);
  expect(tag.temperatureC).toBeCloseTo(127.99, 2);
  expect(tag.pressurePa).toBe(115535);
  expect(tag.humidityRh).toBe(100.0);
  expect(tag.batteryVoltageV).toBeCloseTo(65.535, 3);
  expect(tag.accelerationXG).toBeCloseTo(1.0, 3);
  expect(tag.accelerationYG).toBeCloseTo(1.0, 3);
  expect(tag.accelerationZG).toBeCloseTo(1.0, 3);
});

test('test_df5decode_is_valid_min_values', () => {
  let humidity: string = '00';
  let temp: string = 'FF63';
  let pressure: string = '0000';
  let accX: string = 'FC18';
  let accY: string = 'FC18';
  let accZ: string = 'FC18';
  let batt: string = '0000';
  let data: Uint8Array = hexStringToByte('03' + humidity + temp + pressure + accX + accY + accZ + batt);

  let tag: RuuviTagBroadcast = df3parser(data);
  expect(tag.dataFormat).toBe(3);
  expect(tag.temperatureC).toBeCloseTo(-127.99, 2);
  expect(tag.pressurePa).toBe(50000);
  expect(tag.humidityRh).toBeCloseTo(0.0, 1);
  expect(tag.batteryVoltageV).toBeCloseTo(0, 1);
  expect(tag.accelerationXG).toBeCloseTo(-1.0, 3);
  expect(tag.accelerationYG).toBeCloseTo(-1.0, 3);
  expect(tag.accelerationZG).toBeCloseTo(-1.0, 3);
});
*/