import { BatteryBroadcast } from '../batterybroadcast';
import { dfbaparser } from '../ojousima_endpoint_ba';

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

test('test_dfbadecode_is_valid', () => {
  let data: Uint8Array = hexStringToByte('BA01F02E4EE80BB80BB801000001');
  let tag: BatteryBroadcast = dfbaparser(data);
  expect(tag.version).toBe(1);
  expect(tag.dataFormat).toBe(0xba);
  expect(tag.temperatureC).toBeCloseTo(-20.25, 2);
  expect(tag.humidityRh).toBeCloseTo(50.5, 2);
  expect(tag.simpleVoltageV).toBeCloseTo(3.0, 3);
  expect(tag.radioVoltageV).toBeCloseTo(3.0, 3);
  expect(tag.droopVoltageV).toBeCloseTo(0.256, 3);
  expect(tag.measurementSequence).toBe(1);
});
