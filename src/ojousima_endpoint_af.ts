import { FFTBroadcast } from './fftbroadcast';

const versionStart = 1;
const versionEnd = versionStart + 1;
const typeStart = versionEnd;
const typeEnd = typeStart + 1;
const scaleStart = typeEnd;
const scaleEnd = scaleStart + 2;
const frequencyStart = scaleEnd;
const frequencyEnd = frequencyStart + 2;
const bucketStart = frequencyEnd;
const bucketEnd = bucketStart + 16;

const bytestou16 = (data: Uint8Array): number => {
  const n = data[0] * 256 + data[1];
  return n;
};

const fixed88ToFload = (data: Uint8Array): number => {
  const value: number = bytestou16(data);
  return value / 256;
};

export const dfafparser = (data: Uint8Array): FFTBroadcast => {
  if (0xaf !== data[0]) {
    throw new Error('Not DF AC data');
  }
  const dataFormat = 0xac;
  const version = data[versionStart];
  let type: string = 'unknown';
  switch (data[typeStart]) {
    case 0:
      type = 'X';
    case 1:
      type = 'Y';
    case 2:
      type = 'Z';

    default:
      break;
  }
  const frequency: number = bytestou16(data.slice(frequencyStart, frequencyEnd));
  const scale: number = fixed88ToFload(data.slice(scaleStart, scaleEnd));
  const buckets: number[] = [];
  for (let ii: number = 0; ii < 16; ii++) {
    buckets[ii] = data[bucketStart + ii];
  }

  const id = 0;
  const robject: FFTBroadcast = new FFTBroadcast(
    id,
    null,
    version,
    type,
    scale,
    frequency,
    buckets,
    null,
    null,
    dataFormat,
  );
  return robject;
};
