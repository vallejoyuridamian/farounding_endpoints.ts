import { AES, ModeOfOperation } from 'aes-js';
import { RuuviTagBroadcast } from './ruuvitagbroadcast';


const dataFormatStart = 0;
const dataFormatEnd = dataFormatStart + 1;
const versionStart = dataFormatEnd;
const versionEnd = versionStart + 1;
const versionInvalid = 255;

/**
 * Indexes relative to encrypted sect
 */
const addressStart = 0;
const addressEnd = addressStart + 6;
const addressInvalid = 0xffffffffffff;

const humidityStart = addressEnd;
const humidityEnd = humidityStart + 1;
const humidityInvalid = 255;

const temperatureStart = humidityEnd;
const temperatureEnd = temperatureStart + 2;
const temperatureInvalid = -32768;

const pressureStart = humidityEnd;
const pressureEnd = pressureStart + 2;
const pressureInvalid = 65535;

const batteryStart = pressureEnd;
const batteryEnd = batteryStart + 2;

const sequenceStart = batteryEnd;
const sequenceEnd = sequenceStart + 2;
const sequenceInvalid = 0xffff;

export const dffeparser = (data: Uint8Array): RuuviTagBroadcast => {
  if (data.length < addressEnd - 1 || 0xfe !== data[0]) {
    throw new Error('Not DF5 data');
  }
  if (0x02 !== data[versionStart]) {
    throw new Error('Unsupported version ' + data[versionStart].toString(16));
  }
  const robject: RuuviTagBroadcast = new RuuviTagBroadcast();
  robject.dataFormat = data[dataFormatStart];
    let humidity = data[humidityStart];
  humidity /= 2; // scale
  robject.humidityRh = humidity;

  const temperatureBytes = data.slice(temperatureStart, temperatureEnd);
  let temperature = temperatureBytes[0]; // Full degrees
  temperature += temperatureBytes[1] / 100.0; // Decimals
  if (temperature > 128) {
    // Ruuvi format, sign bit + value
    temperature = temperature - 128;
    temperature = 0 - temperature;
  }
  robject.temperatureC = temperature;

  const pressureBytes = data.slice(pressureStart, pressureEnd); // uint16_t pascals
  let pressure = pressureBytes[0] * 256 + pressureBytes[1];
  pressure += 50000; // Ruuvi format
  robject.pressurePa = pressure;

  const sequenceBytes = data.slice(sequenceStart, sequenceEnd);
  const sequence = sequenceBytes[0] * 256 + sequenceBytes[1];
  robject.measurementSequence = sequenceInvalid === sequence ? null : sequence;

  const addressBytes = data.slice(addressStart, addressEnd);

  // Sorry, but lint says so.
  const address =
    addressBytes[0] * 256 * 256 * 256 * 256 * 256 +
    addressBytes[1] * 256 * 256 * 256 * 256 +
    addressBytes[2] * 256 * 256 * 256 +
    addressBytes[3] * 256 * 256 +
    addressBytes[4] * 256 +
    addressBytes[5];
  robject.mac = addressInvalid === address ? null : address;

  return robject;
};

/*
 * @brief Unencrypt data with the basepassword and unique password.
 *
 * For example data version 2 has default password of "ruuvi.com\0" + device mac.
 * Convert ASCII (NOT UTF-8!) string of "ruuvi.com\0" to Uint8Array and use it as a basepw
 * Add device mac as unique pw. Returns complete data in unencrypted form as Uint8Array
 *
 * @param data complete manufacturer data to be unencrypted, starting from header byte
 * @param basepw: Base password used in encryption
 * @param unitpw: Unit-specific password used in encryption. 
 */
export const dffeunencrypter = (data: Uint8Array, basepw: Uint8Array, unitpw: Uint8Array): Uint8Array => {
  if(16 !== (basepw.length + unitpw.length)
  {
    throw new Error("Invalid base+unit password length. Expected 16, got " + (basepw.length + unitpw.length).toString());
  }
  const key: Uint8Array = new Uint8Array(basepw.length + unitpw.length);
  key.set(basepw);
  key.set(unitpw, basepw.length);

  const aesEcb = new ModeOfOperation.ecb(key);

  // All fe data starts with header + version, followed by encrypted 16-byte payload
  const encryptedBytes: Uint8Array = data.subarray(2, 2+16);

  // Since electronic codebook does not store state, we can
  // reuse the same instance.
  const decryptedBytes: Uint8Array = aesEcb.decrypt(encryptedBytes);

  return decryptedBytes;
}
