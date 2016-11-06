import { byteArrayToString, stringToByteArray } from 'string2bytes';

export function LMencodeString(bytes: number[] | Uint8Array): string {
  // Shortcut for Mozilla browsers that implement
  // a native base64 encoder in the form of "btoa/atob"
  if (typeof (window.btoa) == 'function') {
    return window.btoa(byteArrayToString(bytes));
  }
  return encodeByteArray(bytes, false);
}

//return byte array
export function LMdecodeString(input: string): number[] {
  // Shortcut for Mozilla browsers that implement 
  // a native base64 encoder in the form of "btoa/atob"
  if (typeof (window.atob) == 'function') {
    return stringToByteArray(window.atob(input));
  }
  return decodeStringToByteArray(input, false);
}

/**
* Maps bytes to characters.
* @type {Object}
* @private
*/
var byteToCharMap_ = null;


/**
* Maps characters to bytes.
* @type {Object}
* @private
*/
var charToByteMap_ = null;


/**
* Maps bytes to websafe characters.
* @type {Object}
* @private
*/
var byteToCharMapWebSafe_ = null;


/**
* Maps websafe characters to bytes.
* @type {Object}
* @private
*/
var charToByteMapWebSafe_ = null;


/**
* Our default alphabet, shared between
* ENCODED_VALS and ENCODED_VALS_WEBSAFE
* @type {string}
*/
var ENCODED_VALS_BASE =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  'abcdefghijklmnopqrstuvwxyz' +
  '0123456789';


/**
* Our default alphabet. Value 64 (=) is special; it means "nothing."
* @type {string}
*/
var ENCODED_VALS = ENCODED_VALS_BASE + '+/=';


/**
* Our websafe alphabet.
* @type {string}
*/
var ENCODED_VALS_WEBSAFE = ENCODED_VALS_BASE + '-_.';


/**
* Whether this browser supports the atob and btoa functions. This extension
* started at Mozilla but is now implemented by many browsers. We use the
* ASSUME_* variables to avoid pulling in the full useragent detection library
* but still allowing the standard per-browser compilations.
*
* @type {boolean}
*/
var HAS_NATIVE_SUPPORT = false;
/*HAS_NATIVE_SUPPORT = goog.userAgent.GECKO ||
goog.userAgent.WEBKIT ||
goog.userAgent.OPERA ||
typeof(goog.global.atob) == 'function';*/


/**
* Base64-encode an array of bytes.
*
* @param {Array.<number>} input An array of bytes (numbers with value in
*     [0, 255]) to encode.
* @param {boolean=} opt_webSafe Boolean indicating we should use the
*     alternative alphabet.
* @return {string} The base64 encoded string.
*/
export function encodeByteArray(input: number[] | Uint8Array, opt_webSafe: boolean): string {
  //if (!goog.isArrayLike(input)) {
  //throw Error('encodeByteArray takes an array as a parameter');
  //}

  init_();

  var byteToCharMap = opt_webSafe ? byteToCharMapWebSafe_ : byteToCharMap_;

  var output = [];

  for (var i = 0; i < input.length; i += 3) {
    var byte1 = input[i];
    var haveByte2 = i + 1 < input.length;
    var byte2 = haveByte2 ? input[i + 1] : 0;
    var haveByte3 = i + 2 < input.length;
    var byte3 = haveByte3 ? input[i + 2] : 0;

    var outByte1 = byte1 >> 2;
    var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
    var outByte3 = ((byte2 & 0x0F) << 2) | (byte3 >> 6);
    var outByte4 = byte3 & 0x3F;

    if (!haveByte3) {
      outByte4 = 64;

      if (!haveByte2) {
        outByte3 = 64;
      }
    }

    output.push(byteToCharMap[outByte1],
      byteToCharMap[outByte2],
      byteToCharMap[outByte3],
      byteToCharMap[outByte4]);
  }

  return output.join('');
}

/**
* Base64-encode a string.
*
* @param {string} input A string to encode.
* @param {boolean=} opt_webSafe If true, we should use the
*     alternative alphabet.
* @return {string} The base64 encoded string.
*/
function encodeString(input: string, opt_webSafe: boolean) {
  // Shortcut for Mozilla browsers that implement
  // a native base64 encoder in the form of "btoa/atob"
  if (typeof (window.btoa) === 'function' && !opt_webSafe) {
    return window.btoa(input);
  }
  return encodeByteArray(stringToByteArray(input), opt_webSafe);
}


/**
* Base64-decode a string.
*
* @param {string} input to decode.
* @param {boolean=} opt_webSafe True if we should use the
*     alternative alphabet.
* @return {string} string representing the decoded value.
*/
function decodeString(input: string, opt_webSafe: boolean) {
  // Shortcut for Mozilla browsers that implement
  // a native base64 encoder in the form of "btoa/atob"
  if (typeof (window.atob) === 'function' && !opt_webSafe) {
    return window.atob(input);
  }
  return byteArrayToString(decodeStringToByteArray(input, opt_webSafe));
}


/**
* Base64-decode a string.
*
* @param {string} input to decode (length not required to be a multiple of 4).
* @param {boolean=} opt_webSafe True if we should use the
*     alternative alphabet.
* @return {Array} bytes representing the decoded value.
*/
export function decodeStringToByteArray(input: string, opt_webSafe: boolean): number[] {
  init_();

  var charToByteMap = opt_webSafe ?
    charToByteMapWebSafe_ :
    charToByteMap_;

  var output = [];

  for (var i = 0; i < input.length;) {
    var byte1 = charToByteMap[input.charAt(i++)];

    var haveByte2 = i < input.length;
    var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
    ++i;

    var haveByte3 = i < input.length;
    var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 0;
    ++i;

    var haveByte4 = i < input.length;
    var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 0;
    ++i;

    if (byte1 == null || byte2 == null ||
      byte3 == null || byte4 == null) {
      throw Error();
    }

    var outByte1 = (byte1 << 2) | (byte2 >> 4);
    output.push(outByte1);

    if (byte3 != 64) {
      var outByte2 = ((byte2 << 4) & 0xF0) | (byte3 >> 2);
      output.push(outByte2);

      if (byte4 != 64) {
        var outByte3 = ((byte3 << 6) & 0xC0) | byte4;
        output.push(outByte3);
      }
    }
  }

  return output;
}


/**
* Lazy static initialization function. Called before
* accessing any of the static map variables.
* @private
*/
function init_() {
  if (!byteToCharMap_) {
    byteToCharMap_ = {};
    charToByteMap_ = {};
    byteToCharMapWebSafe_ = {};
    charToByteMapWebSafe_ = {};

    // We want quick mappings back and forth, so we precompute two maps.
    for (var i = 0; i < ENCODED_VALS.length; i++) {
      byteToCharMap_[i] =
        ENCODED_VALS.charAt(i);
      charToByteMap_[byteToCharMap_[i]] = i;
      byteToCharMapWebSafe_[i] =
        ENCODED_VALS_WEBSAFE.charAt(i);
      charToByteMapWebSafe_[
        byteToCharMapWebSafe_[i]] = i;
    }
  }
}
