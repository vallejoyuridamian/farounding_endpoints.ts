export class RuuviTagBroadcast {
  id: number
  mac: number | null
  temperatureC: number | null
  pressurePa: number | null
  humidityRh: number | null
  batteryVoltageV: number | null
  accelerationXG: number | null
  accelerationYG: number | null
  accelerationZG: number | null
  movementCounter: number | null
  measurementSequence: number | null
  txPowerDBm: number | null
  rssiDB: number | null
  dataFormat: number | null
  parsedAt: Date

  public constructor(
    id: number = 0,
    mac: number | null = null,
    temperatureC: number | null = null,
    pressurePa: number | null = null,
    humidityRh: number | null = null,
    batteryVoltageV: number | null = null,
    accelerationXG: number | null = null,
    accelerationYG: number | null = null,
    accelerationZG: number | null = null,
    movementCounter: number | null = null,
    measurementSequence: number | null = null,
    txPowerDBm: number | null = null,
    rssiDB: number | null = null,
    dataFormat: number | null = null,
    parsedAt: Date = new Date()
    ) 
  {
    this.id = id;
    this.mac = mac;
    this.temperatureC = temperatureC;
    this.pressurePa = pressurePa;
    this.humidityRh = humidityRh;
    this.batteryVoltageV = batteryVoltageV;
    this.accelerationXG = accelerationXG;
    this.accelerationYG = accelerationYG;
    this.accelerationZG = accelerationZG;
    this.movementCounter = movementCounter;
    this.measurementSequence = measurementSequence;
    this.txPowerDBm = txPowerDBm;
    this.rssiDB = rssiDB;
    this.dataFormat = dataFormat;
    this.parsedAt = parsedAt
  }
};

export class RuuviTagDevice {
  id:  number | null
  mac:  number | null
  handle: any

  public constructor(
    id: number = 0,
    mac: number | null = null,
    handle: any = null
    ) 
  {
    this.id = id;
    this.mac = mac;
    this.handle = handle
  }
};

