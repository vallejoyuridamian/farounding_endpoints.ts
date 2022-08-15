import { AccelerationBroadcast } from '../accelerationbroadcast';
import { dfacparser } from '../ojousima_endpoint_ac';

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
  let data: Uint8Array = hexStringToByte('AC00007900790079007900790079007900790079AF000001');
  let tag: AccelerationBroadcast = dfacparser(data);
  expect(tag.version).toBe(0);
  expect(tag.dataFormat).toBe(0xac);
  expect(tag.p2pXG).toBeCloseTo(0.121, 3);
  expect(tag.p2pYG).toBeCloseTo(0.121, 3);
  expect(tag.p2pZG).toBeCloseTo(0.121, 3);
  expect(tag.rmsXG).toBeCloseTo(0.121, 2);
  expect(tag.rmsYG).toBeCloseTo(0.121, 2);
  expect(tag.rmsZG).toBeCloseTo(0.121, 3);
  expect(tag.devXG).toBeCloseTo(0.121, 2);
  expect(tag.devYG).toBeCloseTo(0.121, 2);
  expect(tag.devZG).toBeCloseTo(0.121, 3);
  expect(tag.batteryVoltageV).toBeCloseTo(3.0, 3);
  expect(tag.measurementSequence).toBe(1);
});
