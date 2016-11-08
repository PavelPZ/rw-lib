using System;

public static class base64 {

  public static string bytes2Base64(byte[] input) { return Convert.ToBase64String(input); }

  public static byte[] base642Bytes(string input) { return Convert.FromBase64String(input); }

}