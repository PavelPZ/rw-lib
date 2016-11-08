using System;
using System.IO;
using System.Text;

public static class crypt {

  public static byte[] decryptBytes(byte[] data) {
    decryptLow(ref data, 0, data.Length, encryptKey);
    return data;
  }

  public static byte[] encryptBytes(byte[] data) {
    encryptLow(ref data, 0, data.Length, encryptKey);
    return data;
  }

  public static string decryptBase64(string base64Str) {
    return base64Str != null ? string2bytes.utf8ByteArrayToString(decryptBytes(base64.base642Bytes(base64Str))) : null;
  }
  public static string encryptBase64(string str) {
    return str != null ? base64.bytes2Base64(encryptBytes(string2bytes.stringToUtf8ByteArray(str))) : null;
  }

  public static T decryptObj<T>(string base64) where T : class {
    return base64 != null ? JSON.parse<T>(decryptBase64(base64)) : null;
  }
  public static string encryptObj(object obj) {
    return obj != null ? encryptBase64(JSON.stringify(obj)) : null;
  }

  public static string decryptHex(string hex) {
    return hex != null ? string2bytes.utf8ByteArrayToString(decryptBytes(string2bytes.hexToBytes(hex))) : null;
  }
  public static string encryptHex(string str) {
    return str != null ? string2bytes.bytesToHex(encryptBytes(string2bytes.stringToUtf8ByteArray(str))) : null;
  }



  //======================================
  const ushort encryptKey = 18475;

  const ushort c1 = 52845; const ushort c2 = 22719;
  static void encryptLow(ref byte[] data, int start, int len, ushort key) {
    for (int i = 0; i < data.Length; i++) {
      data[i] = (byte)(data[i] ^ (key >> 8));
      key = (ushort)((data[i] + key) * c1 + c2);
    }
  }
  static void decryptLow(ref byte[] data, int start, int len, ushort key) {
    byte old;
    for (int i = 0; i < data.Length; i++) {
      old = data[i];
      data[i] = (byte)(old ^ (key >> 8));
      key = (ushort)((old + key) * c1 + c2);
    }
  }
}

//public static byte[] Decrypt(Stream str, ushort key) {
//  byte[] data = StreamToByte(str);
//  Decrypt(ref data, key);
//  return data;
//}
//public static string Encrypt(string str, ushort key = encryptKey) {
//  if (str == null) return null;
//  byte[] data = Encoding.Unicode.GetBytes(str);
//  Encrypt(ref data, key);
//  return Convert.ToBase64String(data);
//}
//public static string Decrypt(string str, ushort key = encryptKey) {
//  if (str == null) return null;
//  byte[] data = Convert.FromBase64String(str);
//  Decrypt(ref data, key);
//  return Encoding.Unicode.GetString(data);
//}
//public static string EncryptHex(string str, ushort key = encryptKey) {
//  byte[] data = UTF8Encode(str);
//  Encrypt(ref data, key);
//  return BytesToString(data);
//}
//public static string DecryptHex(string str, ushort key = encryptKey) {
//  byte[] data = StringToBytes(str);
//  Decrypt(ref data, key);
//  return UTF8Decode(data);
//}