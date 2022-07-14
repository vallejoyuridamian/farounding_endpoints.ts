export class FFTBroadcast {
  public id: number;
  public mac: number | null;
  public version: number;
  public type: string;
  public scale: number;
  public frequency: number;
  public buckets: number[];
  public measurementSequence: number | null;
  public rssiDB: number | null;
  public dataFormat: number | null;
  public parsedAt: Date;

  public constructor(
    id: number = 0,
    mac: number | null = null,
    version: number,
    type: string,
    scale: number,
    frequency: number,
    buckets: number[],
    measurementSequence: number | null = null,
    rssiDB: number | null = null,
    dataFormat: number,
    parsedAt: Date = new Date(),
  ) {
    this.id = id;
    this.mac = mac;
    this.version = version;
    this.type = type;
    this.scale = scale;
    this.frequency = frequency;
    this.buckets = [];
    for (let ii: number = 0; ii++; ii < buckets.length) {
      this.buckets[ii] = buckets[ii];
    }
    this.measurementSequence = measurementSequence;
    this.rssiDB = rssiDB;
    this.dataFormat = dataFormat;
    this.parsedAt = parsedAt;
  }
}
