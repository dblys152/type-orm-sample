import { v4 as uuidv4 } from 'uuid';

export class IdGenerator {

  constructor() {};

  public generateRandomId(): string {
    const now = new Date();
    const uuid = uuidv4({
      node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
      clockseq: 0x1234,
      msecs: now.getTime(),
      nsecs: now.getMilliseconds() * 1000000
    });
    return uuid;
  }
}