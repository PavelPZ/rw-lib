import { stringToByteArray, byteArrayToString, stringToUtf8ByteArray, utf8ByteArrayToString, bytesToHex, hexToBytes } from './string2bytes';
import * as base64 from './base64';

export function encryptBytes(data: Array<number>): Array<number> {
  return data ? encryptLow(data, 0, data.length, encryptKey) : null;
}
export function decryptBytes(data: Array<number>): Array<number> {
  return data ? decryptLow(data, 0, data.length, encryptKey) : null;
}

export function decryptBase64(base64Str: string): string {
  return base64Str ? utf8ByteArrayToString(decryptBytes(base64.base642Bytes(base64Str))) : null;
}
export function encryptBase64(str: string): string {
  return str ? base64.bytes2Base64(encryptBytes(stringToUtf8ByteArray(str))) : null;
}

export function decryptObj<T>(base64: string): T {
  return base64 ? JSON.parse(decryptBase64(base64)) : null;
}
export function encryptObj(obj: Object): string {
  return obj ? encryptBase64(JSON.stringify(obj)) : null;
}

export function decryptHex(hex: string): string {
  return hex ? utf8ByteArrayToString(decryptBytes(hexToBytes(hex))) : null;
}
export function encryptHex(str: string): string {
  return str ? bytesToHex(encryptBytes(stringToUtf8ByteArray(str))) : null;
}

//??????
//export function packStr(str: string): string {
//  return str ? base64_bytes2String(stringToUtf8ByteArray(str)) : null;
//}
//export function unpackStr(str: string): string {
//  return str ? utf8ByteArrayToString(base64_string2Bytes(str)) : null;
//}

let encryptKey = 18475;

function encryptLow(data: Array<number>, start: number, len: number, key: number): Array<number> {
  for (let i = start; i < start + len; i++) {
    data[i] = Int64ToByte(data[i] ^ (key >> 8));
    key = Int64ToUShort((data[i] + key) * 52845 + 22719);
  }
  return data;
}

function decryptLow(data: Array<number>, start: number, len: number, key: number): Array<number> {
  let old;
  for (let i = 0; i < data.length; i++) {
    old = data[i];
    data[i] = Int64ToByte(old ^ (key >> 8));
    key = Int64ToUShort((old + key) * 52845 + 22719);
  }
  return data;
}

function Int64ToByte(val: number): number {
  return val & 0xFF;
};
function Int64ToUShort(val: number): number {
  return val & 0xFFFF;
};

