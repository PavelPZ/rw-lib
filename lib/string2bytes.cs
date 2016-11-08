using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;

public static class string2bytes {
  public static byte[] stringToUtf8ByteArray(string str) { return str == null ? null : Encoding.UTF8.GetBytes(str); }

  public static string utf8ByteArrayToString(byte[] bytes) { return bytes == null ? null : Encoding.UTF8.GetString(bytes); }

  public static byte[] hexToBytes(string value) { SoapHexBinary shb = SoapHexBinary.Parse(value); return shb.Value; }

  public static string bytesToHex(byte[] value) { SoapHexBinary shb = new SoapHexBinary(value); return shb.ToString(); }

}