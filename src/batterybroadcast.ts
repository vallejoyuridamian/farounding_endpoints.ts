export class BatteryBroadcast {
  public id: number;
  public mac: number | null;
  public version: number | null;
  public temperatureC: number | null;
  public humidityRh: number | null;
  public simpleVoltageV: number | null;
  public radioVoltageV: number | null;
  public droopVoltageV: number | null;
  public measurementSequence: number | null;
  public rssiDB: number | null;
  public dataFormat: number | null;
  public parsedAt: Date;

  public constructor(
    id: number = 0,
    mac: number | null = null,
    version: number | null = null,
    temperatureC: number | null = null,
    humidityRh: number | null = null,
    simpleVoltageV: number | null = null,
    radioVoltageV: number | null = null,
    droopVoltageV: number | null = null,
    measurementSequence: number | null = null,
    rssiDB: number | null = null,
    dataFormat: number | null = null,
    parsedAt: Date = new Date(),
  ) {
    this.id = id;
    this.mac = mac;
    this.version = version;
    this.temperatureC = temperatureC;
    this.humidityRh = humidityRh;
    this.simpleVoltageV = simpleVoltageV;
    this.radioVoltageV = radioVoltageV;
    this.droopVoltageV = droopVoltageV;
    this.measurementSequence = measurementSequence;
    this.rssiDB = rssiDB;
    this.dataFormat = dataFormat;
    this.parsedAt = parsedAt;
  }
}
