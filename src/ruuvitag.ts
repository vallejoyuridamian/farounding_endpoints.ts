export class RuuviTagBroadcast {
  id: number
  mac: number | null
  temperature_c: number | null
  pressure_pa: number | null
  humidity_rh: number | null
  batteryVoltage_v: number | null
  accelerationX_g: number | null
  accelerationY_g: number | null
  accelerationZ_g: number | null
  movementCounter: number | null
  measurementSequence: number | null
  txPower_dbm: number | null
  rssi_db: number | null
  dataFormat: number | null
  parsedAt: Date

  public constructor(
    id: number = 0,
    mac: number | null = null,
    temperature_c: number | null = null,
    pressure_pa: number | null = null,
    humidity_rh: number | null = null,
    batteryVoltage_v: number | null = null,
    accelerationX_g: number | null = null,
    accelerationY_g: number | null = null,
    accelerationZ_g: number | null = null,
    movementCounter: number | null = null,
    measurementSequence: number | null = null,
    txPower_dbm: number | null = null,
    rssi_db: number | null = null,
    dataFormat: number | null = null,
    parsedAt: Date = new Date()
    ) 
  {
    this.id = id;
    this.mac = mac;
    this.temperature_c = temperature_c;
    this.pressure_pa = pressure_pa;
    this.humidity_rh = humidity_rh;
    this.batteryVoltage_v = batteryVoltage_v;
    this.accelerationX_g = accelerationX_g;
    this.accelerationY_g = accelerationY_g;
    this.accelerationZ_g = accelerationZ_g;
    this.movementCounter = movementCounter;
    this.measurementSequence = measurementSequence;
    this.txPower_dbm = txPower_dbm;
    this.rssi_db = rssi_db;
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

