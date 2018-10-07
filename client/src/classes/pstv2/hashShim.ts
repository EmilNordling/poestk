// TODO: rewrite the entire thing since it's 200 lines longer than it have to be.
const version = 4;
const availableCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const binderChar = '=';

class ByteEncode {
  dataString = '';

  appendInt(STRING: string, ITERATION: number) {
    const iteration = ITERATION || 4;
    const n = ByteEncode.intToBytes(STRING, iteration);

    for (let i = 0; i < iteration; ++i) {
      this.dataString += String.fromCharCode(n[i]);
    }
  }

  static intToBytes(STRING: string, ITERATION: number) {
    const iteration = ITERATION || 4;
    const byteArray = [];
    let i = iteration;
    let STRINGINT = Number.parseInt(STRING, 10);

    do {
      byteArray[--i] = STRINGINT & 255;
      STRINGINT >>= 8;
    } while (i > 0);

    return byteArray;
  }

  set appendInt16(STRING: string) {
    this.appendInt(STRING, 2);
  }

  set appendInt8(STRING: string) {
    this.appendInt(STRING, 1);
  }
}

class ByteDecode {
  dataString: any;
  position = 0;

  constructor(data) {
    this.dataString = data;
  }

  readInt(ITERATION) {
    const iteration = ITERATION || 4;
    const chunkProgress = this.position + iteration;
    const byteArray = [];

    if (chunkProgress > this.dataString.length) throw new Error('Integer read exceeds bounds');

    for (; this.position < chunkProgress; ++this.position) {
      byteArray.push(this.dataString.charAt(this.position).charCodeAt(0));
    }

    return ByteDecode.bytesToInt(byteArray, iteration);
  }

  static bytesToInt16(STRING: string) {
    return ByteDecode.bytesToInt(STRING, 2);
  }

  static bytesToInt(STRING: string, ITERATION: number) {
    const iteration = ITERATION || 4;
    let deInt = 0;

    for (let i = 0; i < iteration; ++i) {
      deInt += STRING[i];

      if (i < iteration - 1) {
        deInt <<= 8;
      }
    }

    return deInt;
  }

  get readInt8() {
    return this.readInt(1);
  }

  get readInt16() {
    return this.readInt(2);
  }

  get hasData() {
    return this.position < this.dataString.length;
  }
}

class Hash {
  static decodeBase64(STRING: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let stringLength = STRING.length;

      if (stringLength === 0) reject('String is empty');

      if (stringLength % 4 !== 0) reject('Cannot decode base64');

      let binderCharCases = 0;
      let iteration = 0;
      let bitwise;
      const characterArray = [];

      if (STRING.charAt(stringLength - 1) === binderChar) {
        binderCharCases = 1;

        if (STRING.charAt(stringLength - 2) === binderChar) {
          binderCharCases = 2;
        }

        stringLength -= 4;
      }

      for (; iteration < stringLength; iteration += 4) {
        bitwise = (Hash.validCharCode(STRING, iteration) << 18) |
                  (Hash.validCharCode(STRING, iteration + 1) << 12) |
                  (Hash.validCharCode(STRING, iteration + 2) << 6) |
                  (Hash.validCharCode(STRING, iteration + 3));
        characterArray.push(String.fromCharCode(
          bitwise >> 16,
          (bitwise >> 8) & 255,
          bitwise & 255),
        );
      }

      switch (binderCharCases) {
        case 1:
          bitwise = (Hash.validCharCode(STRING, iteration) << 18) |
                    (Hash.validCharCode(STRING, iteration + 1) << 12) |
                    (Hash.validCharCode(STRING, iteration + 2) << 6);
          characterArray.push(String.fromCharCode(bitwise >> 16, (bitwise >> 8) & 255));
          break;
        case 2:
          bitwise = (Hash.validCharCode(STRING, iteration) << 18) |
                    (Hash.validCharCode(STRING, iteration + 1) << 12);
          characterArray.push(String.fromCharCode(bitwise >> 16));
          break;
        default: break;
      }

      resolve(characterArray.join(''));
    });
  }

  static validCharCode(STRING: string, place: number): number {
    const CHARCODE = availableCharacters.indexOf(STRING.charAt(place));

    if (CHARCODE === -1) throw new TypeError('cannot decode base64');

    return CHARCODE;
  }

  static encodeBase64(STRING: string) {
    if (STRING.length === 0) return STRING;

    let iteration = 0;
    let bitwise;
    const CRA = [];
    const maxIteration = STRING.length - (STRING.length % 3);

    for (; iteration < maxIteration; iteration += 3) {
      bitwise = (Hash.charCode(STRING, iteration) << 16) |
                (Hash.charCode(STRING, iteration + 1) << 8) |
                Hash.charCode(STRING, iteration + 2);
      CRA.push(availableCharacters.charAt(bitwise >> 18));
      CRA.push(availableCharacters.charAt((bitwise >> 12) & 63));
      CRA.push(availableCharacters.charAt((bitwise >> 6) & 63));
      CRA.push(availableCharacters.charAt(bitwise & 63));
    }

    switch (STRING.length - maxIteration) {
      case 1:
        bitwise = Hash.charCode(STRING, iteration) << 16;
        CRA.push(availableCharacters.charAt(bitwise >> 18) +
            availableCharacters.charAt((bitwise >> 12) & 63) +
            binderChar +
            binderChar);
        break;
      case 2:
        bitwise = (Hash.charCode(STRING, iteration) << 16) |
                  (Hash.charCode(STRING, iteration + 1) << 8);
        CRA.push(availableCharacters.charAt(bitwise >> 18) +
            availableCharacters.charAt((bitwise >> 12) & 63) +
            availableCharacters.charAt((bitwise >> 6) & 63) +
            binderChar);
        break;
      default: break;
    }

    return CRA.join('');
  }

  static charCode(STRING: string, place: number): number {
    const CHARCODE = STRING.charCodeAt(place);

    if (CHARCODE > 255) throw new TypeError('Invalid character');

    return CHARCODE;
  }
}

export function generateHash(startClass: number, ascendancy: number, nodes: Array<any>): string {
  const encode = new ByteEncode();

  encode.appendInt(version);
  encode.appendInt8 = startClass;
  encode.appendInt8 = ascendancy;
  encode.appendInt8 = 0; // encodes if fullscreen is enabled. Not used.

  for (let node = 0, f = nodes.length; node < f; ++node) {
    encode.appendInt16 = nodes[node].id;
  }

  let link = Hash.encodeBase64(encode.dataString);

  link = link.replace(/\+/g, '-').replace(/\//g, '_');

  return link;
}

export async function decodeHash(HASHSTRING: string) {
  const hashString = HASHSTRING.replace(/-/g, '+').replace(/_/g, '/');
  let decoded;

  try {
    decoded = await Hash.decodeBase64(hashString);
  } catch (error) {
    console.error('faield to decode hash', error);
  }

  const decode = new ByteDecode(decoded);
  const decodedAllocatedNodes = [];
  const decodedVersion = decode.readInt();
  const decodedStartClass = decode.readInt8;
  const decodedAscendancy = decode.readInt8;
  // decodes fullscreen. This step is necessary, else the next step won't decode right.
  const FULLSCREEN = decode.readInt8; // eslint-disable-line no-unused-vars

  if (decodedVersion !== version) throw new Error('The build is using an old version of the Passive Skill Tree');

  while (decode.hasData) decodedAllocatedNodes.push(decode.readInt16);

  return {
    startClass: decodedStartClass,
    ascendancy: decodedAscendancy,
    allocated: decodedAllocatedNodes,
  };
}
