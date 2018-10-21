import { RuuviTagBroadcast } from './ruuvitag'

  const humidityStart      = 1;
  const humidityEnd        = humidityStart+1;
  const temperatureStart   = humidityEnd;
  const temperatureEnd     = temperatureStart+2;
  const pressureStart      = temperatureEnd;
  const pressureEnd        = pressureStart+2;
  const accelerationXStart = pressureEnd;
  const accelerationXEnd   = accelerationXStart+2;
  const accelerationYStart = accelerationXEnd;
  const accelerationYEnd   = accelerationYStart+2;
  const accelerationZStart = accelerationYEnd;
  const accelerationZEnd   = accelerationZStart+2;
  const batteryStart       = accelerationZEnd;
  const batteryEnd         = batteryStart+2;

export const df3parser = (data: Uint8Array): RuuviTagBroadcast =>
{
  let robject: RuuviTagBroadcast = new RuuviTagBroadcast;
  if(3 != data[0]){ throw new Error('Not DF3 data'); }

  let humidity = data[humidityStart];
  humidity/= 2; // scale
  robject.humidityRh = humidity;

  let temperatureBytes = data.slice(temperatureStart, temperatureEnd);
  let temperature = temperatureBytes[0]  // Full degrees
  temperature += temperatureBytes[1]/100.0; // Decimals
  if(temperature > 128){           // Ruuvi format, sign bit + value
    temperature = temperature-128; 
    temperature = 0 - temperature; 
  }
  robject.temperatureC = temperature;

  let pressureBytes = data.slice(pressureStart, pressureEnd)  // uint16_t pascals
  let pressure = (pressureBytes[0]*256) + pressureBytes[1];
  pressure += 50000; // Ruuvi format
  robject.pressurePa = pressure;

  let accelerationBytes = data.slice(accelerationXStart, accelerationXEnd);  // milli-g
  let accelerationX = (accelerationBytes[0]*256) + accelerationBytes[1];
  if(accelerationX > 32767){ accelerationX -= 65536;}  // two's complement

  accelerationBytes = data.slice(accelerationYStart, accelerationYEnd);  // milli-g
  let accelerationY = (accelerationBytes[0]*256) + accelerationBytes[1];
  if(accelerationY > 32767){ accelerationY -= 65536;}  // two's complement

  accelerationBytes = data.slice(accelerationZStart, accelerationZEnd);  // milli-g
  let accelerationZ = (accelerationBytes[0]*256) + accelerationBytes[1];
  if(accelerationZ > 32767){ accelerationZ -= 65536;}  // two's complement

  robject.accelerationXG = accelerationX / 1000.0;
  robject.accelerationYG = accelerationY / 1000.0;
  robject.accelerationZG = accelerationZ / 1000.0;
  
  let batteryBytes = data.slice(batteryStart, batteryEnd);  // milli volts
  let battery = (batteryBytes[0]*256) + batteryBytes[1];
  robject.batteryVoltageV = battery/1000.0;
  robject.dataFormat = 3;

  return robject;
}


