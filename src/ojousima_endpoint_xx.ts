import { RuuviTagBroadcast } from './ruuvitagbroadcast';

const dataFormatStart = 0;
const dataFormatEnd = dataFormatStart + 1;

export const dfxxparser = (data: Uint8Array): RuuviTagBroadcast => {

  const robject: RuuviTagBroadcast = new RuuviTagBroadcast();
  robject.dataFormat = data[dataFormatStart];

  return robject;
};
