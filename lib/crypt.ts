import { stringToByteArray, byteArrayToString, stringToUtf8ByteArray, utf8ByteArrayToString } from './string2bytes';
import { bytes2String as base64_bytes2String, string2Bytes as base64_string2Bytes } from './base64';

function Int64ToByte(val: number): number {
  return val & 0xFF;
};
function Int64ToUShort(val: number): number {
  return val & 0xFFFF;
};

export function bytesToHex(input): string {
  if (typeof input == "string") input = stringToByteArray(input);
  return (input as Array<number>).map (numByte => {
    let hexByte = numByte.toString(16);
    return hexByte.length > 1 ? hexByte : '0' + hexByte;
  }).join('');
}

export function hexToBytes(hexString: string): number[] {
  let arr = [];
  for (let i = 0; i < hexString.length; i += 2) {
    arr.push(parseInt(hexString.substring(i, i + 2), 16));
  }
  return arr;
};

let encryptKey = 18475;

export function encryptBytes(data: number[]): number[] {
  return data ? encryptLow(data, 0, data.length, encryptKey) : null;
}
export function decryptBytes(data: number[]): number[] {
  return data ? decryptLow(data, 0, data.length, encryptKey) : null;
}

export function decryptObj<T>(data: string): T {
  return data ? JSON.parse(decryptStr(data)) : null;
}
export function encryptObj(obj: Object): string {
  return obj ? encryptStr(JSON.stringify(obj)) : null;
}
export function decryptStr(base64: string): string {
  return base64 ? utf8ByteArrayToString(decryptBytes(base64_string2Bytes(base64))) : null;
}
export function encryptStr(str: string): string {
  return str ? base64_bytes2String(encryptBytes(stringToUtf8ByteArray(str))) : null;
}

//??????
//export function packStr(str: string): string {
//  return str ? base64_bytes2String(stringToUtf8ByteArray(str)) : null;
//}
//export function unpackStr(str: string): string {
//  return str ? utf8ByteArrayToString(base64_string2Bytes(str)) : null;
//}


function encryptLow(data: number[], start: number, len: number, key: number): number[] {
  for (let i = start; i < start + len; i++) {
    data[i] = Int64ToByte(data[i] ^ (key >> 8));
    key = Int64ToUShort((data[i] + key) * 52845 + 22719);
  }
  return data;
}

function decryptLow(data: number[], start: number, len: number, key: number): number[] {
  let old;
  for (let i = 0; i < data.length; i++) {
    old = data[i];
    data[i] = Int64ToByte(old ^ (key >> 8));
    key = Int64ToUShort((old + key) * 52845 + 22719);
  }
  return data;
}