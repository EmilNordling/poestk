/**
* @fileoverview Hash encoder & decoder.
*/

const version = 4;
const availableCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const binderChar = '=';

class ByteEncode {
  constructor() {
    this.dataString = '';
  }

  /**
   * @param {string} STRING
   * @param {number} ITERATION
   */
  appendInt(STRING, ITERATION) {
    const iteration = ITERATION || 4;
    const n = ByteEncode.intToBytes(STRING, iteration);

    for (let i = 0; i < iteration; ++i) {
      this.dataString += String.fromCharCode(n[i]);
    }
  }

  /**
   * @param {string} STRING
   * @param {number} ITERATION
   */
  static intToBytes(STRING, ITERATION) {
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

  /**
   * @param {string} STRING
   */
  set appendInt16(STRING) {
    this.appendInt(STRING, 2);
  }

  /**
   * @param {string} STRING
   */
  set appendInt8(STRING) {
    this.appendInt(STRING, 1);
  }
}

class ByteDecode {
  constructor(data) {
    this.dataString = data;
    this.position = 0;
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

  /**
   * @param {string} STRING
   */
  static bytesToInt16(STRING) {
    return ByteDecode.bytesToInt(STRING, 2);
  }

  /**
   * @param {string} STRING
   * @param {number} ITERATION
   */
  static bytesToInt(STRING, ITERATION) {
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
  /**
   * @param {string} STRING
   * @return {string}
   */
  static decodeBase64(STRING) {
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

  /**
   * @param {string} STRING
   * @param {number} place
   * @return {string}
   */
  static validCharCode(STRING, place) {
    const CHARCODE = availableCharacters.indexOf(STRING.charAt(place));

    if (CHARCODE === -1) throw new TypeError('cannot decode base64');

    return CHARCODE;
  }

  /**
   * @param {string} STRING
   * @return {string}
   */
  static encodeBase64(STRING) {
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

  /**
   * @param {string} STRING
   * @param {number} place
   * @return {string}
   */
  static charCode(STRING, place) {
    const CHARCODE = STRING.charCodeAt(place);

    if (CHARCODE > 255) throw new TypeError('Invalid character');

    return CHARCODE;
  }
}

/**
 * @param {number} startClass
 * @param {number} ascendancy
 * @param {array} nodes
 * @return {string} returns build hash
 */
export function generateHash(startClass, ascendancy, nodes) {
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

/**
 * @param {string} HASHSTRING
 * @return {object} returns decoded { startClass, ascendancy, nodes }
 */
export async function decodeHash(HASHSTRING) {
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
