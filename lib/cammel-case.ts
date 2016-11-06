export function toCammelCase(obj: string): string {
  return obj.replace(toCammelCaseRegex, (s, group1) => group1.toUpperCase())
}
export function fromCammelCase(obj: string): string {
  return obj.replace(fromCammelCaseRegex, (s, group1: string) => '-' + group1.toLowerCase())
}
export function normalizeCamelCase(obj: Object) {
  Object.keys(obj).forEach(key => {
    var replaced = toCammelCase(key.toLowerCase());
    if (replaced == key) return;
    obj[replaced] = obj[key];
    delete obj[key];
  });
}
var toCammelCaseRegex = /-([a-z])/gi;
var fromCammelCaseRegex = /([A-Z])/g;
