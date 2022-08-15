import { AccelerationBroadcast } from './accelerationbroadcast';

const versionStart = 1;
const versionEnd = versionStart + 1;
const p2pXStart = versionEnd;
const p2pXEnd = p2pXStart + 2;
const p2pYStart = p2pXEnd;
const p2pYEnd = p2pYStart + 2;
const p2pZStart = p2pYEnd;
const p2pZEnd = p2pZStart + 2;
const rmsXStart = p2pZEnd;
const rmsXEnd = rmsXStart + 2;
const rmsYStart = rmsXEnd;
const rmsYEnd = rmsYStart + 2;
const rmsZStart = rmsYEnd;
const rmsZEnd = rmsZStart + 2;
const devXStart = rmsZEnd;
const devXEnd = devXStart + 2;
const devYStart = devXEnd;
const devYEnd = devYStart + 2;
const devZStart = devYEnd;
const devZEnd = devZStart + 2;
const batteryVStart = devZEnd;
const batteryVEnd = batteryVStart + 2;
const measurementStart = batteryVEnd;
const measurementEnd = measurementStart + 2;

const bytestou16 = (data: Uint8Array): number => {
  const n = data[0] * 256 + data[1];
  // Number is in units of 0.001 G -> divide by 1000
  return n / 1000;
};

export const dfacparser = (data: Uint8Array): AccelerationBroadcast => {
  if (0xac !== data[0]) {
    throw new Error('Not DF AC data');
  }
  const robject: AccelerationBroadcast = new AccelerationBroadcast();
  robject.dataFormat = 0xac;

  const version = data[versionStart];
  robject.version = version;

  robject.p2pXG = bytestou16(data.slice(p2pXStart, p2pXEnd));
  robject.p2pYG = bytestou16(data.slice(p2pYStart, p2pYEnd));
  robject.p2pZG = bytestou16(data.slice(p2pZStart, p2pZEnd));

  robject.rmsXG = bytestou16(data.slice(rmsXStart, rmsXEnd));
  robject.rmsYG = bytestou16(data.slice(rmsYStart, rmsYEnd));
  robject.rmsZG = bytestou16(data.slice(rmsZStart, rmsZEnd));

  robject.devXG = bytestou16(data.slice(devXStart, devXEnd));
  robject.devYG = bytestou16(data.slice(devYStart, devYEnd));
  robject.devZG = bytestou16(data.slice(devZStart, devZEnd));

  const batteryBytes = data.slice(batteryVStart, batteryVStart + 1);
  robject.batteryVoltageV = (batteryBytes[0] * 256 + 1600) / 1000;

  const measurementBytes = data.slice(measurementStart, measurementEnd);
  const measurement = measurementBytes[0] * 256 + measurementBytes[1];
  robject.measurementSequence = measurement;

  return robject;
};
