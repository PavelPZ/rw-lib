// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Functions for setting, getting and deleting cookies.
 *
 * @author arv@google.com (Erik Arvidsson)
 */



/**
 * A class for handling browser cookies.
 * @param {Document} context The context document to get/set cookies on.
 * @constructor
 */

/**
 * Static constant for the size of cookies. Per the spec, there's a 4K limit
 * to the size of a cookie. To make sure users can't break this limit, we
 * should truncate long cookies at 3950 bytes, to be extra careful with dumb
 * browsers/proxies that interpret 4K as 4000 rather than 4096.
 * @type {number}
 */
var MAX_COOKIE_LENGTH = 3950;


/**
 * RegExp used to split the cookies string.
 * @type {RegExp}
 * @private
 */
var SPLIT_RE_ = /\s*;\s*/;



/**
 * We do not allow '=', ';', or white space in the name.
 *
 * NOTE: The following are allowed by this method, but should be avoided for
 * cookies handled by the server.
 * - any name starting with '$'
 * - 'Comment'
 * - 'Domain'
 * - 'Expires'
 * - 'Max-Age'
 * - 'Path'
 * - 'Secure'
 * - 'Version'
 *
 * @param {string} name Cookie name.
 * @return {boolean} Whether name is valid.
 *
 * @see <a href="http://tools.ietf.org/html/rfc2109">RFC 2109</a>
 * @see <a href="http://tools.ietf.org/html/rfc2965">RFC 2965</a>
 */
function isValidName(name) {
  return !(/[;=\s]/.test(name));
};


/**
 * We do not allow ';' or line break in the value.
 *
 * Spec does not mention any illegal characters, but in practice semi-colons
 * break parsing and line breaks truncate the name.
 *
 * @param {string} value Cookie value.
 * @return {boolean} Whether value is valid.
 *
 * @see <a href="http://tools.ietf.org/html/rfc2109">RFC 2109</a>
 * @see <a href="http://tools.ietf.org/html/rfc2965">RFC 2965</a>
 */
function isValidValue(value) {
  return !(/[;\r\n]/.test(value));
};


/**
 * Sets a cookie.  The max_age can be -1 to set a session cookie. To remove and
 * expire cookies, use remove() instead.
 *
 * Neither the {@code name} nor the {@code value} are encoded in any way. It is
 * up to the callers of {@code get} and {@code set} (as well as all the other
 * methods) to handle any possible encoding and decoding.
 *
 * @throws {!Error} If the {@code name} fails #goog.net.cookies.isValidName.
 * @throws {!Error} If the {@code value} fails #goog.net.cookies.isValidValue.
 *
 * @param {string} name  The cookie name.
 * @param {string} value  The cookie value.
 * @param {number=} opt_maxAge  The max age in seconds (from now). Use -1 to
 *     set a session cookie. If not provided, the default is -1
 *     (i.e. set a session cookie).
 * @param {?string=} opt_path  The path of the cookie. If not present then this
 *     uses the full request path.
 * @param {?string=} opt_domain  The domain of the cookie, or null to not
 *     specify a domain attribute (browser will use the full request host name).
 *     If not provided, the default is null (i.e. let browser use full request
 *     host name).
 * @param {boolean=} opt_secure Whether the cookie should only be sent over
 *     a secure channel.
 */
export function setCookie(name: string, value: string, opt_maxAge: number = -1, opt_path: string = '', opt_domain: string = '', opt_secure: string = ''): void {
  if (!isValidName(name)) {
    throw Error('Invalid cookie name "' + name + '"');
  }
  if (!isValidValue(value)) {
    throw Error('Invalid cookie value "' + value + '"');
  }

  if (!goog.isDef(opt_maxAge)) {
    opt_maxAge = -1;
  }

  var domainStr = opt_domain ? ';domain=' + opt_domain : '';
  var pathStr = opt_path ? ';path=' + opt_path : '';
  var secureStr = opt_secure ? ';secure' : '';

  var expiresStr;

  // Case 1: Set a session cookie.
  if (opt_maxAge < 0) {
    expiresStr = '';

    // Case 2: Expire the cookie.
    // Note: We don't tell people about this option in the function doc because
    // we prefer people to use ExpireCookie() to expire cookies.
  } else if (opt_maxAge == 0) {
    // Note: Don't use Jan 1, 1970 for date because NS 4.76 will try to convert
    // it to local time, and if the local time is before Jan 1, 1970, then the
    // browser will ignore the Expires attribute altogether.
    var pastDate = new Date(1970, 1 /*Feb*/, 1);  // Feb 1, 1970
    expiresStr = ';expires=' + pastDate.toUTCString();

    // Case 3: Set a persistent cookie.
  } else {
    var futureDate = new Date(goog.now() + opt_maxAge * 1000);
    expiresStr = ';expires=' + futureDate.toUTCString();
  }

  setCookie_(name + '=' + value + domainStr + pathStr +
    expiresStr + secureStr);
};

