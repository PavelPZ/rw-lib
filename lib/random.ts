//Returns a random number between min and max
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

//Returns a random integer between min and max
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//http://www.htmlblog.us/random-javascript-array 
//http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
export function randomizeArray<T>(array: Array<T>): Array<T> {
  for (var i = array.length - 1; i > 0; i--) {
    var j = i;
    while (j == i) j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function modulo(s: number, m: number): { m: number; z: number; } {
  var z = s % m;
  return { m: (s - z) / m, z: z };
}
