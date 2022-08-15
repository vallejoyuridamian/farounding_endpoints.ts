export class AccelerationBroadcast {
  public id: number;
  public mac: number | null;
  public version: number | null;
  public p2pXG: number | null;
  public p2pYG: number | null;
  public p2pZG: number | null;
  public rmsXG: number | null;
  public rmsYG: number | null;
  public rmsZG: number | null;
  public devXG: number | null;
  public devYG: number | null;
  public devZG: number | null;
  public batteryVoltageV: number | null;
  public temperatureC: number | null;
  public measurementSequence: number | null;
  public rssiDB: number | null;
  public dataFormat: number | null;
  public parsedAt: Date;

  public constructor(
    id: number = 0,
    mac: number | null = null,
    version: number | null = null,
    p2pXG: number | null = null,
    p2pYG: number | null = null,
    p2pZG: number | null = null,
    rmsXG: number | null = null,
    rmsYG: number | null = null,
    rmsZG: number | null = null,
    devXG: number | null = null,
    devYG: number | null = null,
    devZG: number | null = null,
    batteryVoltageV: number | null = null,
    temperatureC: number | null = null,
    measurementSequence: number | null = null,
    rssiDB: number | null = null,
    dataFormat: number | null = null,
    parsedAt: Date = new Date(),
  ) {
    this.id = id;
    this.mac = mac;
    this.version = version;
    this.p2pXG = p2pXG;
    this.p2pYG = p2pYG;
    this.p2pZG = p2pZG;
    this.rmsXG = rmsXG;
    this.rmsYG = rmsYG;
    this.rmsZG = rmsZG;
    this.devXG = devXG;
    this.devYG = devYG;
    this.devZG = devZG;
    this.batteryVoltageV = batteryVoltageV;
    this.temperatureC = temperatureC;
    this.measurementSequence = measurementSequence;
    this.rssiDB = rssiDB;
    this.dataFormat = dataFormat;
    this.parsedAt = parsedAt;
  }
}