/**
 * Returns the value for the first cookie with the given name.
 * @param {string} name  The name of the cookie to get.
 * @param {string=} opt_default  If not found this is returned instead.
 * @return {string|undefined}  The value of the cookie. If no cookie is set this
 *     returns opt_default or undefined if opt_default is not provided.
 */
export function getCookie(name: string, opt_default: string = ""): string {
  var nameEq = name + '=';
  var parts = getParts_();
  for (var i = 0, part; part = parts[i]; i++) {
    if (part.indexOf(nameEq) == 0) {
      return part.substr(nameEq.length);
    }
    if (part == name) {
      return '';
    }
  }
  return opt_default;
};


/**
 * Removes and expires a cookie.
 * @param {string} name  The cookie name.
 * @param {string=} opt_path  The path of the cookie, or null to expire a cookie
 *     set at the full request path. If not provided, the default is '/'
 *     (i.e. path=/).
 * @param {string=} opt_domain  The domain of the cookie, or null to expire a
 *     cookie set at the full request host name. If not provided, the default is
 *     null (i.e. cookie at full request host name).
 * @return {boolean} Whether the cookie existed before it was removed.
 */
export function remove(name: string, opt_path: string = '', opt_domain: string = '') {
  var rv = containsKey(name);
  setCookie(name, '', 0, opt_path, opt_domain);
  return rv;
};


/**
 * Gets the names for all the cookies.
 * @return {Array.<string>} An array with the names of the cookies.
 */
function getKeys() {
  return getKeyValues_().keys;
};


/**
 * Gets the values for all the cookies.
 * @return {Array.<string>} An array with the values of the cookies.
 */
function getValues() {
  return getKeyValues_().values;
};


/**
 * @return {boolean} Whether there are any cookies for this document.
 */
function isEmpty() {
  return !getCookie_();
};


/**
 * @return {number} The number of cookies for this document.
 */
function getCount() {
  var cookie = getCookie_();
  if (!cookie) {
    return 0;
  }
  return getParts_().length;
};


/**
 * Returns whether there is a cookie with the given name.
 * @param {string} key The name of the cookie to test for.
 * @return {boolean} Whether there is a cookie by that name.
 */
function containsKey(key) {
  // substring will return empty string if the key is not found, so the get
  // function will only return undefined
  return goog.isDef(getCookie(key));
};


/**
 * Returns whether there is a cookie with the given value. (This is an O(n)
 * operation.)
 * @param {string} value  The value to check for.
 * @return {boolean} Whether there is a cookie with that value.
 */
function containsValue(value) {
  // this O(n) in any case so lets do the trivial thing.
  var values = getKeyValues_().values;
  for (var i = 0; i < values.length; i++) {
    if (values[i] == value) {
      return true;
    }
  }
  return false;
};


/**
 * Removes all cookies for this document.  Note that this will only remove
 * cookies from the current path and domain.  If there are cookies set using a
 * subpath and/or another domain these will still be there.
 */
function clear() {
  var keys = getKeyValues_().keys;
  for (var i = keys.length - 1; i >= 0; i--) {
    remove(keys[i]);
  }
};


/**
 * Private helper function to allow testing cookies without depending on the
 * browser.
 * @param {string} s The cookie string to set.
 * @private
 */
function setCookie_(s) {
  document.cookie = s;
};


/**
 * Private helper function to allow testing cookies without depending on the
 * browser. IE6 can return null here.
 * @return {?string} Returns the {@code document.cookie}.
 * @private
 */
function getCookie_() {
  return document.cookie;
};


/**
 * @return {!Array.<string>} The cookie split on semi colons.
 * @private
 */
function getParts_() {
  return (getCookie_() || '').
    split(SPLIT_RE_);
};


/**
 * Gets the names and values for all the cookies.
 * @return {Object} An object with keys and values.
 * @private
 */
function getKeyValues_() {
  var parts = getParts_();
  var keys = [], values = [], index, part;
  for (var i = 0; part = parts[i]; i++) {
    index = part.indexOf('=');

    if (index == -1) { // empty name
      keys.push('');
      values.push(part);
    } else {
      keys.push(part.substring(0, index));
      values.push(part.substring(index + 1));
    }
  }
  return { keys: keys, values: values };
};

var goog = {
  now: function () { return +new Date(); },
  isDef: function (val) { return val !== undefined; }
};
