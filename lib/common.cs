using Newtonsoft.Json;

public static class JSON {
  /// <summary>
  /// JSON Serialization
  /// </summary>
  public static string stringify(object obj) { return obj == null ? null : JsonConvert.SerializeObject(obj, jsonSet); }

  /// <summary>
  /// JSON Deserialization
  /// </summary>
  public static T parse<T>(string jsonString) where T : class { return jsonString == null ? (T)null : JsonConvert.DeserializeObject<T>(jsonString); }

  static JsonSerializerSettings jsonSet = new JsonSerializerSettings { DefaultValueHandling = DefaultValueHandling.Ignore, NullValueHandling = NullValueHandling.Ignore };

}