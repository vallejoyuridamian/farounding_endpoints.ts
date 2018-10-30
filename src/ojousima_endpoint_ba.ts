import { BatteryBroadcast } from './batterybroadcast';

const versionStart = 1;
const versionEnd = versionStart + 1;
const temperatureStart = versionEnd;
const temperatureEnd = temperatureStart + 2;
const humidityStart = temperatureEnd;
const humidityEnd = humidityStart + 2;
const simpleStart = humidityEnd;
const simpleEnd = simpleStart + 2;
const radioStart = simpleEnd;
const radioEnd = radioStart + 2;
const droopStart = radioEnd;
const droopEnd = droopStart + 2;
const measurementStart = droopEnd;
const measurementEnd = measurementStart + 2;

export const dfbaparser = (data: Uint8Array): BatteryBroadcast => {
  const robject: BatteryBroadcast = new BatteryBroadcast();
  if (0xba !== data[0]) {
    throw new Error('Not DF BA data');
  }

  robject.dataFormat = 0xba;

  const version = data[versionStart];
  robject.version = version;

  const temperatureBytes = data.slice(temperatureStart, temperatureEnd);
  let temperature = temperatureBytes[0] * 256 + temperatureBytes[1];
  // two's complement
  if (temperature > 32767) {
    temperature -= 65536;
  }
  // Temperature is in units of 0.005 C -> divide by 200
  robject.temperatureC = temperature / 200;

  const humidityBytes = data.slice(humidityStart, humidityEnd);
  const humidity = humidityBytes[0] * 256 + humidityBytes[1];
  // Humidity is in units of 0.0025 % -> divide by 400
  robject.humidityRh = humidity / 400;

  const simpleBytes = data.slice(simpleStart, simpleEnd);
  let simple = simpleBytes[0] * 256 + simpleBytes[1];
  // two's complement
  if (simple > 32767) {
    simple -= 65536;
  }
  robject.simpleVoltageV = simple / 1000;

  const radioBytes = data.slice(radioStart, radioEnd);
  let radio = radioBytes[0] * 256 + radioBytes[1];
  // two's complement
  if (radio > 32767) {
    radio -= 65536;
  }
  robject.radioVoltageV = radio / 1000;

  const droopBytes = data.slice(droopStart, droopEnd);
  let droop = droopBytes[0] * 256 + droopBytes[1];
  // two's complement
  if (droop > 32767) {
    droop -= 65536;
  }
  robject.droopVoltageV = droop / 1000;

  const measurementBytes = data.slice(measurementStart, measurementEnd);
  const measurement = measurementBytes[0] * 256 + measurementBytes[1];
  robject.measurementSequence = measurement;

  return robject;
};
