export class Exception extends Error { }

export let loginHook = { doLogin: (rootHook: {}) => alert('common.ts, loginHook.doLogin: Missing code here'), isLogged: () => false };
export let blockGuiHook = { block: (isStart: boolean) => { } };


//http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
//https://en.wikipedia.org/wiki/List_of_hash_functions
/**
* Calculate a 32 bit FNV-1a hash
* Found here: https://gist.github.com/vaiorabbit/5657561
* Ref.: http://isthe.com/chongo/tech/comp/fnv/
*
* @param {string} str the input value
* @param {boolean} [asString=false] set to true to return the hash value as 
*     8-digit hex string instead of an integer
* @param {integer} [seed] optionally pass the hash of the previous chunk
* @returns {integer | string}
*/
export function hash(str: string, asString?: boolean, seed?: number): string | number {
  /*jshint bitwise:false */
  let i, l, hval = (seed === undefined) ? 0x811c9dc5 : seed;

  for (i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  if (asString) return ("0000000" + (hval >>> 0).toString(16)).substr(-8); // Convert to 8 digit hex string
  else return hval >>> 0;
}

export class ENotImplemented extends Exception {
  constructor(msg?: string) { super(`Missing ${msg} override`); }
}
export type TCallback = () => void;

//D:\LMCom\rew\Web4\JsLib\JS\Bowser.ts
//export function getClassName(constructor: Function): string {
//  let res = constructor['name']; if (res) return res;
//  let arr = constructor.toString().match(/function\s*(\w+)/);
//  return arr && arr.length == 2 ? arr[1] : undefined;
//}

export function noop() { }

export let counter = { value: 0 };

export function mergeArray<T>(arrays: Array<Array<T>>): Array<T> {
  return [].concat.apply([], arrays);
}

