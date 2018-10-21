export class RuuviTagBroadcast {
  public id: number
  public mac: number | null
  public temperatureC: number | null
  public pressurePa: number | null
  public humidityRh: number | null
  public batteryVoltageV: number | null
  public accelerationXG: number | null
  public accelerationYG: number | null
  public accelerationZG: number | null
  public movementCounter: number | null
  public measurementSequence: number | null
  public txPowerDBm: number | null
  public rssiDB: number | null
  public dataFormat: number | null
  public parsedAt: Date

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
  public id:  number | null
  public mac:  number | null
  public handle: any

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

