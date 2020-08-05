(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wave-furfer"] = factory(require("vue"));
	else
		root["wave-furfer"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "0538":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__("1c0b");
var isObject = __webpack_require__("861d");

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyNames = __webpack_require__("241c").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "0b25":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");

// `ToIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0d3b":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});


/***/ }),

/***/ "1148":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
module.exports = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),

/***/ "13d5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $reduce = __webpack_require__("d58f").left;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "145e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__("7b0b");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "170b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");
var speciesConstructor = __webpack_require__("4840");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  return new (speciesConstructor(O, O.constructor))(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "182d":
/***/ (function(module, exports, __webpack_require__) {

var toPositiveInteger = __webpack_require__("f8cd");

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ "19aa":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c0b":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "1cdc":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "219c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $sort = [].sort;

// `%TypedArray%.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod('sort', function sort(comparefn) {
  return $sort.call(aTypedArray(this), comparefn);
});


/***/ }),

/***/ "2266":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var bind = __webpack_require__("0366");
var getIteratorMethod = __webpack_require__("35a1");
var callWithSafeIterationClosing = __webpack_require__("9bdd");

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "25a1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $reduceRight = __webpack_require__("d58f").right;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  return $reduceRight(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "25f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__("6eeb");
var anObject = __webpack_require__("825a");
var fails = __webpack_require__("d039");
var flags = __webpack_require__("ad6d");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "2626":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var definePropertyModule = __webpack_require__("9bf2");
var wellKnownSymbol = __webpack_require__("b622");
var DESCRIPTORS = __webpack_require__("83ab");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "2954":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var speciesConstructor = __webpack_require__("4840");
var fails = __webpack_require__("d039");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $slice = [].slice;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod('slice', function slice(start, end) {
  var list = $slice.call(aTypedArray(this), start, end);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);


/***/ }),

/***/ "2b3d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__("3ca3");
var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var USE_NATIVE_URL = __webpack_require__("0d3b");
var global = __webpack_require__("da84");
var defineProperties = __webpack_require__("37e8");
var redefine = __webpack_require__("6eeb");
var anInstance = __webpack_require__("19aa");
var has = __webpack_require__("5135");
var assign = __webpack_require__("60da");
var arrayFrom = __webpack_require__("4df4");
var codeAt = __webpack_require__("6547").codeAt;
var toASCII = __webpack_require__("5fb2");
var setToStringTag = __webpack_require__("d44e");
var URLSearchParamsModule = __webpack_require__("9861");
var InternalStateModule = __webpack_require__("69f3");

var NativeURL = global.URL;
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[A-Za-z]/;
var ALPHANUMERIC = /[\d+-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^(0x|0X)/;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
// eslint-disable-next-line no-control-regex
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
// eslint-disable-next-line no-control-regex
var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (char()) {
    if (pieceIndex == 8) return;
    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }
    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (char()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(char())) return;
        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (
            (isSpecial(url) != has(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;
          else if (char == ']') seenBracket = false;
          buffer += char;
        } break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += char;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        } break;

      case PATH:
        if (
          char == EOF || char == '/' ||
          (char == '\\' && isSpecial(url)) ||
          (!stateOverride && (char == '?' || char == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';
          else if (char == '#') url.query += '%23';
          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = String(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, String(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URL(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),

/***/ "2cf4":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");
var bind = __webpack_require__("0366");
var html = __webpack_require__("1be4");
var createElement = __webpack_require__("cc12");
var IS_IOS = __webpack_require__("1cdc");

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    !fails(post) &&
    location.protocol !== 'file:'
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "3280":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $lastIndexOf = __webpack_require__("e58c");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  return $lastIndexOf.apply(aTypedArray(this), arguments);
});


/***/ }),

/***/ "3410":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toObject = __webpack_require__("7b0b");
var nativeGetPrototypeOf = __webpack_require__("e163");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "3a7b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $findIndex = __webpack_require__("b727").findIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "3c5d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var toLength = __webpack_require__("50c4");
var toOffset = __webpack_require__("182d");
var toObject = __webpack_require__("7b0b");
var fails = __webpack_require__("d039");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = toLength(src.length);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED);


/***/ }),

/***/ "3ca3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "3fcc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $map = __webpack_require__("b727").map;
var speciesConstructor = __webpack_require__("4840");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (aTypedArrayConstructor(speciesConstructor(O, O.constructor)))(length);
  });
});


/***/ }),

/***/ "408a":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
module.exports = function (value) {
  if (typeof value != 'number' && classof(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};


/***/ }),

/***/ "4160":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var forEach = __webpack_require__("17c2");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "44de":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "45fc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $some = __webpack_require__("b727").some;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('some');
var USES_TO_LENGTH = arrayMethodUsesToLength('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "466d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toLength = __webpack_require__("50c4");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aFunction = __webpack_require__("1c0b");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "498a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $trim = __webpack_require__("58a8").trim;
var forcedStringTrimMethod = __webpack_require__("c8d2");

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ "4ae1":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var getBuiltIn = __webpack_require__("d066");
var aFunction = __webpack_require__("1c0b");
var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var create = __webpack_require__("7c73");
var bind = __webpack_require__("0538");
var fails = __webpack_require__("d039");

var nativeConstruct = getBuiltIn('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "4df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__("0366");
var toObject = __webpack_require__("7b0b");
var callWithSafeIterationClosing = __webpack_require__("9bdd");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var getIteratorMethod = __webpack_require__("35a1");

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");
var whitespaces = __webpack_require__("5899");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5a34":
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__("44e7");

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "5cc6":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Uint8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "5d41":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var isObject = __webpack_require__("861d");
var anObject = __webpack_require__("825a");
var has = __webpack_require__("5135");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var getPrototypeOf = __webpack_require__("e163");

// `Reflect.get` method
// https://tc39.github.io/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value')
    ? descriptor.value
    : descriptor.get === undefined
      ? undefined
      : descriptor.get.call(receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});


/***/ }),

/***/ "5f96":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $join = [].join;

// `%TypedArray%.prototype.join` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('join', function join(separator) {
  return $join.apply(aTypedArray(this), arguments);
});


/***/ }),

/***/ "5fb2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line  max-statements
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return output.join('');
};

module.exports = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }
  return encoded.join('.');
};


/***/ }),

/***/ "60bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var ArrayIterators = __webpack_require__("e260");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = ArrayIterators.values;
var arrayKeys = ArrayIterators.keys;
var arrayEntries = ArrayIterators.entries;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];

var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

var typedArrayValues = function values() {
  return arrayValues.call(aTypedArray(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod('entries', function entries() {
  return arrayEntries.call(aTypedArray(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod('keys', function keys() {
  return arrayKeys.call(aTypedArray(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod('values', typedArrayValues, !CORRECT_ITER_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod(ITERATOR, typedArrayValues, !CORRECT_ITER_NAME);


/***/ }),

/***/ "60da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var objectKeys = __webpack_require__("df75");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),

/***/ "621a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_ARRAY_BUFFER = __webpack_require__("a981");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefineAll = __webpack_require__("e2cc");
var fails = __webpack_require__("d039");
var anInstance = __webpack_require__("19aa");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var toIndex = __webpack_require__("0b25");
var IEEE754 = __webpack_require__("77a7");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var getOwnPropertyNames = __webpack_require__("241c").f;
var defineProperty = __webpack_require__("9bf2").f;
var arrayFill = __webpack_require__("81d5");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global[DATA_VIEW];
var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var RangeError = global.RangeError;

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new NativeArrayBuffer(); // eslint-disable-line no-new
    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf($DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf($DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var nativeSetInt8 = $DataViewPrototype.setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};


/***/ }),

/***/ "649e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $some = __webpack_require__("b727").some;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6b93":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");

var log = Math.log;
var LOG10E = Math.LOG10E;

// `Math.log10` method
// https://tc39.github.io/ecma262/#sec-math.log10
$({ target: 'Math', stat: true }, {
  log10: function log10(x) {
    return log(x) * LOG10E;
  }
});


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7039":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var nativeGetOwnPropertyNames = __webpack_require__("057f").f;

var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: nativeGetOwnPropertyNames
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "72f7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var exportTypedArrayMethod = __webpack_require__("ebb5").exportTypedArrayMethod;
var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var arrayJoin = [].join;

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return arrayJoin.call(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);


/***/ }),

/***/ "735e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $fill = __webpack_require__("81d5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
  return $fill.apply(aTypedArray(this), arguments);
});


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var has = __webpack_require__("5135");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "74e8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var DESCRIPTORS = __webpack_require__("83ab");
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__("8aa7");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var ArrayBufferModule = __webpack_require__("621a");
var anInstance = __webpack_require__("19aa");
var createPropertyDescriptor = __webpack_require__("5c6c");
var createNonEnumerableProperty = __webpack_require__("9112");
var toLength = __webpack_require__("50c4");
var toIndex = __webpack_require__("0b25");
var toOffset = __webpack_require__("182d");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var classof = __webpack_require__("f5df");
var isObject = __webpack_require__("861d");
var create = __webpack_require__("7c73");
var setPrototypeOf = __webpack_require__("d2bb");
var getOwnPropertyNames = __webpack_require__("241c").f;
var typedArrayFrom = __webpack_require__("a078");
var forEach = __webpack_require__("b727").forEach;
var setSpecies = __webpack_require__("2626");
var definePropertyModule = __webpack_require__("9bf2");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var InternalStateModule = __webpack_require__("69f3");
var inheritIfRequired = __webpack_require__("7156");

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && typeof key != 'symbol'
    && key in target
    && String(+key) == String(key);
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  return isTypedArrayIndex(target, key = toPrimitive(key, true))
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
    && isObject(descriptor)
    && has(descriptor, 'value')
    && !has(descriptor, 'get')
    && !has(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!has(descriptor, 'writable') || descriptor.writable)
    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ "77a7":
/***/ (function(module, exports) {

// IEEE754 conversions based on https://github.com/feross/ieee754
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = 1 / 0;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "81d5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__("7b0b");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "82f8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $includes = __webpack_require__("4d64").includes;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__("c04e");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "8aa7":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-new */
var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");
var NATIVE_ARRAY_BUFFER_VIEWS = __webpack_require__("ebb5").NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "96cf":
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ "9861":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__("e260");
var $ = __webpack_require__("23e7");
var getBuiltIn = __webpack_require__("d066");
var USE_NATIVE_URL = __webpack_require__("0d3b");
var redefine = __webpack_require__("6eeb");
var redefineAll = __webpack_require__("e2cc");
var setToStringTag = __webpack_require__("d44e");
var createIteratorConstructor = __webpack_require__("9ed3");
var InternalStateModule = __webpack_require__("69f3");
var anInstance = __webpack_require__("19aa");
var hasOwn = __webpack_require__("5135");
var bind = __webpack_require__("0366");
var classof = __webpack_require__("f5df");
var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");
var wellKnownSymbol = __webpack_require__("b622");

var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: first.value + '', value: second.value + '' });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: init[key] + '' });
    } else {
      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.appent` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: name + '', value: value + '' });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = name + '';
    var val = value + '';
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` for correct work with polyfilled `URLSearchParams`
// https://github.com/zloirock/core-js/issues/674
if (!USE_NATIVE_URL && typeof $fetch == 'function' && typeof Headers == 'function') {
  $({ global: true, enumerable: true, forced: true }, {
    fetch: function fetch(input /* , init */) {
      var args = [input];
      var init, body, headers;
      if (arguments.length > 1) {
        init = arguments[1];
        if (isObject(init)) {
          body = init.body;
          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();
            if (!headers.has('content-type')) {
              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
            init = create(init, {
              body: createPropertyDescriptor(0, String(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        }
        args.push(init);
      } return $fetch.apply(this, args);
    }
  });
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "9a1f":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var getIteratorMethod = __webpack_require__("35a1");

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};


/***/ }),

/***/ "9a8c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $copyWithin = __webpack_require__("145e");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod('copyWithin', function copyWithin(target, start /* , end */) {
  return $copyWithin.call(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});


/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__("d039");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a078":
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var getIteratorMethod = __webpack_require__("35a1");
var isArrayIteratorMethod = __webpack_require__("e95a");
var bind = __webpack_require__("0366");
var aTypedArrayConstructor = __webpack_require__("ebb5").aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    O = [];
    while (!(step = next.call(iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2], 2);
  }
  length = toLength(O.length);
  result = new (aTypedArrayConstructor(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};


/***/ }),

/***/ "a15b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IndexedObject = __webpack_require__("44ad");
var toIndexedObject = __webpack_require__("fc6a");
var arrayMethodIsStrict = __webpack_require__("a640");

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "a434":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var toAbsoluteIndex = __webpack_require__("23cb");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var toObject = __webpack_require__("7b0b");
var arraySpeciesCreate = __webpack_require__("65f0");
var createProperty = __webpack_require__("8418");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a630":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var from = __webpack_require__("4df4");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $every = __webpack_require__("b727").every;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "a981":
/***/ (function(module, exports) {

module.exports = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var has = __webpack_require__("5135");
var classof = __webpack_require__("c6b6");
var inheritIfRequired = __webpack_require__("7156");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var create = __webpack_require__("7c73");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "ab13":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "ae40":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__("e163");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "b012":
/***/ (function(module, exports) {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b39a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var fails = __webpack_require__("d039");

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var $slice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED);


/***/ }),

/***/ "b575":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var classof = __webpack_require__("c6b6");
var macrotask = __webpack_require__("2cf4").set;
var IS_IOS = __webpack_require__("1cdc");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b680":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var toInteger = __webpack_require__("a691");
var thisNumberValue = __webpack_require__("408a");
var repeat = __webpack_require__("1148");
var fails = __webpack_require__("d039");

var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var FORCED = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  // eslint-disable-next-line max-statements
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    var multiply = function (n, c) {
      var index = -1;
      var c2 = c;
      while (++index < 6) {
        c2 += n * data[index];
        data[index] = c2 % 1e7;
        c2 = floor(c2 / 1e7);
      }
    };

    var divide = function (n) {
      var index = 6;
      var c = 0;
      while (--index >= 0) {
        c += data[index];
        data[index] = floor(c / n);
        c = (c % n) * 1e7;
      }
    };

    var dataToString = function () {
      var index = 6;
      var s = '';
      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = String(data[index]);
          s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
        }
      } return s;
    };

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        result = dataToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        result = dataToString() + repeat.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c1ac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $filter = __webpack_require__("b727").filter;
var speciesConstructor = __webpack_require__("4840");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
});


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c740":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $findIndex = __webpack_require__("b727").findIndex;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8d2":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var whitespaces = __webpack_require__("5899");

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ "c975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $indexOf = __webpack_require__("4d64").indexOf;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "ca91":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $reduce = __webpack_require__("d58f").left;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod('reduce', function reduce(callbackfn /* , initialValue */) {
  return $reduce(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "caad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $includes = __webpack_require__("4d64").includes;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: !USES_TO_LENGTH }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "cb29":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fill = __webpack_require__("81d5");
var addToUnscopables = __webpack_require__("44d2");

// `Array.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cca6":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var assign = __webpack_require__("60da");

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "cd26":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});


/***/ }),

/***/ "cdf9":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var newPromiseCapability = __webpack_require__("f069");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "cfc3":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Float32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float32', function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d139":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $find = __webpack_require__("b727").find;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "d28b":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var redefine = __webpack_require__("6eeb");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d58f":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");
var toLength = __webpack_require__("50c4");

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ "d5d6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $forEach = __webpack_require__("b727").forEach;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var regexpExec = __webpack_require__("9263");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var has = __webpack_require__("5135");
var isObject = __webpack_require__("861d");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "e2cc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("6eeb");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "e439":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
var DESCRIPTORS = __webpack_require__("83ab");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e58c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;


/***/ }),

/***/ "e667":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "e6cf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IS_PURE = __webpack_require__("c430");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var NativePromise = __webpack_require__("fea9");
var redefine = __webpack_require__("6eeb");
var redefineAll = __webpack_require__("e2cc");
var setToStringTag = __webpack_require__("d44e");
var setSpecies = __webpack_require__("2626");
var isObject = __webpack_require__("861d");
var aFunction = __webpack_require__("1c0b");
var anInstance = __webpack_require__("19aa");
var classof = __webpack_require__("c6b6");
var inspectSource = __webpack_require__("8925");
var iterate = __webpack_require__("2266");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");
var speciesConstructor = __webpack_require__("4840");
var task = __webpack_require__("2cf4").set;
var microtask = __webpack_require__("b575");
var promiseResolve = __webpack_require__("cdf9");
var hostReportErrors = __webpack_require__("44de");
var newPromiseCapabilityModule = __webpack_require__("f069");
var perform = __webpack_require__("e667");
var InternalStateModule = __webpack_require__("69f3");
var isForced = __webpack_require__("94ca");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "e91f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $indexOf = __webpack_require__("4d64").indexOf;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "e95a":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "ebb5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__("a981");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var has = __webpack_require__("5135");
var classof = __webpack_require__("f5df");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var defineProperty = __webpack_require__("9bf2").f;
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var wellKnownSymbol = __webpack_require__("b622");
var uid = __webpack_require__("90e3");

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var isView = function isView(it) {
  var klass = classof(it);
  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (setPrototypeOf) {
    if (isPrototypeOf.call(TypedArray, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
      delete TypedArrayConstructor.prototype[KEY];
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
        delete TypedArrayConstructor[KEY];
      }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  if (!global[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !has(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ "f069":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__("1c0b");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "f8cd":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

module.exports = function (it) {
  var result = toInteger(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// NAMESPACE OBJECT: ./src/components/WaveSurfer/util/index.js
var util_namespaceObject = {};
__webpack_require__.r(util_namespaceObject);
__webpack_require__.d(util_namespaceObject, "ajax", function() { return ajax; });
__webpack_require__.d(util_namespaceObject, "getId", function() { return getId; });
__webpack_require__.d(util_namespaceObject, "max", function() { return max_max; });
__webpack_require__.d(util_namespaceObject, "min", function() { return min_min; });
__webpack_require__.d(util_namespaceObject, "Observer", function() { return observer_Observer; });
__webpack_require__.d(util_namespaceObject, "style", function() { return style_style; });
__webpack_require__.d(util_namespaceObject, "requestAnimationFrame", function() { return request_animation_frame; });
__webpack_require__.d(util_namespaceObject, "frame", function() { return frame_frame; });
__webpack_require__.d(util_namespaceObject, "debounce", function() { return debounce_default.a; });
__webpack_require__.d(util_namespaceObject, "preventClick", function() { return preventClick; });
__webpack_require__.d(util_namespaceObject, "fetchFile", function() { return fetchFile; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d7f3097c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WaveSurfer/WaveSurfer.vue?vue&type=template&id=6b70233f&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.showSpectrogram)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isSpectrogramRendered),expression:"isSpectrogramRendered"}],ref:"spectrogram"}):_vm._e(),_c('div',{ref:"waveform"},[_vm._t("default")],2),(_vm.showTimeLine)?_c('div',{ref:"timeline"}):_vm._e(),(_vm.showPointLine)?_c('div',{ref:"pointline"}):_vm._e(),_vm._t("textform"),(_vm.showTextGrid)?_c('div',{ref:"textgrid"}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WaveSurfer/WaveSurfer.vue?vue&type=template&id=6b70233f&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__("2b3d");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js







function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js







function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js







function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js






function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-names.js
var es_object_get_own_property_names = __webpack_require__("7039");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.construct.js
var es_reflect_construct = __webpack_require__("4ae1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-prototype-of.js
var es_object_get_prototype_of = __webpack_require__("3410");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js



function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js




function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// CONCATENATED MODULE: ./src/components/WaveSurfer/util/observer.js








/**
 * @typedef {Object} ListenerDescriptor
 * @property {string} name The name of the event
 * @property {function} callback The callback
 * @property {function} un The function to call to remove the listener
 */

/**
 * Observer class
 */
var observer_Observer = /*#__PURE__*/function () {
  /**
   * Instantiate Observer
   */
  function Observer() {
    _classCallCheck(this, Observer);

    /**
     * @private
     * @todo Initialise the handlers here already and remove the conditional
     * assignment in `on()`
     */
    this._disabledEventEmissions = [];
    this.handlers = null;
  }
  /**
   * Attach a handler function for an event.
   *
   * @param {string} event Name of the event to listen to
   * @param {function} fn The callback to trigger when the event is fired
   * @return {ListenerDescriptor} The event descriptor
   */


  _createClass(Observer, [{
    key: "on",
    value: function on(event, fn) {
      var _this = this;

      if (!this.handlers) {
        this.handlers = {};
      }

      var handlers = this.handlers[event];

      if (!handlers) {
        handlers = this.handlers[event] = [];
      }

      handlers.push(fn); // Return an event descriptor

      return {
        name: event,
        callback: fn,
        un: function un(e, fn) {
          return _this.un(e, fn);
        }
      };
    }
    /**
     * Remove an event handler.
     *
     * @param {string} event Name of the event the listener that should be
     * removed listens to
     * @param {function} fn The callback that should be removed
     */

  }, {
    key: "un",
    value: function un(event, fn) {
      if (!this.handlers) {
        return;
      }

      var handlers = this.handlers[event];
      var i;

      if (handlers) {
        if (fn) {
          for (i = handlers.length - 1; i >= 0; i--) {
            if (handlers[i] == fn) {
              handlers.splice(i, 1);
            }
          }
        } else {
          handlers.length = 0;
        }
      }
    }
    /**
     * Remove all event handlers.
     */

  }, {
    key: "unAll",
    value: function unAll() {
      this.handlers = null;
    }
    /**
     * Attach a handler to an event. The handler is executed at most once per
     * event type.
     *
     * @param {string} event The event to listen to
     * @param {function} handler The callback that is only to be called once
     * @return {ListenerDescriptor} The event descriptor
     */

  }, {
    key: "once",
    value: function once(event, handler) {
      var _this2 = this;

      var fn = function fn() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        /*  eslint-disable no-invalid-this */
        handler.apply(_this2, args);
        /*  eslint-enable no-invalid-this */

        setTimeout(function () {
          _this2.un(event, fn);
        }, 0);
      };

      return this.on(event, fn);
    }
    /**
     * Disable firing a list of events by name. When specified, event handlers for any event type
     * passed in here will not be called.
     *
     * @since 4.0.0
     * @param {string[]} eventNames an array of event names to disable emissions for
     * @example
     * // disable seek and interaction events
     * wavesurfer.setDisabledEventEmissions(['seek', 'interaction']);
     */

  }, {
    key: "setDisabledEventEmissions",
    value: function setDisabledEventEmissions(eventNames) {
      this._disabledEventEmissions = eventNames;
    }
    /**
     * plugins borrow part of this class without calling the constructor,
     * so we have to be careful about _disabledEventEmissions
     */

  }, {
    key: "_isDisabledEventEmission",
    value: function _isDisabledEventEmission(event) {
      return this._disabledEventEmissions && this._disabledEventEmissions.includes(event);
    }
    /**
     * Manually fire an event
     *
     * @param {string} event The event to fire manually
     * @param {...any} args The arguments with which to call the listeners
     */

  }, {
    key: "fireEvent",
    value: function fireEvent(event) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (!this.handlers || this._isDisabledEventEmission(event)) {
        return;
      }

      var handlers = this.handlers[event];
      handlers && handlers.forEach(function (fn) {
        fn.apply(void 0, args);
      });
    }
  }]);

  return Observer;
}();


// CONCATENATED MODULE: ./src/components/WaveSurfer/util/ajax.js



/**
 * Perform an ajax request using `XMLHttpRequest`.
 *
 * @deprecated Use `util.fetchFile` instead.
 *
 * @param {Object} options AJAX options to use. See example below for options.
 * @returns {Observer} Observer instance
 * @example
 * // default options
 * let options = {
 *     method: 'GET',
 *     url: undefined,
 *     responseType: 'json',
 *     xhr: {}
 * };
 *
 * // override default options
 * options.url = '../media/demo.wav';
 * options.responseType = 'arraybuffer';
 * options.xhr = {
 *     requestHeaders: [
 *         {
 *             key: 'Authorization',
 *             value: 'my-token'
 *         }
 *     ],
 *     withCredentials: true
 * };
 *
 * // make ajax call
 * let ajaxCall = util.ajax(options);
 * ajaxCall.on('progress', e => {
 *     console.log('progress', e);
 * });
 * ajaxCall.on('success', (data, e) => {
 *     console.log('success!', data);
 * });
 * ajaxCall.on('error', e => {
 *     console.warn('ajax error: ' + e.target.statusText);
 * });
 */

function ajax(options) {
  var instance = new observer_Observer();
  var xhr = new XMLHttpRequest();
  var fired100 = false;
  xhr.open(options.method || "GET", options.url, true);
  xhr.responseType = options.responseType || "json";

  if (options.xhr) {
    if (options.xhr.requestHeaders) {
      // add custom request headers
      options.xhr.requestHeaders.forEach(function (header) {
        xhr.setRequestHeader(header.key, header.value);
      });
    }

    if (options.xhr.withCredentials) {
      // use credentials
      xhr.withCredentials = true;
    }
  }

  xhr.addEventListener("progress", function (e) {
    instance.fireEvent("progress", e);

    if (e.lengthComputable && e.loaded == e.total) {
      fired100 = true;
    }
  });
  xhr.addEventListener("load", function (e) {
    if (!fired100) {
      instance.fireEvent("progress", e);
    }

    instance.fireEvent("load", e);

    if (200 == xhr.status || 206 == xhr.status) {
      instance.fireEvent("success", xhr.response, e);
    } else {
      instance.fireEvent("error", e);
    }
  });
  xhr.addEventListener("error", function (e) {
    return instance.fireEvent("error", e);
  });
  xhr.send();
  instance.xhr = xhr;
  return instance;
}
// CONCATENATED MODULE: ./src/components/WaveSurfer/util/get-id.js



/**
 * Get a random prefixed ID
 *
 * @param {String} prefix Prefix to use. Default is `'wavesurfer_'`.
 * @returns {String} Random prefixed ID
 * @example
 * console.log(getId()); // logs 'wavesurfer_b5pors4ru6g'
 *
 * let prefix = 'foo-';
 * console.log(getId(prefix)); // logs 'foo-b5pors4ru6g'
 */
function getId(prefix) {
  if (prefix === undefined) {
    prefix = "wavesurfer_";
  }

  return prefix + Math.random().toString(32).substring(2);
}
// CONCATENATED MODULE: ./src/components/WaveSurfer/util/max.js




/**
 * Get the largest value
 *
 * @param   {Array} values Array of numbers
 * @returns {Number} Largest number found
 * @example console.log(max([1, 2, 3])); // logs 3
 */
function max_max(values) {
  var largest = -Infinity;
  Object.keys(values).forEach(function (i) {
    if (values[i] > largest) {
      largest = values[i];
    }
  });
  return largest;
}
// CONCATENATED MODULE: ./src/components/WaveSurfer/util/min.js





/**
 * Get the smallest value
 *
 * @param   {Array} values Array of numbers
 * @returns {Number} Smallest number found
 * @example console.log(min([1, 2, 3])); // logs 1
 */
function min_min(values) {
  var smallest = Number(Infinity);
  Object.keys(values).forEach(function (i) {
    if (values[i] < smallest) {
      smallest = values[i];
    }
  });
  return smallest;
}
// CONCATENATED MODULE: ./src/components/WaveSurfer/util/style.js




/**
 * Apply a map of styles to an element
 *
 * @param {HTMLElement} el The element that the styles will be applied to
 * @param {Object} styles The map of propName: attribute, both are used as-is
 *
 * @return {HTMLElement} el
 */
function style_style(el, styles) {
  Object.keys(styles).forEach(function (prop) {
    if (el.style[prop] !== styles[prop]) {
      el.style[prop] = styles[prop];
    }
  });
  return el;
}
// CONCATENATED MODULE: ./src/components/WaveSurfer/util/request-animation-frame.js
/* eslint-disable valid-jsdoc */

/**
 * Returns the `requestAnimationFrame` function for the browser, or a shim with
 * `setTimeout` if the function is not found
 *
 * @return {function} Available `requestAnimationFrame` function for the browser
 */

/* eslint-disable  no-unused-vars*/
/* harmony default export */ var request_animation_frame = ((window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
  return setTimeout(callback, 1000 / 60);
}).bind(window));
/* eslint-enable */
// CONCATENATED MODULE: ./src/components/WaveSurfer/util/frame.js

/**
 * Create a function which will be called at the next requestAnimationFrame
 * cycle
 *
 * @param {function} func The function to call
 *
 * @return {func} The function wrapped within a requestAnimationFrame
 */

function frame_frame(func) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return request_animation_frame(function () {
      return func.apply(void 0, args);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/debounce/index.js
var debounce = __webpack_require__("b012");
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// CONCATENATED MODULE: ./src/components/WaveSurfer/util/prevent-click.js
/**
 * Stops propagation of click event and removes event listener
 *
 * @private
 * @param {object} event The click event
 */
function preventClickHandler(event) {
  event.stopPropagation();
  document.body.removeEventListener("click", preventClickHandler, true);
}
/**
 * Starts listening for click event and prevent propagation
 *
 * @param {object} values Values
 */

/* eslint-disable  no-unused-vars */


function preventClick(values) {
  document.body.addEventListener("click", preventClickHandler, true);
}
/* eslint-enable */
// CONCATENATED MODULE: ./src/components/WaveSurfer/util/fetch.js






/**
 * @since 3.0.0
 */


var fetch_ProgressHandler = /*#__PURE__*/function () {
  /**
   * Instantiate ProgressHandler
   *
   * @param {Observer} instance The `fetchFile` observer instance.
   * @param {Number} contentLength Content length.
   * @param {Response} response Response object.
   */
  function ProgressHandler(instance, contentLength, response) {
    _classCallCheck(this, ProgressHandler);

    this.instance = instance;
    this.instance._reader = response.body.getReader();
    this.total = parseInt(contentLength, 10);
    this.loaded = 0;
  }
  /**
   * A method that is called once, immediately after the `ReadableStream``
   * is constructed.
   *
   * @param {ReadableStreamDefaultController} controller Controller instance
   *     used to control the stream.
   */


  _createClass(ProgressHandler, [{
    key: "start",
    value: function start(controller) {
      var _this = this;

      var read = function read() {
        // instance._reader.read() returns a promise that resolves
        // when a value has been received
        _this.instance._reader.read().then(function (_ref) {
          var done = _ref.done,
              value = _ref.value;

          // result objects contain two properties:
          // done  - true if the stream has already given you all its data.
          // value - some data. Always undefined when done is true.
          if (done) {
            // ensure onProgress called when content-length=0
            if (_this.total === 0) {
              _this.instance.onProgress.call(_this.instance, {
                loaded: _this.loaded,
                total: _this.total,
                lengthComputable: false
              });
            } // no more data needs to be consumed, close the stream


            controller.close();
            return;
          }

          _this.loaded += value.byteLength;

          _this.instance.onProgress.call(_this.instance, {
            loaded: _this.loaded,
            total: _this.total,
            lengthComputable: !(_this.total === 0)
          }); // enqueue the next data chunk into our target stream


          controller.enqueue(value);
          read();
        }).catch(function (error) {
          controller.error(error);
        });
      };

      read();
    }
  }]);

  return ProgressHandler;
}();
/**
 * Load a file using `fetch`.
 *
 * @param {object} options Request options to use. See example below.
 * @returns {Observer} Observer instance
 * @example
 * // default options
 * let options = {
 *     url: undefined,
 *     method: 'GET',
 *     mode: 'cors',
 *     credentials: 'same-origin',
 *     cache: 'default',
 *     responseType: 'json',
 *     requestHeaders: [],
 *     redirect: 'follow',
 *     referrer: 'client'
 * };
 *
 * // override some options
 * options.url = '../media/demo.wav';

 * // available types: 'arraybuffer', 'blob', 'json' or 'text'
 * options.responseType = 'arraybuffer';
 *
 * // make fetch call
 * let request = util.fetchFile(options);
 *
 * // listen for events
 * request.on('progress', e => {
 *     console.log('progress', e);
 * });
 *
 * request.on('success', data => {
 *     console.log('success!', data);
 * });
 *
 * request.on('error', e => {
 *     console.warn('fetchFile error: ', e);
 * });
 */


function fetchFile(options) {
  if (!options) {
    throw new Error("fetch options missing");
  } else if (!options.url) {
    throw new Error("fetch url missing");
  }

  var instance = new observer_Observer();
  var fetchHeaders = new Headers();
  var fetchRequest = new Request(options.url); // add ability to abort

  instance.controller = new AbortController(); // check if headers have to be added

  if (options && options.requestHeaders) {
    // add custom request headers
    options.requestHeaders.forEach(function (header) {
      fetchHeaders.append(header.key, header.value);
    });
  } // parse fetch options


  var responseType = options.responseType || "json";
  var fetchOptions = {
    method: options.method || "GET",
    headers: fetchHeaders,
    mode: options.mode || "cors",
    credentials: options.credentials || "same-origin",
    cache: options.cache || "default",
    redirect: options.redirect || "follow",
    referrer: options.referrer || "client",
    signal: instance.controller.signal
  };
  fetch(fetchRequest, fetchOptions).then(function (response) {
    // store response reference
    instance.response = response;
    var progressAvailable = true;

    if (!response.body) {
      // ReadableStream is not yet supported in this browser
      // see https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
      progressAvailable = false;
    } // Server must send CORS header "Access-Control-Expose-Headers: content-length"


    var contentLength = response.headers.get("content-length");

    if (contentLength === null) {
      // Content-Length server response header missing.
      // Don't evaluate download progress if we can't compare against a total size
      // see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Access-Control-Expose-Headers
      progressAvailable = false;
    }

    if (!progressAvailable) {
      // not able to check download progress so skip it
      return response;
    } // fire progress event when during load


    instance.onProgress = function (e) {
      instance.fireEvent("progress", e);
    };

    return new Response(new ReadableStream(new fetch_ProgressHandler(instance, contentLength, response)), fetchOptions);
  }).then(function (response) {
    var errMsg;

    if (response.ok) {
      switch (responseType) {
        case "arraybuffer":
          return response.arrayBuffer();

        case "json":
          return response.json();

        case "blob":
          return response.blob();

        case "text":
          return response.text();

        default:
          errMsg = "Unknown responseType: " + responseType;
          break;
      }
    }

    if (!errMsg) {
      errMsg = "HTTP error status: " + response.status;
    }

    throw new Error(errMsg);
  }).then(function (response) {
    instance.fireEvent("success", response);
  }).catch(function (error) {
    instance.fireEvent("error", error);
  }); // return the fetch request

  instance.fetchRequest = fetchRequest;
  return instance;
}
// CONCATENATED MODULE: ./src/components/WaveSurfer/util/index.js











// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.some.js
var es_array_some = __webpack_require__("45fc");

// CONCATENATED MODULE: ./src/components/WaveSurfer/drawer.js





/**
 * Parent class for renderers
 *
 * @extends {Observer}
 */

var drawer_Drawer = /*#__PURE__*/function (_util$Observer) {
  _inherits(Drawer, _util$Observer);

  var _super = _createSuper(Drawer);

  /**
   * @param {HTMLElement} container The container node of the wavesurfer instance
   * @param {WavesurferParams} params The wavesurfer initialisation options
   */
  function Drawer(container, params) {
    var _this;

    _classCallCheck(this, Drawer);

    _this = _super.call(this);
    _this.container = container;
    /**
     * @type {WavesurferParams}
     */

    _this.params = params;
    /**
     * The width of the renderer
     * @type {number}
     */

    _this.width = 0;
    /**
     * The height of the renderer
     * @type {number}
     */

    _this.height = params.height * _this.params.pixelRatio;
    _this.lastPos = 0;
    /**
     * The `<wave>` element which is added to the container
     * @type {HTMLElement}
     */

    _this.wrapper = null;
    return _this;
  }
  /**
   * Alias of `util.style`
   *
   * @param {HTMLElement} el The element that the styles will be applied to
   * @param {Object} styles The map of propName: attribute, both are used as-is
   * @return {HTMLElement} el
   */


  _createClass(Drawer, [{
    key: "style",
    value: function style(el, styles) {
      return style_style(el, styles);
    }
    /**
     * Create the wrapper `<wave>` element, style it and set up the events for
     * interaction
     */

  }, {
    key: "createWrapper",
    value: function createWrapper() {
      this.wrapper = this.container.appendChild(document.createElement("wave"));
      this.style(this.wrapper, {
        display: "block",
        position: "relative",
        userSelect: "none",
        webkitUserSelect: "none",
        height: this.params.height + "px"
      });

      if (this.params.fillParent || this.params.scrollParent) {
        this.style(this.wrapper, {
          width: "100%",
          overflowX: this.params.hideScrollbar ? "hidden" : "auto",
          overflowY: "hidden"
        });
      }

      this.setupWrapperEvents();
    }
    /**
     * Handle click event
     *
     * @param {Event} e Click event
     * @param {?boolean} noPrevent Set to true to not call `e.preventDefault()`
     * @return {number} Playback position from 0 to 1
     */

  }, {
    key: "handleEvent",
    value: function handleEvent(e, noPrevent) {
      !noPrevent && e.preventDefault();
      var clientX = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
      var bbox = this.wrapper.getBoundingClientRect();
      var nominalWidth = this.width;
      var parentWidth = this.getWidth();
      var progress;

      if (!this.params.fillParent && nominalWidth < parentWidth) {
        progress = (this.params.rtl ? bbox.right - clientX : clientX - bbox.left) * (this.params.pixelRatio / nominalWidth) || 0;

        if (progress > 1) {
          progress = 1;
        }
      } else {
        progress = ((this.params.rtl ? bbox.right - clientX : clientX - bbox.left) + this.wrapper.scrollLeft) / this.wrapper.scrollWidth || 0;
      }

      return progress;
    }
  }, {
    key: "setupWrapperEvents",
    value: function setupWrapperEvents() {
      var _this2 = this;

      this.wrapper.addEventListener("click", function (e) {
        var scrollbarHeight = _this2.wrapper.offsetHeight - _this2.wrapper.clientHeight;

        if (scrollbarHeight !== 0) {
          // scrollbar is visible.  Check if click was on it
          var bbox = _this2.wrapper.getBoundingClientRect();

          if (e.clientY >= bbox.bottom - scrollbarHeight) {
            // ignore mousedown as it was on the scrollbar
            return;
          }
        }

        if (_this2.params.interact) {
          _this2.fireEvent("click", e, _this2.handleEvent(e));
        }
      });
      this.wrapper.addEventListener("dblclick", function (e) {
        if (_this2.params.interact) {
          _this2.fireEvent("dblclick", e, _this2.handleEvent(e));
        }
      });
      this.wrapper.addEventListener("scroll", function (e) {
        return _this2.fireEvent("scroll", e);
      });
    }
    /**
     * Draw peaks on the canvas
     *
     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays
     * for split channel rendering
     * @param {number} length The width of the area that should be drawn
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that should be
     * rendered
     */

  }, {
    key: "drawPeaks",
    value: function drawPeaks(peaks, length, start, end) {
      if (!this.setWidth(length)) {
        this.clearWave();
      }

      this.params.barWidth ? this.drawBars(peaks, 0, start, end) : this.drawWave(peaks, 0, start, end);
    }
    /**
     * Scroll to the beginning
     */

  }, {
    key: "resetScroll",
    value: function resetScroll() {
      if (this.wrapper !== null) {
        this.wrapper.scrollLeft = 0;
      }
    }
    /**
     * Recenter the view-port at a certain percent of the waveform
     *
     * @param {number} percent Value from 0 to 1 on the waveform
     */

  }, {
    key: "recenter",
    value: function recenter(percent) {
      var position = this.wrapper.scrollWidth * percent;
      this.recenterOnPosition(position, true);
    }
    /**
     * Recenter the view-port on a position, either scroll there immediately or
     * in steps of 5 pixels
     *
     * @param {number} position X-offset in pixels
     * @param {boolean} immediate Set to true to immediately scroll somewhere
     */

  }, {
    key: "recenterOnPosition",
    value: function recenterOnPosition(position, immediate) {
      var scrollLeft = this.wrapper.scrollLeft;
      var half = ~~(this.wrapper.clientWidth / 2);
      var maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;
      var target = position - half;
      var offset = target - scrollLeft;

      if (maxScroll == 0) {
        // no need to continue if scrollbar is not there
        return;
      } // if the cursor is currently visible...


      if (!immediate && -half <= offset && offset < half) {
        // set rate at which waveform is centered
        var rate = this.params.autoCenterRate; // make rate depend on width of view and length of waveform

        rate /= half;
        rate *= maxScroll;
        offset = Math.max(-rate, Math.min(rate, offset));
        target = scrollLeft + offset;
      } // limit target to valid range (0 to maxScroll)


      target = Math.max(0, Math.min(maxScroll, target)); // no use attempting to scroll if we're not moving

      if (target != scrollLeft) {
        this.wrapper.scrollLeft = target;
      }
    }
    /**
     * Get the current scroll position in pixels
     *
     * @return {number} Horizontal scroll position in pixels
     */

  }, {
    key: "getScrollX",
    value: function getScrollX() {
      var x = 0;

      if (this.wrapper) {
        var pixelRatio = this.params.pixelRatio;
        x = Math.round(this.wrapper.scrollLeft * pixelRatio); // In cases of elastic scroll (safari with mouse wheel) you can
        // scroll beyond the limits of the container
        // Calculate and floor the scrollable extent to make sure an out
        // of bounds value is not returned
        // Ticket #1312

        if (this.params.scrollParent) {
          var maxScroll = ~~(this.wrapper.scrollWidth * pixelRatio - this.getWidth());
          x = Math.min(maxScroll, Math.max(0, x));
        }
      }

      return x;
    }
    /**
     * Get the width of the container
     *
     * @return {number} The width of the container
     */

  }, {
    key: "getWidth",
    value: function getWidth() {
      return Math.round(this.container.clientWidth * this.params.pixelRatio);
    }
    /**
     * Set the width of the container
     *
     * @param {number} width The new width of the container
     * @return {boolean} Whether the width of the container was updated or not
     */

  }, {
    key: "setWidth",
    value: function setWidth(width) {
      if (this.width == width) {
        return false;
      }

      this.width = width;

      if (this.params.fillParent || this.params.scrollParent) {
        this.style(this.wrapper, {
          width: ""
        });
      } else {
        this.style(this.wrapper, {
          width: ~~(this.width / this.params.pixelRatio) + "px"
        });
      }

      this.updateSize();
      return true;
    }
    /**
     * Set the height of the container
     *
     * @param {number} height The new height of the container.
     * @return {boolean} Whether the height of the container was updated or not
     */

  }, {
    key: "setHeight",
    value: function setHeight(height) {
      if (height == this.height) {
        return false;
      }

      this.height = height;
      this.style(this.wrapper, {
        height: ~~(this.height / this.params.pixelRatio) + "px"
      });
      this.updateSize();
      return true;
    }
    /**
     * Called by wavesurfer when progress should be rendered
     *
     * @param {number} progress From 0 to 1
     */

  }, {
    key: "progress",
    value: function progress(_progress) {
      var minPxDelta = 1 / this.params.pixelRatio;
      var pos = Math.round(_progress * this.width) * minPxDelta;

      if (pos < this.lastPos || pos - this.lastPos >= minPxDelta) {
        this.lastPos = pos;

        if (this.params.scrollParent && this.params.autoCenter) {
          var newPos = ~~(this.wrapper.scrollWidth * _progress);
          this.recenterOnPosition(newPos, this.params.autoCenterImmediately);
        }

        this.updateProgress(pos);
      }
    }
    /**
     * This is called when wavesurfer is destroyed
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.unAll();

      if (this.wrapper) {
        if (this.wrapper.parentNode == this.container) {
          this.container.removeChild(this.wrapper);
        }

        this.wrapper = null;
      }
    }
    /* Renderer-specific methods */

    /**
     * Called after cursor related params have changed.
     *
     * @abstract
     */

  }, {
    key: "updateCursor",
    value: function updateCursor() {}
    /**
     * Called when the size of the container changes so the renderer can adjust
     *
     * @abstract
     */

  }, {
    key: "updateSize",
    value: function updateSize() {}
    /**
     * Draw a waveform with bars
     *
     * @abstract
     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for split channel
     * rendering
     * @param {number} channelIndex The index of the current channel. Normally
     * should be 0
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that should be
     * rendered
     */

    /* eslint-disable  no-unused-vars */

  }, {
    key: "drawBars",
    value: function drawBars(peaks, channelIndex, start, end) {}
    /* eslint-enable */

    /**
     * Draw a waveform
     *
     * @abstract
     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for split channel
     * rendering
     * @param {number} channelIndex The index of the current channel. Normally
     * should be 0
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that should be
     * rendered
     */

    /* eslint-disable  no-unused-vars */

  }, {
    key: "drawWave",
    value: function drawWave(peaks, channelIndex, start, end) {}
    /* eslint-enable */

    /**
     * Clear the waveform
     *
     * @abstract
     */

  }, {
    key: "clearWave",
    value: function clearWave() {}
    /**
     * Render the new progress
     *
     * @abstract
     * @param {number} position X-Offset of progress position in pixels
     */

    /* eslint-disable  no-unused-vars */

  }, {
    key: "updateProgress",
    value: function updateProgress(position) {}
    /* eslint-enable */

  }]);

  return Drawer;
}(observer_Observer);


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.fill.js
var es_array_fill = __webpack_require__("cb29");

// CONCATENATED MODULE: ./src/components/WaveSurfer/drawer.canvasentry.js






/**
 * @since 3.0.0
 */


/**
 * The `CanvasEntry` class represents an element consisting of a wave `canvas`
 * and an (optional) progress wave `canvas`.
 *
 * The `MultiCanvas` renderer uses one or more `CanvasEntry` instances to
 * render a waveform, depending on the zoom level.
 */

var drawer_canvasentry_CanvasEntry = /*#__PURE__*/function () {
  function CanvasEntry() {
    _classCallCheck(this, CanvasEntry);

    /**
     * The wave node
     *
     * @type {HTMLCanvasElement}
     */
    this.wave = null;
    /**
     * The wave canvas rendering context
     *
     * @type {CanvasRenderingContext2D}
     */

    this.waveCtx = null;
    /**
     * The (optional) progress wave node
     *
     * @type {HTMLCanvasElement}
     */

    this.progress = null;
    /**
     * The (optional) progress wave canvas rendering context
     *
     * @type {CanvasRenderingContext2D}
     */

    this.progressCtx = null;
    /**
     * Start of the area the canvas should render, between 0 and 1
     *
     * @type {number}
     */

    this.start = 0;
    /**
     * End of the area the canvas should render, between 0 and 1
     *
     * @type {number}
     */

    this.end = 1;
    /**
     * Unique identifier for this entry
     *
     * @type {string}
     */

    this.id = getId(typeof this.constructor.name !== "undefined" ? this.constructor.name.toLowerCase() + "_" : "canvasentry_");
    /**
     * Canvas 2d context attributes
     *
     * @type {object}
     */

    this.canvasContextAttributes = {};
  }
  /**
   * Store the wave canvas element and create the 2D rendering context
   *
   * @param {HTMLCanvasElement} element The wave `canvas` element.
   */


  _createClass(CanvasEntry, [{
    key: "initWave",
    value: function initWave(element) {
      this.wave = element;
      this.waveCtx = this.wave.getContext("2d", this.canvasContextAttributes);
    }
    /**
     * Store the progress wave canvas element and create the 2D rendering
     * context
     *
     * @param {HTMLCanvasElement} element The progress wave `canvas` element.
     */

  }, {
    key: "initProgress",
    value: function initProgress(element) {
      this.progress = element;
      this.progressCtx = this.progress.getContext("2d", this.canvasContextAttributes);
    }
    /**
     * Update the dimensions
     *
     * @param {number} elementWidth Width of the entry
     * @param {number} totalWidth Total width of the multi canvas renderer
     * @param {number} width The new width of the element
     * @param {number} height The new height of the element
     */

  }, {
    key: "updateDimensions",
    value: function updateDimensions(elementWidth, totalWidth, width, height) {
      // where the canvas starts and ends in the waveform, represented as a
      // decimal between 0 and 1
      this.start = this.wave.offsetLeft / totalWidth || 0;
      this.end = this.start + elementWidth / totalWidth; // set wave canvas dimensions

      this.wave.width = width;
      this.wave.height = height;
      var elementSize = {
        width: elementWidth + "px"
      };
      style_style(this.wave, elementSize);

      if (this.hasProgressCanvas) {
        // set progress canvas dimensions
        this.progress.width = width;
        this.progress.height = height;
        style_style(this.progress, elementSize);
      }
    }
    /**
     * Clear the wave and progress rendering contexts
     */

  }, {
    key: "clearWave",
    value: function clearWave() {
      // wave
      this.waveCtx.clearRect(0, 0, this.waveCtx.canvas.width, this.waveCtx.canvas.height); // progress

      if (this.hasProgressCanvas) {
        this.progressCtx.clearRect(0, 0, this.progressCtx.canvas.width, this.progressCtx.canvas.height);
      }
    }
    /**
     * Set the fill styles for wave and progress
     *
     * @param {string} waveColor Fill color for the wave canvas
     * @param {?string} progressColor Fill color for the progress canvas
     */

  }, {
    key: "setFillStyles",
    value: function setFillStyles(waveColor, progressColor) {
      this.waveCtx.fillStyle = waveColor;

      if (this.hasProgressCanvas) {
        this.progressCtx.fillStyle = progressColor;
      }
    }
    /**
     * Draw a rectangle for wave and progress
     *
     * @param {number} x X start position
     * @param {number} y Y start position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {number} radius Radius of the rectangle
     */

  }, {
    key: "fillRects",
    value: function fillRects(x, y, width, height, radius) {
      this.fillRectToContext(this.waveCtx, x, y, width, height, radius);

      if (this.hasProgressCanvas) {
        this.fillRectToContext(this.progressCtx, x, y, width, height, radius);
      }
    }
    /**
     * Draw the actual rectangle on a `canvas` element
     *
     * @param {CanvasRenderingContext2D} ctx Rendering context of target canvas
     * @param {number} x X start position
     * @param {number} y Y start position
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {number} radius Radius of the rectangle
     */

  }, {
    key: "fillRectToContext",
    value: function fillRectToContext(ctx, x, y, width, height, radius) {
      if (!ctx) {
        return;
      }

      if (radius) {
        this.drawRoundedRect(ctx, x, y, width, height, radius);
      } else {
        ctx.fillRect(x, y, width, height);
      }
    }
    /**
     * Draw a rounded rectangle on Canvas
     *
     * @param {CanvasRenderingContext2D} ctx Canvas context
     * @param {number} x X-position of the rectangle
     * @param {number} y Y-position of the rectangle
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {number} radius Radius of the rectangle
     *
     * @return {void}
     * @example drawRoundedRect(ctx, 50, 50, 5, 10, 3)
     */

  }, {
    key: "drawRoundedRect",
    value: function drawRoundedRect(ctx, x, y, width, height, radius) {
      if (height === 0) {
        return;
      } // peaks are float values from -1 to 1. Use absolute height values in
      // order to correctly calculate rounded rectangle coordinates


      if (height < 0) {
        height *= -1;
        y -= height;
      }

      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    }
    /**
     * Render the actual wave and progress lines
     *
     * @param {number[]} peaks Array with peaks data
     * @param {number} absmax Maximum peak value (absolute)
     * @param {number} halfH Half the height of the waveform
     * @param {number} offsetY Offset to the top
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that
     * should be rendered
     */

  }, {
    key: "drawLines",
    value: function drawLines(peaks, absmax, halfH, offsetY, start, end) {
      this.drawLineToContext(this.waveCtx, peaks, absmax, halfH, offsetY, start, end);

      if (this.hasProgressCanvas) {
        this.drawLineToContext(this.progressCtx, peaks, absmax, halfH, offsetY, start, end);
      }
    }
    /**
     * Render the actual waveform line on a `canvas` element
     *
     * @param {CanvasRenderingContext2D} ctx Rendering context of target canvas
     * @param {number[]} peaks Array with peaks data
     * @param {number} absmax Maximum peak value (absolute)
     * @param {number} halfH Half the height of the waveform
     * @param {number} offsetY Offset to the top
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that
     * should be rendered
     */

    /* eslint-disable  no-unused-vars*/

  }, {
    key: "drawLineToContext",
    value: function drawLineToContext(ctx, peaks, absmax, halfH, offsetY, start, end) {
      if (!ctx) {
        return;
      }

      var length = peaks.length / 2;
      var first = Math.round(length * this.start); // use one more peak value to make sure we join peaks at ends -- unless,
      // of course, this is the last canvas

      var last = Math.round(length * this.end) + 1;
      var canvasStart = first;
      var canvasEnd = last;
      var scale = this.wave.width / (canvasEnd - canvasStart - 1); // optimization

      var halfOffset = halfH + offsetY;
      var absmaxHalf = absmax / halfH;
      ctx.beginPath();
      ctx.moveTo((canvasStart - first) * scale, halfOffset);
      ctx.lineTo((canvasStart - first) * scale, halfOffset - Math.round((peaks[2 * canvasStart] || 0) / absmaxHalf));
      var i, peak, h;

      for (i = canvasStart; i < canvasEnd; i++) {
        peak = peaks[2 * i] || 0;
        h = Math.round(peak / absmaxHalf);
        ctx.lineTo((i - first) * scale + this.halfPixel, halfOffset - h);
      } // draw the bottom edge going backwards, to make a single
      // closed hull to fill


      var j = canvasEnd - 1;

      for (j; j >= canvasStart; j--) {
        peak = peaks[2 * j + 1] || 0;
        h = Math.round(peak / absmaxHalf);
        ctx.lineTo((j - first) * scale + this.halfPixel, halfOffset - h);
      }

      ctx.lineTo((canvasStart - first) * scale, halfOffset - Math.round((peaks[2 * canvasStart + 1] || 0) / absmaxHalf));
      ctx.closePath();
      ctx.fill();
    }
    /* eslint-enable */

    /**
     * Destroys this entry
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.waveCtx = null;
      this.wave = null;
      this.progressCtx = null;
      this.progress = null;
    }
    /**
     * Return image data of the wave `canvas` element
     *
     * When using a `type` of `'blob'`, this will return a `Promise` that
     * resolves with a `Blob` instance.
     *
     * @param {string} format='image/png' An optional value of a format type.
     * @param {number} quality=0.92 An optional value between 0 and 1.
     * @param {string} type='dataURL' Either 'dataURL' or 'blob'.
     * @return {string|Promise} When using the default `'dataURL'` `type` this
     * returns a data URL. When using the `'blob'` `type` this returns a
     * `Promise` that resolves with a `Blob` instance.
     */

  }, {
    key: "getImage",
    value: function getImage(format, quality, type) {
      var _this = this;

      if (type === "blob") {
        return new Promise(function (resolve) {
          _this.wave.toBlob(resolve, format, quality);
        });
      } else if (type === "dataURL") {
        return this.wave.toDataURL(format, quality);
      }
    }
  }]);

  return CanvasEntry;
}();


// CONCATENATED MODULE: ./src/components/WaveSurfer/drawer.multicanvas.js


















/**
 * MultiCanvas renderer for wavesurfer. Is currently the default and sole
 * builtin renderer.
 *
 * A `MultiCanvas` consists of one or more `CanvasEntry` instances, depending
 * on the zoom level.
 */

var drawer_multicanvas_MultiCanvas = /*#__PURE__*/function (_Drawer) {
  _inherits(MultiCanvas, _Drawer);

  var _super = _createSuper(MultiCanvas);

  /**
   * @param {HTMLElement} container The container node of the wavesurfer instance
   * @param {WavesurferParams} params The wavesurfer initialisation options
   */
  function MultiCanvas(container, params) {
    var _this;

    _classCallCheck(this, MultiCanvas);

    _this = _super.call(this, container, params);
    /**
     * @type {number}
     */

    _this.maxCanvasWidth = params.maxCanvasWidth;
    /**
     * @type {number}
     */

    _this.maxCanvasElementWidth = Math.round(params.maxCanvasWidth / params.pixelRatio);
    /**
     * Whether or not the progress wave is rendered. If the `waveColor`
     * and `progressColor` are the same color it is not.
     *
     * @type {boolean}
     */

    _this.hasProgressCanvas = params.waveColor != params.progressColor;
    /**
     * @type {number}
     */

    _this.halfPixel = 0.5 / params.pixelRatio;
    /**
     * List of `CanvasEntry` instances.
     *
     * @type {Array}
     */

    _this.canvases = [];
    /**
     * @type {HTMLElement}
     */

    _this.progressWave = null;
    /**
     * Class used to generate entries.
     *
     * @type {function}
     */

    _this.EntryClass = drawer_canvasentry_CanvasEntry;
    /**
     * Canvas 2d context attributes.
     *
     * @type {object}
     */

    _this.canvasContextAttributes = params.drawingContextAttributes;
    /**
     * Overlap added between entries to prevent vertical white stripes
     * between `canvas` elements.
     *
     * @type {number}
     */

    _this.overlap = 2 * Math.ceil(params.pixelRatio / 2);
    /**
     * The radius of the wave bars. Makes bars rounded
     *
     * @type {number}
     */

    _this.barRadius = params.barRadius || 0;
    return _this;
  }
  /**
   * Initialize the drawer
   */


  _createClass(MultiCanvas, [{
    key: "init",
    value: function init() {
      this.createWrapper();
      this.createElements();
    }
    /**
     * Create the canvas elements and style them
     *
     */

  }, {
    key: "createElements",
    value: function createElements() {
      this.progressWave = this.wrapper.appendChild(this.style(document.createElement("wave"), {
        position: "absolute",
        zIndex: 3,
        left: 0,
        top: 0,
        bottom: 0,
        overflow: "hidden",
        width: "0",
        display: "none",
        boxSizing: "border-box",
        borderRightStyle: "solid",
        pointerEvents: "none"
      }));
      this.addCanvas();
      this.updateCursor();
    }
    /**
     * Update cursor style
     */

  }, {
    key: "updateCursor",
    value: function updateCursor() {
      this.style(this.progressWave, {
        borderRightWidth: this.params.cursorWidth + "px",
        borderRightColor: this.params.cursorColor
      });
    }
    /**
     * Adjust to the updated size by adding or removing canvases
     */

  }, {
    key: "updateSize",
    value: function updateSize() {
      var _this2 = this;

      var totalWidth = Math.round(this.width / this.params.pixelRatio);
      var requiredCanvases = Math.ceil(totalWidth / (this.maxCanvasElementWidth + this.overlap)); // add required canvases

      while (this.canvases.length < requiredCanvases) {
        this.addCanvas();
      } // remove older existing canvases, if any


      while (this.canvases.length > requiredCanvases) {
        this.removeCanvas();
      }

      var canvasWidth = this.maxCanvasWidth + this.overlap;
      var lastCanvas = this.canvases.length - 1;
      this.canvases.forEach(function (entry, i) {
        if (i == lastCanvas) {
          canvasWidth = _this2.width - _this2.maxCanvasWidth * lastCanvas;
        }

        _this2.updateDimensions(entry, canvasWidth, _this2.height);

        entry.clearWave();
      });
    }
    /**
     * Add a canvas to the canvas list
     *
     */

  }, {
    key: "addCanvas",
    value: function addCanvas() {
      var entry = new this.EntryClass();
      entry.canvasContextAttributes = this.canvasContextAttributes;
      entry.hasProgressCanvas = this.hasProgressCanvas;
      entry.halfPixel = this.halfPixel;
      var leftOffset = this.maxCanvasElementWidth * this.canvases.length; // wave

      entry.initWave(this.wrapper.appendChild(this.style(document.createElement("canvas"), {
        position: "absolute",
        zIndex: 2,
        left: leftOffset + "px",
        top: 0,
        bottom: 0,
        height: "100%",
        pointerEvents: "none"
      }))); // progress

      if (this.hasProgressCanvas) {
        entry.initProgress(this.progressWave.appendChild(this.style(document.createElement("canvas"), {
          position: "absolute",
          left: leftOffset + "px",
          top: 0,
          bottom: 0,
          height: "100%"
        })));
      }

      this.canvases.push(entry);
    }
    /**
     * Pop single canvas from the list
     *
     */

  }, {
    key: "removeCanvas",
    value: function removeCanvas() {
      var lastEntry = this.canvases[this.canvases.length - 1]; // wave

      lastEntry.wave.parentElement.removeChild(lastEntry.wave); // progress

      if (this.hasProgressCanvas) {
        lastEntry.progress.parentElement.removeChild(lastEntry.progress);
      } // cleanup


      if (lastEntry) {
        lastEntry.destroy();
        lastEntry = null;
      }

      this.canvases.pop();
    }
    /**
     * Update the dimensions of a canvas element
     *
     * @param {CanvasEntry} entry Target entry
     * @param {number} width The new width of the element
     * @param {number} height The new height of the element
     */

  }, {
    key: "updateDimensions",
    value: function updateDimensions(entry, width, height) {
      var elementWidth = Math.round(width / this.params.pixelRatio);
      var totalWidth = Math.round(this.width / this.params.pixelRatio); // update canvas dimensions

      entry.updateDimensions(elementWidth, totalWidth, width, height); // style element

      this.style(this.progressWave, {
        display: "block"
      });
    }
    /**
     * Clear the whole multi-canvas
     */

  }, {
    key: "clearWave",
    value: function clearWave() {
      var _this3 = this;

      frame_frame(function () {
        _this3.canvases.forEach(function (entry) {
          return entry.clearWave();
        });
      })();
    }
    /**
     * Draw a waveform with bars
     *
     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays
     * for split channel rendering
     * @param {number} channelIndex The index of the current channel. Normally
     * should be 0. Must be an integer.
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that should be
     * rendered
     * @returns {void}
     */

    /* eslint-disable  no-unused-vars*/

  }, {
    key: "drawBars",
    value: function drawBars(peaks, channelIndex, start, end) {
      var _this4 = this;

      return this.prepareDraw(peaks, channelIndex, start, end, function (_ref) {
        var absmax = _ref.absmax,
            hasMinVals = _ref.hasMinVals,
            height = _ref.height,
            offsetY = _ref.offsetY,
            halfH = _ref.halfH,
            peaks = _ref.peaks;

        // if drawBars was called within ws.empty we don't pass a start and
        // don't want anything to happen
        if (start === undefined) {
          return;
        } // Skip every other value if there are negatives.


        var peakIndexScale = hasMinVals ? 2 : 1;
        var length = peaks.length / peakIndexScale;
        var bar = _this4.params.barWidth * _this4.params.pixelRatio;
        var gap = _this4.params.barGap === null ? Math.max(_this4.params.pixelRatio, ~~(bar / 2)) : Math.max(_this4.params.pixelRatio, _this4.params.barGap * _this4.params.pixelRatio);
        var step = bar + gap;
        var scale = length / _this4.width;
        var first = start;
        var last = end;
        var i = first;

        for (i; i < last; i += step) {
          var peak = peaks[Math.floor(i * scale * peakIndexScale)] || 0;
          var h = Math.round(peak / absmax * halfH);
          /* in case of silences, allow the user to specify that we
           * always draw *something* (normally a 1px high bar) */

          if (h == 0 && _this4.params.barMinHeight) h = _this4.params.barMinHeight;

          _this4.fillRect(i + _this4.halfPixel, halfH - h + offsetY, bar + _this4.halfPixel, h * 2, _this4.barRadius);
        }
      });
    }
    /* eslint-enable */

    /**
     * Draw a waveform
     *
     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays
     * for split channel rendering
     * @param {number} channelIndex The index of the current channel. Normally
     * should be 0
     * @param {number?} start The x-offset of the beginning of the area that
     * should be rendered (If this isn't set only a flat line is rendered)
     * @param {number?} end The x-offset of the end of the area that should be
     * rendered
     * @returns {void}
     */

    /* eslint-disable  no-unused-vars*/

  }, {
    key: "drawWave",
    value: function drawWave(peaks, channelIndex, start, end) {
      var _this5 = this;

      return this.prepareDraw(peaks, channelIndex, start, end, function (_ref2) {
        var absmax = _ref2.absmax,
            hasMinVals = _ref2.hasMinVals,
            height = _ref2.height,
            offsetY = _ref2.offsetY,
            halfH = _ref2.halfH,
            peaks = _ref2.peaks,
            channelIndex = _ref2.channelIndex;

        if (!hasMinVals) {
          var reflectedPeaks = [];
          var len = peaks.length;
          var i = 0;

          for (i; i < len; i++) {
            reflectedPeaks[2 * i] = peaks[i];
            reflectedPeaks[2 * i + 1] = -peaks[i];
          }

          peaks = reflectedPeaks;
        } // if drawWave was called within ws.empty we don't pass a start and
        // end and simply want a flat line


        if (start !== undefined) {
          _this5.drawLine(peaks, absmax, halfH, offsetY, start, end, channelIndex);
        } // always draw a median line


        _this5.fillRect(0, halfH + offsetY - _this5.halfPixel, _this5.width, _this5.halfPixel, _this5.barRadius);
      });
    }
    /* eslint-enable */

    /**
     * Tell the canvas entries to render their portion of the waveform
     *
     * @param {number[]} peaks Peaks data
     * @param {number} absmax Maximum peak value (absolute)
     * @param {number} halfH Half the height of the waveform
     * @param {number} offsetY Offset to the top
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that
     * should be rendered
     * @param {channelIndex} channelIndex The channel index of the line drawn
     */

    /* eslint-disable  no-unused-vars*/

  }, {
    key: "drawLine",
    value: function drawLine(peaks, absmax, halfH, offsetY, start, end, channelIndex) {
      var _this6 = this;

      var _ref3 = this.params.splitChannelsOptions.channelColors[channelIndex] || {},
          waveColor = _ref3.waveColor,
          progressColor = _ref3.progressColor;

      this.canvases.forEach(function (entry, i) {
        _this6.setFillStyles(entry, waveColor, progressColor);

        entry.drawLines(peaks, absmax, halfH, offsetY, start, end);
      });
    }
    /* eslint-enable */

    /**
     * Draw a rectangle on the multi-canvas
     *
     * @param {number} x X-position of the rectangle
     * @param {number} y Y-position of the rectangle
     * @param {number} width Width of the rectangle
     * @param {number} height Height of the rectangle
     * @param {number} radius Radius of the rectangle
     */

  }, {
    key: "fillRect",
    value: function fillRect(x, y, width, height, radius) {
      var startCanvas = Math.floor(x / this.maxCanvasWidth);
      var endCanvas = Math.min(Math.ceil((x + width) / this.maxCanvasWidth) + 1, this.canvases.length);
      var i = startCanvas;

      for (i; i < endCanvas; i++) {
        var entry = this.canvases[i];
        var leftOffset = i * this.maxCanvasWidth;
        var intersection = {
          x1: Math.max(x, i * this.maxCanvasWidth),
          y1: y,
          x2: Math.min(x + width, i * this.maxCanvasWidth + entry.wave.width),
          y2: y + height
        };

        if (intersection.x1 < intersection.x2) {
          this.setFillStyles(entry);
          entry.fillRects(intersection.x1 - leftOffset, intersection.y1, intersection.x2 - intersection.x1, intersection.y2 - intersection.y1, radius);
        }
      }
    }
    /**
     * Returns whether to hide the channel from being drawn based on params.
     *
     * @param {number} channelIndex The index of the current channel.
     * @returns {bool} True to hide the channel, false to draw.
     */

  }, {
    key: "hideChannel",
    value: function hideChannel(channelIndex) {
      return this.params.splitChannels && this.params.splitChannelsOptions.filterChannels.includes(channelIndex);
    }
    /**
     * Performs preparation tasks and calculations which are shared by `drawBars`
     * and `drawWave`
     *
     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for
     * split channel rendering
     * @param {number} channelIndex The index of the current channel. Normally
     * should be 0
     * @param {number?} start The x-offset of the beginning of the area that
     * should be rendered. If this isn't set only a flat line is rendered
     * @param {number?} end The x-offset of the end of the area that should be
     * rendered
     * @param {function} fn The render function to call, e.g. `drawWave`
     * @param {number} drawIndex The index of the current channel after filtering.
     * @returns {void}
     */

  }, {
    key: "prepareDraw",
    value: function prepareDraw(peaks, channelIndex, start, end, fn, drawIndex) {
      var _this7 = this;

      return frame_frame(function () {
        // Split channels and call this function with the channelIndex set
        if (peaks[0] instanceof Array) {
          var channels = peaks;

          if (_this7.params.splitChannels) {
            var filteredChannels = channels.filter(function (c, i) {
              return !_this7.hideChannel(i);
            });

            if (!_this7.params.splitChannelsOptions.overlay) {
              _this7.setHeight(Math.max(filteredChannels.length, 1) * _this7.params.height * _this7.params.pixelRatio);
            }

            return channels.forEach(function (channelPeaks, i) {
              return _this7.prepareDraw(channelPeaks, i, start, end, fn, filteredChannels.indexOf(channelPeaks));
            });
          }

          peaks = channels[0];
        } // Return and do not draw channel peaks if hidden.


        if (_this7.hideChannel(channelIndex)) {
          return;
        } // calculate maximum modulation value, either from the barHeight
        // parameter or if normalize=true from the largest value in the peak
        // set


        var absmax = 1 / _this7.params.barHeight;

        if (_this7.params.normalize) {
          var max = max_max(peaks);
          var min = min_min(peaks);
          absmax = -min > max ? -min : max;
        } // Bar wave draws the bottom only as a reflection of the top,
        // so we don't need negative values


        var hasMinVals = [].some.call(peaks, function (val) {
          return val < 0;
        });
        var height = _this7.params.height * _this7.params.pixelRatio;
        var offsetY = height * drawIndex || 0;
        var halfH = height / 2;
        return fn({
          absmax: absmax,
          hasMinVals: hasMinVals,
          height: height,
          offsetY: offsetY,
          halfH: halfH,
          peaks: peaks,
          channelIndex: channelIndex
        });
      })();
    }
    /**
     * Set the fill styles for a certain entry (wave and progress)
     *
     * @param {CanvasEntry} entry Target entry
     * @param {string} waveColor Wave color to draw this entry
     * @param {string} progressColor Progress color to draw this entry
     */

  }, {
    key: "setFillStyles",
    value: function setFillStyles(entry) {
      var waveColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.waveColor;
      var progressColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.params.progressColor;
      entry.setFillStyles(waveColor, progressColor);
    }
    /**
     * Return image data of the multi-canvas
     *
     * When using a `type` of `'blob'`, this will return a `Promise`.
     *
     * @param {string} format='image/png' An optional value of a format type.
     * @param {number} quality=0.92 An optional value between 0 and 1.
     * @param {string} type='dataURL' Either 'dataURL' or 'blob'.
     * @return {string|string[]|Promise} When using the default `'dataURL'`
     * `type` this returns a single data URL or an array of data URLs,
     * one for each canvas. When using the `'blob'` `type` this returns a
     * `Promise` that resolves with an array of `Blob` instances, one for each
     * canvas.
     */

  }, {
    key: "getImage",
    value: function getImage(format, quality, type) {
      if (type === "blob") {
        return Promise.all(this.canvases.map(function (entry) {
          return entry.getImage(format, quality, type);
        }));
      } else if (type === "dataURL") {
        var images = this.canvases.map(function (entry) {
          return entry.getImage(format, quality, type);
        });
        return images.length > 1 ? images : images[0];
      }
    }
    /**
     * Render the new progress
     *
     * @param {number} position X-offset of progress position in pixels
     */

  }, {
    key: "updateProgress",
    value: function updateProgress(position) {
      this.style(this.progressWave, {
        width: position + "px"
      });
    }
  }]);

  return MultiCanvas;
}(drawer_Drawer);


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("13d5");

// CONCATENATED MODULE: ./src/components/WaveSurfer/webaudio.js










 // using constants to prevent someone writing the string wrong

var PLAYING = "playing";
var PAUSED = "paused";
var FINISHED = "finished";
/**
 * WebAudio backend
 *
 * @extends {Observer}
 */

var webaudio_WebAudio = /*#__PURE__*/function (_util$Observer) {
  _inherits(WebAudio, _util$Observer);

  var _super = _createSuper(WebAudio);

  _createClass(WebAudio, [{
    key: "supportsWebAudio",

    /** scriptBufferSize: size of the processing buffer */

    /** audioContext: allows to process audio with WebAudio API */

    /** @private */

    /** @private */

    /**
     * Does the browser support this backend
     *
     * @return {boolean} Whether or not this browser supports this backend
     */
    value: function supportsWebAudio() {
      return !!(window.AudioContext || window.webkitAudioContext);
    }
    /**
     * Get the audio context used by this backend or create one
     *
     * @return {AudioContext} Existing audio context, or creates a new one
     */

  }, {
    key: "getAudioContext",
    value: function getAudioContext() {
      if (!window.WaveSurferAudioContext) {
        window.WaveSurferAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      return window.WaveSurferAudioContext;
    }
    /**
     * Get the offline audio context used by this backend or create one
     *
     * @param {number} sampleRate The sample rate to use
     * @return {OfflineAudioContext} Existing offline audio context, or creates
     * a new one
     */

  }, {
    key: "getOfflineAudioContext",
    value: function getOfflineAudioContext(sampleRate) {
      if (!window.WaveSurferOfflineAudioContext) {
        window.WaveSurferOfflineAudioContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 2, sampleRate);
      }

      return window.WaveSurferOfflineAudioContext;
    }
    /**
     * Construct the backend
     *
     * @param {WavesurferParams} params Wavesurfer parameters
     */

  }]);

  function WebAudio(params) {
    var _defineProperty2, _this$states;

    var _this;

    _classCallCheck(this, WebAudio);

    _this = _super.call(this);
    /** @private */

    _defineProperty(_assertThisInitialized(_this), "audioContext", null);

    _defineProperty(_assertThisInitialized(_this), "offlineAudioContext", null);

    _defineProperty(_assertThisInitialized(_this), "stateBehaviors", (_defineProperty2 = {}, _defineProperty(_defineProperty2, PLAYING, {
      init: function init() {
        this.addOnAudioProcess();
      },
      getPlayedPercents: function getPlayedPercents() {
        var duration = this.getDuration();
        return this.getCurrentTime() / duration || 0;
      },
      getCurrentTime: function getCurrentTime() {
        return this.startPosition + this.getPlayedTime();
      }
    }), _defineProperty(_defineProperty2, PAUSED, {
      init: function init() {
        this.removeOnAudioProcess();
      },
      getPlayedPercents: function getPlayedPercents() {
        var duration = this.getDuration();
        return this.getCurrentTime() / duration || 0;
      },
      getCurrentTime: function getCurrentTime() {
        return this.startPosition;
      }
    }), _defineProperty(_defineProperty2, FINISHED, {
      init: function init() {
        this.removeOnAudioProcess();
        this.fireEvent("finish");
      },
      getPlayedPercents: function getPlayedPercents() {
        return 1;
      },
      getCurrentTime: function getCurrentTime() {
        return this.getDuration();
      }
    }), _defineProperty2));

    _this.params = params;
    /** ac: Audio Context instance */

    _this.ac = params.audioContext || (_this.supportsWebAudio() ? _this.getAudioContext() : {});
    /**@private */

    _this.lastPlay = _this.ac.currentTime;
    /** @private */

    _this.startPosition = 0;
    /** @private */

    _this.scheduledPause = null;
    /** @private */

    _this.states = (_this$states = {}, _defineProperty(_this$states, PLAYING, Object.create(_this.stateBehaviors[PLAYING])), _defineProperty(_this$states, PAUSED, Object.create(_this.stateBehaviors[PAUSED])), _defineProperty(_this$states, FINISHED, Object.create(_this.stateBehaviors[FINISHED])), _this$states);
    /** @private */

    _this.buffer = null;
    /** @private */

    _this.filters = [];
    /** gainNode: allows to control audio volume */

    _this.gainNode = null;
    /** @private */

    _this.mergedPeaks = null;
    /** @private */

    _this.offlineAc = null;
    /** @private */

    _this.peaks = null;
    /** @private */

    _this.playbackRate = 1;
    /** analyser: provides audio analysis information */

    _this.analyser = null;
    /** scriptNode: allows processing audio */

    _this.scriptNode = null;
    /** @private */

    _this.source = null;
    /** @private */

    _this.splitPeaks = [];
    /** @private */

    _this.state = null;
    /** @private */

    _this.explicitDuration = params.duration;
    /**
     * Boolean indicating if the backend was destroyed.
     */

    _this.destroyed = false;
    return _this;
  }
  /**
   * Initialise the backend, called in `wavesurfer.createBackend()`
   */


  _createClass(WebAudio, [{
    key: "init",
    value: function init() {
      this.createVolumeNode();
      this.createScriptNode();
      this.createAnalyserNode();
      this.setState(PAUSED);
      this.setPlaybackRate(this.params.audioRate);
      this.setLength(0);
    }
    /** @private */

  }, {
    key: "disconnectFilters",
    value: function disconnectFilters() {
      if (this.filters) {
        this.filters.forEach(function (filter) {
          filter && filter.disconnect();
        });
        this.filters = null; // Reconnect direct path

        this.analyser.connect(this.gainNode);
      }
    }
    /**
     * @private
     *
     * @param {string} state The new state
     */

  }, {
    key: "setState",
    value: function setState(state) {
      if (this.state !== this.states[state]) {
        this.state = this.states[state];
        this.state.init.call(this);
      }
    }
    /**
     * Unpacked `setFilters()`
     *
     * @param {...AudioNode} filters One or more filters to set
     */

  }, {
    key: "setFilter",
    value: function setFilter() {
      for (var _len = arguments.length, filters = new Array(_len), _key = 0; _key < _len; _key++) {
        filters[_key] = arguments[_key];
      }

      this.setFilters(filters);
    }
    /**
     * Insert custom Web Audio nodes into the graph
     *
     * @param {AudioNode[]} filters Packed filters array
     * @example
     * const lowpass = wavesurfer.backend.ac.createBiquadFilter();
     * wavesurfer.backend.setFilter(lowpass);
     */

  }, {
    key: "setFilters",
    value: function setFilters(filters) {
      // Remove existing filters
      this.disconnectFilters(); // Insert filters if filter array not empty

      if (filters && filters.length) {
        this.filters = filters; // Disconnect direct path before inserting filters

        this.analyser.disconnect(); // Connect each filter in turn

        filters.reduce(function (prev, curr) {
          prev.connect(curr);
          return curr;
        }, this.analyser).connect(this.gainNode);
      }
    }
    /** Create ScriptProcessorNode to process audio */

  }, {
    key: "createScriptNode",
    value: function createScriptNode() {
      if (this.params.audioScriptProcessor) {
        this.scriptNode = this.params.audioScriptProcessor;
      } else {
        if (this.ac.createScriptProcessor) {
          this.scriptNode = this.ac.createScriptProcessor(WebAudio.scriptBufferSize);
        } else {
          this.scriptNode = this.ac.createJavaScriptNode(WebAudio.scriptBufferSize);
        }
      }

      this.scriptNode.connect(this.ac.destination);
    }
    /** @private */

  }, {
    key: "addOnAudioProcess",
    value: function addOnAudioProcess() {
      var _this2 = this;

      this.scriptNode.onaudioprocess = function () {
        var time = _this2.getCurrentTime();

        if (time >= _this2.getDuration()) {
          _this2.setState(FINISHED);

          _this2.fireEvent("pause");
        } else if (time >= _this2.scheduledPause) {
          _this2.pause();
        } else if (_this2.state === _this2.states[PLAYING]) {
          _this2.fireEvent("audioprocess", time);
        }
      };
    }
    /** @private */

  }, {
    key: "removeOnAudioProcess",
    value: function removeOnAudioProcess() {
      this.scriptNode.onaudioprocess = function () {};
    }
    /** Create analyser node to perform audio analysis */

  }, {
    key: "createAnalyserNode",
    value: function createAnalyserNode() {
      this.analyser = this.ac.createAnalyser();
      this.analyser.connect(this.gainNode);
    }
    /**
     * Create the gain node needed to control the playback volume.
     *
     */

  }, {
    key: "createVolumeNode",
    value: function createVolumeNode() {
      // Create gain node using the AudioContext
      if (this.ac.createGain) {
        this.gainNode = this.ac.createGain();
      } else {
        this.gainNode = this.ac.createGainNode();
      } // Add the gain node to the graph


      this.gainNode.connect(this.ac.destination);
    }
    /**
     * Set the sink id for the media player
     *
     * @param {string} deviceId String value representing audio device id.
     * @returns {Promise} A Promise that resolves to `undefined` when there
     * are no errors.
     */

  }, {
    key: "setSinkId",
    value: function setSinkId(deviceId) {
      if (deviceId) {
        /**
         * The webaudio API doesn't currently support setting the device
         * output. Here we create an HTMLAudioElement, connect the
         * webaudio stream to that element and setSinkId there.
         */
        var audio = new window.Audio();

        if (!audio.setSinkId) {
          return Promise.reject(new Error("setSinkId is not supported in your browser"));
        }

        audio.autoplay = true;
        var dest = this.ac.createMediaStreamDestination();
        this.gainNode.disconnect();
        this.gainNode.connect(dest);
        audio.srcObject = dest.stream;
        return audio.setSinkId(deviceId);
      } else {
        return Promise.reject(new Error("Invalid deviceId: " + deviceId));
      }
    }
    /**
     * Set the audio volume
     *
     * @param {number} value A floating point value between 0 and 1.
     */

  }, {
    key: "setVolume",
    value: function setVolume(value) {
      this.gainNode.gain.setValueAtTime(value, this.ac.currentTime);
    }
    /**
     * Get the current volume
     *
     * @return {number} value A floating point value between 0 and 1.
     */

  }, {
    key: "getVolume",
    value: function getVolume() {
      return this.gainNode.gain.value;
    }
    /**
     * Decode an array buffer and pass data to a callback
     *
     * @private
     * @param {ArrayBuffer} arraybuffer The array buffer to decode
     * @param {function} callback The function to call on complete.
     * @param {function} errback The function to call on error.
     */

  }, {
    key: "decodeArrayBuffer",
    value: function decodeArrayBuffer(arraybuffer, callback, errback) {
      if (!this.offlineAc) {
        this.offlineAc = this.getOfflineAudioContext(this.ac && this.ac.sampleRate ? this.ac.sampleRate : 44100);
      }

      this.offlineAc.decodeAudioData(arraybuffer, function (data) {
        return callback(data);
      }, errback);
    }
    /**
     * Set pre-decoded peaks
     *
     * @param {number[]|Number.<Array[]>} peaks Peaks data
     * @param {?number} duration Explicit duration
     */

  }, {
    key: "setPeaks",
    value: function setPeaks(peaks, duration) {
      if (duration != null) {
        this.explicitDuration = duration;
      }

      this.peaks = peaks;
    }
    /**
     * Set the rendered length (different from the length of the audio)
     *
     * @param {number} length The rendered length
     */

  }, {
    key: "setLength",
    value: function setLength(length) {
      // No resize, we can preserve the cached peaks.
      if (this.mergedPeaks && length == 2 * this.mergedPeaks.length - 1 + 2) {
        return;
      }

      this.splitPeaks = [];
      this.mergedPeaks = []; // Set the last element of the sparse array so the peak arrays are
      // appropriately sized for other calculations.

      var channels = this.buffer ? this.buffer.numberOfChannels : 1;
      var c;

      for (c = 0; c < channels; c++) {
        this.splitPeaks[c] = [];
        this.splitPeaks[c][2 * (length - 1)] = 0;
        this.splitPeaks[c][2 * (length - 1) + 1] = 0;
      }

      this.mergedPeaks[2 * (length - 1)] = 0;
      this.mergedPeaks[2 * (length - 1) + 1] = 0;
    }
    /**
     * Compute the max and min value of the waveform when broken into <length> subranges.
     *
     * @param {number} length How many subranges to break the waveform into.
     * @param {number} first First sample in the required range.
     * @param {number} last Last sample in the required range.
     * @return {number[]|Number.<Array[]>} Array of 2*<length> peaks or array of arrays of
     * peaks consisting of (max, min) values for each subrange.
     */

  }, {
    key: "getPeaks",
    value: function getPeaks(length, first, last) {
      if (this.peaks) {
        return this.peaks;
      }

      if (!this.buffer) {
        return [];
      }

      first = first || 0;
      last = last || length - 1;
      this.setLength(length);

      if (!this.buffer) {
        return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
      }
      /**
       * The following snippet fixes a buffering data issue on the Safari
       * browser which returned undefined It creates the missing buffer based
       * on 1 channel, 4096 samples and the sampleRate from the current
       * webaudio context 4096 samples seemed to be the best fit for rendering
       * will review this code once a stable version of Safari TP is out
       */


      if (!this.buffer.length) {
        var newBuffer = this.createBuffer(1, 4096, this.sampleRate);
        this.buffer = newBuffer.buffer;
      }

      var sampleSize = this.buffer.length / length;
      var sampleStep = ~~(sampleSize / 10) || 1;
      var channels = this.buffer.numberOfChannels;
      var c;

      for (c = 0; c < channels; c++) {
        var peaks = this.splitPeaks[c];
        var chan = this.buffer.getChannelData(c);
        var i = void 0;

        for (i = first; i <= last; i++) {
          var start = ~~(i * sampleSize);
          var end = ~~(start + sampleSize);
          /**
           * Initialize the max and min to the first sample of this
           * subrange, so that even if the samples are entirely
           * on one side of zero, we still return the true max and
           * min values in the subrange.
           */

          var min = chan[start];
          var max = min;
          var j = void 0;

          for (j = start; j < end; j += sampleStep) {
            var value = chan[j];

            if (value > max) {
              max = value;
            }

            if (value < min) {
              min = value;
            }
          }

          peaks[2 * i] = max;
          peaks[2 * i + 1] = min;

          if (c == 0 || max > this.mergedPeaks[2 * i]) {
            this.mergedPeaks[2 * i] = max;
          }

          if (c == 0 || min < this.mergedPeaks[2 * i + 1]) {
            this.mergedPeaks[2 * i + 1] = min;
          }
        }
      }

      return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
    }
    /**
     * Get the position from 0 to 1
     *
     * @return {number} Position
     */

  }, {
    key: "getPlayedPercents",
    value: function getPlayedPercents() {
      return this.state.getPlayedPercents.call(this);
    }
    /** @private */

  }, {
    key: "disconnectSource",
    value: function disconnectSource() {
      if (this.source) {
        this.source.disconnect();
      }
    }
    /**
     * Destroy all references with WebAudio, disconnecting audio nodes and closing Audio Context
     */

  }, {
    key: "destroyWebAudio",
    value: function destroyWebAudio() {
      this.disconnectFilters();
      this.disconnectSource();
      this.gainNode.disconnect();
      this.scriptNode.disconnect();
      this.analyser.disconnect(); // close the audioContext if closeAudioContext option is set to true

      if (this.params.closeAudioContext) {
        // check if browser supports AudioContext.close()
        if (typeof this.ac.close === "function" && this.ac.state != "closed") {
          this.ac.close();
        } // clear the reference to the audiocontext


        this.ac = null; // clear the actual audiocontext, either passed as param or the
        // global singleton

        if (!this.params.audioContext) {
          window.WaveSurferAudioContext = null;
        } else {
          this.params.audioContext = null;
        } // clear the offlineAudioContext


        window.WaveSurferOfflineAudioContext = null;
      }
    }
    /**
     * This is called when wavesurfer is destroyed
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.isPaused()) {
        this.pause();
      }

      this.unAll();
      this.buffer = null;
      this.destroyed = true;
      this.destroyWebAudio();
    }
    /**
     * Loaded a decoded audio buffer
     *
     * @param {Object} buffer Decoded audio buffer to load
     */

  }, {
    key: "load",
    value: function load(buffer) {
      this.startPosition = 0;
      this.lastPlay = this.ac.currentTime;
      this.buffer = buffer;
      this.createSource();
    }
    /** @private */

  }, {
    key: "createSource",
    value: function createSource() {
      this.disconnectSource();
      this.source = this.ac.createBufferSource(); // adjust for old browsers

      this.source.start = this.source.start || this.source.noteGrainOn;
      this.source.stop = this.source.stop || this.source.noteOff;
      this.source.playbackRate.setValueAtTime(this.playbackRate, this.ac.currentTime);
      this.source.buffer = this.buffer;
      this.source.connect(this.analyser);
    }
    /**
     * @private
     *
     * some browsers require an explicit call to #resume before they will play back audio
     */

  }, {
    key: "resumeAudioContext",
    value: function resumeAudioContext() {
      if (this.ac.state == "suspended") {
        this.ac.resume && this.ac.resume();
      }
    }
    /**
     * Used by `wavesurfer.isPlaying()` and `wavesurfer.playPause()`
     *
     * @return {boolean} Whether or not this backend is currently paused
     */

  }, {
    key: "isPaused",
    value: function isPaused() {
      return this.state !== this.states[PLAYING];
    }
    /**
     * Used by `wavesurfer.getDuration()`
     *
     * @return {number} Duration of loaded buffer
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      if (this.explicitDuration) {
        return this.explicitDuration;
      }

      if (!this.buffer) {
        return 0;
      }

      return this.buffer.duration;
    }
    /**
     * Used by `wavesurfer.seekTo()`
     *
     * @param {number} start Position to start at in seconds
     * @param {number} end Position to end at in seconds
     * @return {{start: number, end: number}} Object containing start and end
     * positions
     */

  }, {
    key: "seekTo",
    value: function seekTo(start, end) {
      if (!this.buffer) {
        return;
      }

      this.scheduledPause = null;

      if (start == null) {
        start = this.getCurrentTime();

        if (start >= this.getDuration()) {
          start = 0;
        }
      }

      if (end == null) {
        end = this.getDuration();
      }

      this.startPosition = start;
      this.lastPlay = this.ac.currentTime;

      if (this.state === this.states[FINISHED]) {
        this.setState(PAUSED);
      }

      return {
        start: start,
        end: end
      };
    }
    /**
     * Get the playback position in seconds
     *
     * @return {number} The playback position in seconds
     */

  }, {
    key: "getPlayedTime",
    value: function getPlayedTime() {
      return (this.ac.currentTime - this.lastPlay) * this.playbackRate;
    }
    /**
     * Plays the loaded audio region.
     *
     * @param {number} start Start offset in seconds, relative to the beginning
     * of a clip.
     * @param {number} end When to stop relative to the beginning of a clip.
     */

  }, {
    key: "play",
    value: function play(start, end) {
      if (!this.buffer) {
        return;
      } // need to re-create source on each playback


      this.createSource();
      var adjustedTime = this.seekTo(start, end);
      start = adjustedTime.start;
      end = adjustedTime.end;
      this.scheduledPause = end;
      this.source.start(0, start);
      this.resumeAudioContext();
      this.setState(PLAYING);
      this.fireEvent("play");
    }
    /**
     * Pauses the loaded audio.
     */

  }, {
    key: "pause",
    value: function pause() {
      this.scheduledPause = null;
      this.startPosition += this.getPlayedTime();
      this.source && this.source.stop(0);
      this.setState(PAUSED);
      this.fireEvent("pause");
    }
    /**
     * Returns the current time in seconds relative to the audio-clip's
     * duration.
     *
     * @return {number} The current time in seconds
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.state.getCurrentTime.call(this);
    }
    /**
     * Returns the current playback rate. (0=no playback, 1=normal playback)
     *
     * @return {number} The current playback rate
     */

  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this.playbackRate;
    }
    /**
     * Set the audio source playback rate.
     *
     * @param {number} value The playback rate to use
     */

  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(value) {
      value = value || 1;

      if (this.isPaused()) {
        this.playbackRate = value;
      } else {
        this.pause();
        this.playbackRate = value;
        this.play();
      }
    }
    /**
     * Set a point in seconds for playback to stop at.
     *
     * @param {number} end Position to end at
     * @version 3.3.0
     */

  }, {
    key: "setPlayEnd",
    value: function setPlayEnd(end) {
      this.scheduledPause = end;
    }
  }]);

  return WebAudio;
}(observer_Observer);

_defineProperty(webaudio_WebAudio, "scriptBufferSize", 256);


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__("e439");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.get.js
var es_reflect_get = __webpack_require__("5d41");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/superPropBase.js

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/get.js



function get_get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    get_get = Reflect.get;
  } else {
    get_get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return get_get(target, property, receiver || target);
}
// CONCATENATED MODULE: ./src/components/WaveSurfer/mediaelement.js













/**
 * MediaElement backend
 */

var mediaelement_MediaElement = /*#__PURE__*/function (_WebAudio) {
  _inherits(MediaElement, _WebAudio);

  var _super = _createSuper(MediaElement);

  /**
   * Construct the backend
   *
   * @param {WavesurferParams} params Wavesurfer parameters
   */
  function MediaElement(params) {
    var _this;

    _classCallCheck(this, MediaElement);

    _this = _super.call(this, params);
    /** @private */

    _this.params = params;
    /**
     * Initially a dummy media element to catch errors. Once `_load` is
     * called, this will contain the actual `HTMLMediaElement`.
     * @private
     */

    _this.media = {
      currentTime: 0,
      duration: 0,
      paused: true,
      playbackRate: 1,
      play: function play() {},
      pause: function pause() {},
      volume: 0
    };
    /** @private */

    _this.mediaType = params.mediaType.toLowerCase();
    /** @private */

    _this.elementPosition = params.elementPosition;
    /** @private */

    _this.peaks = null;
    /** @private */

    _this.playbackRate = 1;
    /** @private */

    _this.volume = 1;
    /** @private */

    _this.isMuted = false;
    /** @private */

    _this.buffer = null;
    /** @private */

    _this.onPlayEnd = null;
    /** @private */

    _this.mediaListeners = {};
    return _this;
  }
  /**
   * Initialise the backend, called in `wavesurfer.createBackend()`
   */


  _createClass(MediaElement, [{
    key: "init",
    value: function init() {
      this.setPlaybackRate(this.params.audioRate);
      this.createTimer();
    }
    /**
     * Attach event listeners to media element.
     */

  }, {
    key: "_setupMediaListeners",
    value: function _setupMediaListeners() {
      var _this2 = this;

      this.mediaListeners.error = function () {
        _this2.fireEvent("error", "Error loading media element");
      };

      this.mediaListeners.canplay = function () {
        _this2.fireEvent("canplay");
      };

      this.mediaListeners.ended = function () {
        _this2.fireEvent("finish");
      }; // listen to and relay play, pause and seeked events to enable
      // playback control from the external media element


      this.mediaListeners.play = function () {
        _this2.fireEvent("play");
      };

      this.mediaListeners.pause = function () {
        _this2.fireEvent("pause");
      };
      /* eslint-disable  no-unused-vars*/


      this.mediaListeners.seeked = function (event) {
        _this2.fireEvent("seek");
      };
      /* eslint-enable */

      /* eslint-disable  no-unused-vars*/


      this.mediaListeners.volumechange = function (event) {
        _this2.isMuted = _this2.media.muted;

        if (_this2.isMuted) {
          _this2.volume = 0;
        } else {
          _this2.volume = _this2.media.volume;
        }

        _this2.fireEvent("volume");
      };
      /* eslint-enable */
      // reset event listeners


      Object.keys(this.mediaListeners).forEach(function (id) {
        _this2.media.removeEventListener(id, _this2.mediaListeners[id]);

        _this2.media.addEventListener(id, _this2.mediaListeners[id]);
      });
    }
    /**
     * Create a timer to provide a more precise `audioprocess` event.
     */

  }, {
    key: "createTimer",
    value: function createTimer() {
      var _this3 = this;

      var onAudioProcess = function onAudioProcess() {
        if (_this3.isPaused()) {
          return;
        }

        _this3.fireEvent("audioprocess", _this3.getCurrentTime()); // Call again in the next frame


        frame_frame(onAudioProcess)();
      };

      this.on("play", onAudioProcess); // Update the progress one more time to prevent it from being stuck in
      // case of lower framerates

      this.on("pause", function () {
        _this3.fireEvent("audioprocess", _this3.getCurrentTime());
      });
    }
    /**
     * Create media element with url as its source,
     * and append to container element.
     *
     * @param {string} url Path to media file
     * @param {HTMLElement} container HTML element
     * @param {number[]|Number.<Array[]>} peaks Array of peak data
     * @param {string} preload HTML 5 preload attribute value
     * @throws Will throw an error if the `url` argument is not a valid media
     * element.
     */

  }, {
    key: "load",
    value: function load(url, container, peaks, preload) {
      var media = document.createElement(this.mediaType);
      media.controls = this.params.mediaControls;
      media.autoplay = this.params.autoplay || false;
      media.preload = preload == null ? "auto" : preload;
      media.src = url;
      media.style.width = "100%";
      var prevMedia = container.querySelector(this.mediaType);

      if (prevMedia) {
        container.removeChild(prevMedia);
      }

      container.appendChild(media);

      this._load(media, peaks, preload);
    }
    /**
     * Load existing media element.
     *
     * @param {HTMLMediaElement} elt HTML5 Audio or Video element
     * @param {number[]|Number.<Array[]>} peaks Array of peak data
     */

  }, {
    key: "loadElt",
    value: function loadElt(elt, peaks) {
      elt.controls = this.params.mediaControls;
      elt.autoplay = this.params.autoplay || false;

      this._load(elt, peaks, elt.preload);
    }
    /**
     * Method called by both `load` (from url)
     * and `loadElt` (existing media element) methods.
     *
     * @param {HTMLMediaElement} media HTML5 Audio or Video element
     * @param {number[]|Number.<Array[]>} peaks Array of peak data
     * @param {string} preload HTML 5 preload attribute value
     * @throws Will throw an error if the `media` argument is not a valid media
     * element.
     * @private
     */

  }, {
    key: "_load",
    value: function _load(media, peaks, preload) {
      // verify media element is valid
      if (!(media instanceof HTMLMediaElement) || typeof media.addEventListener === "undefined") {
        throw new Error("media parameter is not a valid media element");
      } // load must be called manually on iOS, otherwise peaks won't draw
      // until a user interaction triggers load --> 'ready' event
      //
      // note that we avoid calling media.load here when given peaks and preload == 'none'
      // as this almost always triggers some browser fetch of the media.


      if (typeof media.load == "function" && !(peaks && preload == "none")) {
        // Resets the media element and restarts the media resource. Any
        // pending events are discarded. How much media data is fetched is
        // still affected by the preload attribute.
        media.load();
      }

      this.media = media;

      this._setupMediaListeners();

      this.peaks = peaks;
      this.onPlayEnd = null;
      this.buffer = null;
      this.isMuted = media.muted;
      this.setPlaybackRate(this.playbackRate);
      this.setVolume(this.volume);
    }
    /**
     * Used by `wavesurfer.isPlaying()` and `wavesurfer.playPause()`
     *
     * @return {boolean} Media paused or not
     */

  }, {
    key: "isPaused",
    value: function isPaused() {
      return !this.media || this.media.paused;
    }
    /**
     * Used by `wavesurfer.getDuration()`
     *
     * @return {number} Duration
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      if (this.explicitDuration) {
        return this.explicitDuration;
      }

      var duration = (this.buffer || this.media).duration;

      if (duration >= Infinity) {
        // streaming audio
        duration = this.media.seekable.end(0);
      }

      return duration;
    }
    /**
     * Returns the current time in seconds relative to the audio-clip's
     * duration.
     *
     * @return {number} Current time
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.media && this.media.currentTime;
    }
    /**
     * Get the position from 0 to 1
     *
     * @return {number} Current position
     */

  }, {
    key: "getPlayedPercents",
    value: function getPlayedPercents() {
      return this.getCurrentTime() / this.getDuration() || 0;
    }
    /**
     * Get the audio source playback rate.
     *
     * @return {number} Playback rate
     */

  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this.playbackRate || this.media.playbackRate;
    }
    /**
     * Set the audio source playback rate.
     *
     * @param {number} value Playback rate
     */

  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(value) {
      this.playbackRate = value || 1;
      this.media.playbackRate = this.playbackRate;
    }
    /**
     * Used by `wavesurfer.seekTo()`
     *
     * @param {number} start Position to start at in seconds
     */

  }, {
    key: "seekTo",
    value: function seekTo(start) {
      if (start != null) {
        this.media.currentTime = start;
      }

      this.clearPlayEnd();
    }
    /**
     * Plays the loaded audio region.
     *
     * @param {number} start Start offset in seconds, relative to the beginning
     * of a clip.
     * @param {number} end When to stop, relative to the beginning of a clip.
     * @emits MediaElement#play
     * @return {Promise} Result
     */

  }, {
    key: "play",
    value: function play(start, end) {
      if (end == undefined) {
        end = this.getDuration();
      }

      if (start == undefined) {
        var currentTime = Math.round(this.getDuration() * 1000) / 1000;
        var endTime = Math.round(end * 1000) / 1000;

        if (currentTime >= endTime) {
          this.seekTo(0);
        }
      } else {
        this.seekTo(start);
      }

      var promise = this.media.play();
      this.setPlayEnd(end);
      return promise;
    }
    /**
     * Pauses the loaded audio.
     *
     * @emits MediaElement#pause
     * @return {Promise} Result
     */

  }, {
    key: "pause",
    value: function pause() {
      var promise;

      if (this.media) {
        promise = this.media.pause();
      }

      this.clearPlayEnd();
      return promise;
    }
    /**
     * Set the play end
     *
     * @param {number} end Where to end
     */

  }, {
    key: "setPlayEnd",
    value: function setPlayEnd(end) {
      var _this4 = this;

      this.clearPlayEnd();

      this._onPlayEnd = function (time) {
        if (time >= end) {
          _this4.pause();

          _this4.seekTo(end);
        }
      };

      this.on("audioprocess", this._onPlayEnd);
    }
    /** @private */

  }, {
    key: "clearPlayEnd",
    value: function clearPlayEnd() {
      if (this._onPlayEnd) {
        this.un("audioprocess", this._onPlayEnd);
        this._onPlayEnd = null;
      }
    }
    /**
     * Compute the max and min value of the waveform when broken into
     * <length> subranges.
     *
     * @param {number} length How many subranges to break the waveform into.
     * @param {number} first First sample in the required range.
     * @param {number} last Last sample in the required range.
     * @return {number[]|Number.<Array[]>} Array of 2*<length> peaks or array of
     * arrays of peaks consisting of (max, min) values for each subrange.
     */

  }, {
    key: "getPeaks",
    value: function getPeaks(length, first, last) {
      if (this.buffer) {
        return get_get(_getPrototypeOf(MediaElement.prototype), "getPeaks", this).call(this, length, first, last);
      }

      return this.peaks || [];
    }
    /**
     * Set the sink id for the media player
     *
     * @param {string} deviceId String value representing audio device id.
     * @returns {Promise} A Promise that resolves to `undefined` when there
     * are no errors.
     */

  }, {
    key: "setSinkId",
    value: function setSinkId(deviceId) {
      if (deviceId) {
        if (!this.media.setSinkId) {
          return Promise.reject(new Error("setSinkId is not supported in your browser"));
        }

        return this.media.setSinkId(deviceId);
      }

      return Promise.reject(new Error("Invalid deviceId: " + deviceId));
    }
    /**
     * Get the current volume
     *
     * @return {number} value A floating point value between 0 and 1.
     */

  }, {
    key: "getVolume",
    value: function getVolume() {
      return this.volume;
    }
    /**
     * Set the audio volume
     *
     * @param {number} value A floating point value between 0 and 1.
     */

  }, {
    key: "setVolume",
    value: function setVolume(value) {
      this.volume = value; // no need to change when it's already at that volume

      if (this.media.volume !== this.volume) {
        this.media.volume = this.volume;
      }
    }
    /**
     * Enable or disable muted audio
     *
     * @since 4.0.0
     * @param {boolean} muted Specify `true` to mute audio.
     */

  }, {
    key: "setMute",
    value: function setMute(muted) {
      // This causes a volume change to be emitted too through the
      // volumechange event listener.
      this.isMuted = this.media.muted = muted;
    }
    /**
     * This is called when wavesurfer is destroyed
     *
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;

      this.pause();
      this.unAll();
      this.destroyed = true; // cleanup media event listeners

      Object.keys(this.mediaListeners).forEach(function (id) {
        if (_this5.media) {
          _this5.media.removeEventListener(id, _this5.mediaListeners[id]);
        }
      });

      if (this.params.removeMediaElementOnDestroy && this.media && this.media.parentNode) {
        this.media.parentNode.removeChild(this.media);
      }

      this.media = null;
    }
  }]);

  return MediaElement;
}(webaudio_WebAudio);


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// CONCATENATED MODULE: ./src/components/WaveSurfer/peakcache.js





/**
 * Caches the decoded peaks data to improve rendering speed for large audio
 *
 * Is used if the option parameter `partialRender` is set to `true`
 */
var peakcache_PeakCache = /*#__PURE__*/function () {
  /**
   * Instantiate cache
   */
  function PeakCache() {
    _classCallCheck(this, PeakCache);

    this.clearPeakCache();
  }
  /**
   * Empty the cache
   */


  _createClass(PeakCache, [{
    key: "clearPeakCache",
    value: function clearPeakCache() {
      /**
       * Flat array with entries that are always in pairs to mark the
       * beginning and end of each subrange.  This is a convenience so we can
       * iterate over the pairs for easy set difference operations.
       * @private
       */
      this.peakCacheRanges = [];
      /**
       * Length of the entire cachable region, used for resetting the cache
       * when this changes (zoom events, for instance).
       * @private
       */

      this.peakCacheLength = -1;
    }
    /**
     * Add a range of peaks to the cache
     *
     * @param {number} length The length of the range
     * @param {number} start The x offset of the start of the range
     * @param {number} end The x offset of the end of the range
     * @return {Number.<Array[]>} Array with arrays of numbers
     */

  }, {
    key: "addRangeToPeakCache",
    value: function addRangeToPeakCache(length, start, end) {
      if (length != this.peakCacheLength) {
        this.clearPeakCache();
        this.peakCacheLength = length;
      } // Return ranges that weren't in the cache before the call.


      var uncachedRanges = [];
      var i = 0; // Skip ranges before the current start.

      while (i < this.peakCacheRanges.length && this.peakCacheRanges[i] < start) {
        i++;
      } // If |i| is even, |start| falls after an existing range.  Otherwise,
      // |start| falls between an existing range, and the uncached region
      // starts when we encounter the next node in |peakCacheRanges| or
      // |end|, whichever comes first.


      if (i % 2 == 0) {
        uncachedRanges.push(start);
      }

      while (i < this.peakCacheRanges.length && this.peakCacheRanges[i] <= end) {
        uncachedRanges.push(this.peakCacheRanges[i]);
        i++;
      } // If |i| is even, |end| is after all existing ranges.


      if (i % 2 == 0) {
        uncachedRanges.push(end);
      } // Filter out the 0-length ranges.


      uncachedRanges = uncachedRanges.filter(function (item, pos, arr) {
        if (pos == 0) {
          return item != arr[pos + 1];
        } else if (pos == arr.length - 1) {
          return item != arr[pos - 1];
        }

        return item != arr[pos - 1] && item != arr[pos + 1];
      }); // Merge the two ranges together, uncachedRanges will either contain
      // wholly new points, or duplicates of points in peakCacheRanges.  If
      // duplicates are detected, remove both and extend the range.

      this.peakCacheRanges = this.peakCacheRanges.concat(uncachedRanges);
      this.peakCacheRanges = this.peakCacheRanges.sort(function (a, b) {
        return a - b;
      }).filter(function (item, pos, arr) {
        if (pos == 0) {
          return item != arr[pos + 1];
        } else if (pos == arr.length - 1) {
          return item != arr[pos - 1];
        }

        return item != arr[pos - 1] && item != arr[pos + 1];
      }); // Push the uncached ranges into an array of arrays for ease of
      // iteration in the functions that call this.

      var uncachedRangePairs = [];

      for (i = 0; i < uncachedRanges.length; i += 2) {
        uncachedRangePairs.push([uncachedRanges[i], uncachedRanges[i + 1]]);
      }

      return uncachedRangePairs;
    }
    /**
     * For testing
     *
     * @return {Number.<Array[]>} Array with arrays of numbers
     */

  }, {
    key: "getCacheRanges",
    value: function getCacheRanges() {
      var peakCacheRangePairs = [];
      var i;

      for (i = 0; i < this.peakCacheRanges.length; i += 2) {
        peakCacheRangePairs.push([this.peakCacheRanges[i], this.peakCacheRanges[i + 1]]);
      }

      return peakCacheRangePairs;
    }
  }]);

  return PeakCache;
}();


// CONCATENATED MODULE: ./src/components/WaveSurfer/mediaelement-webaudio.js







/**
 * MediaElementWebAudio backend: load audio via an HTML5 audio tag, but playback with the WebAudio API.
 * The advantage here is that the html5 <audio> tag can perform range requests on the server and not
 * buffer the entire file in one request, and you still get the filtering and scripting functionality
 * of the webaudio API.
 * Note that in order to use range requests and prevent buffering, you must provide peak data.
 *
 * @since 3.2.0
 */

var mediaelement_webaudio_MediaElementWebAudio = /*#__PURE__*/function (_MediaElement) {
  _inherits(MediaElementWebAudio, _MediaElement);

  var _super = _createSuper(MediaElementWebAudio);

  /**
   * Construct the backend
   *
   * @param {WavesurferParams} params Wavesurfer parameters
   */
  function MediaElementWebAudio(params) {
    var _this;

    _classCallCheck(this, MediaElementWebAudio);

    _this = _super.call(this, params);
    /** @private */

    _this.params = params;
    /** @private */

    _this.sourceMediaElement = null;
    return _this;
  }
  /**
   * Initialise the backend, called in `wavesurfer.createBackend()`
   */


  _createClass(MediaElementWebAudio, [{
    key: "init",
    value: function init() {
      this.setPlaybackRate(this.params.audioRate);
      this.createTimer();
      this.createVolumeNode();
      this.createScriptNode();
      this.createAnalyserNode();
    }
    /**
     * Private method called by both `load` (from url)
     * and `loadElt` (existing media element) methods.
     *
     * @param {HTMLMediaElement} media HTML5 Audio or Video element
     * @param {number[]|Number.<Array[]>} peaks Array of peak data
     * @param {string} preload HTML 5 preload attribute value
     * @private
     */

  }, {
    key: "_load",
    value: function _load(media, peaks, preload) {
      get_get(_getPrototypeOf(MediaElementWebAudio.prototype), "_load", this).call(this, media, peaks, preload);

      this.createMediaElementSource(media);
    }
    /**
     * Create MediaElementSource node
     *
     * @since 3.2.0
     * @param {HTMLMediaElement} mediaElement HTML5 Audio to load
     */

  }, {
    key: "createMediaElementSource",
    value: function createMediaElementSource(mediaElement) {
      this.sourceMediaElement = this.ac.createMediaElementSource(mediaElement);
      this.sourceMediaElement.connect(this.analyser);
    }
  }, {
    key: "play",
    value: function play(start, end) {
      this.resumeAudioContext();
      return get_get(_getPrototypeOf(MediaElementWebAudio.prototype), "play", this).call(this, start, end);
    }
    /**
     * This is called when wavesurfer is destroyed
     *
     */

  }, {
    key: "destroy",
    value: function destroy() {
      get_get(_getPrototypeOf(MediaElementWebAudio.prototype), "destroy", this).call(this);

      this.destroyWebAudio();
    }
  }]);

  return MediaElementWebAudio;
}(mediaelement_MediaElement);


// CONCATENATED MODULE: ./src/components/WaveSurfer/wavesurfer.js























/*
 * This work is licensed under a BSD-3-Clause License.
 */

/** @external {HTMLElement} https://developer.mozilla.org/en/docs/Web/API/HTMLElement */

/** @external {OfflineAudioContext} https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext */

/** @external {File} https://developer.mozilla.org/en-US/docs/Web/API/File */

/** @external {Blob} https://developer.mozilla.org/en-US/docs/Web/API/Blob */

/** @external {CanvasRenderingContext2D} https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D */

/** @external {MediaStreamConstraints} https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints */

/** @external {AudioNode} https://developer.mozilla.org/de/docs/Web/API/AudioNode */

/**
 * @typedef {Object} WavesurferParams
 * @property {AudioContext} audioContext=null Use your own previously
 * initialized AudioContext or leave blank.
 * @property {number} audioRate=1 Speed at which to play audio. Lower number is
 * slower.
 * @property {ScriptProcessorNode} audioScriptProcessor=null Use your own previously
 * initialized ScriptProcessorNode or leave blank.
 * @property {boolean} autoCenter=true If a scrollbar is present, center the
 * waveform on current progress
 * @property {number} autoCenterRate=5 If autoCenter is active, rate at which the
 * waveform is centered
 * @property {boolean} autoCenterImmediately=false If autoCenter is active, immediately
 * center waveform on current progress
 * @property {string} backend='WebAudio' `'WebAudio'|'MediaElement'|'MediaElementWebAudio'` In most cases
 * you don't have to set this manually. MediaElement is a fallback for unsupported browsers.
 * MediaElementWebAudio allows to use WebAudio API also with big audio files, loading audio like with
 * MediaElement backend (HTML5 audio tag). You have to use the same methods of MediaElement backend for loading and
 * playback, giving also peaks, so the audio data are not decoded. In this way you can use WebAudio features, like filters,
 * also with audio with big duration. For example:
 * ` wavesurfer.load(url | HTMLMediaElement, peaks, preload, duration);
 *   wavesurfer.play();
 *   wavesurfer.setFilter(customFilter);
 * `
 * @property {string} backgroundColor=null Change background color of the
 * waveform container.
 * @property {number} barHeight=1 The height of the wave bars.
 * @property {number} barRadius=0 The radius of the wave bars. Makes bars rounded
 * @property {number} barGap=null The optional spacing between bars of the wave,
 * if not provided will be calculated in legacy format.
 * @property {number} barWidth=null Draw the waveform using bars.
 * @property {number} barMinHeight=null If specified, draw at least a bar of this height,
 * eliminating waveform gaps
 * @property {boolean} closeAudioContext=false Close and nullify all audio
 * contexts when the destroy method is called.
 * @property {!string|HTMLElement} container CSS selector or HTML element where
 * the waveform should be drawn. This is the only required parameter.
 * @property {string} cursorColor='#333' The fill color of the cursor indicating
 * the playhead position.
 * @property {number} cursorWidth=1 Measured in pixels.
 * @property {object} drawingContextAttributes={desynchronized: false} Drawing context
 * attributes.
 * @property {number} duration=null Optional audio length so pre-rendered peaks
 * can be display immediately for example.
 * @property {boolean} fillParent=true Whether to fill the entire container or
 * draw only according to `minPxPerSec`.
 * @property {boolean} forceDecode=false Force decoding of audio using web audio
 * when zooming to get a more detailed waveform.
 * @property {number} height=128 The height of the waveform. Measured in
 * pixels.
 * @property {boolean} hideScrollbar=false Whether to hide the horizontal
 * scrollbar when one would normally be shown.
 * @property {boolean} interact=true Whether the mouse interaction will be
 * enabled at initialization. You can switch this parameter at any time later
 * on.
 * @property {boolean} loopSelection=true (Use with regions plugin) Enable
 * looping of selected regions
 * @property {number} maxCanvasWidth=4000 Maximum width of a single canvas in
 * pixels, excluding a small overlap (2 * `pixelRatio`, rounded up to the next
 * even integer). If the waveform is longer than this value, additional canvases
 * will be used to render the waveform, which is useful for very large waveforms
 * that may be too wide for browsers to draw on a single canvas.
 * @property {boolean} mediaControls=false (Use with backend `MediaElement` or `MediaElementWebAudio`)
 * this enables the native controls for the media element
 * @property {string} mediaType='audio' (Use with backend `MediaElement` or `MediaElementWebAudio`)
 * `'audio'|'video'` ('video' only for `MediaElement`)
 * @property {number} minPxPerSec=20 Minimum number of pixels per second of
 * audio.
 * @property {boolean} normalize=false If true, normalize by the maximum peak
 * instead of 1.0.
 * @property {boolean} partialRender=false Use the PeakCache to improve
 * rendering speed of large waveforms
 * @property {number} pixelRatio=window.devicePixelRatio The pixel ratio used to
 * calculate display
 * @property {PluginDefinition[]} plugins=[] An array of plugin definitions to
 * register during instantiation, they will be directly initialised unless they
 * are added with the `deferInit` property set to true.
 * @property {string} progressColor='#555' The fill color of the part of the
 * waveform behind the cursor. When `progressColor` and `waveColor` are the same
 * the progress wave is not rendered at all.
 * @property {boolean} removeMediaElementOnDestroy=true Set to false to keep the
 * media element in the DOM when the player is destroyed. This is useful when
 * reusing an existing media element via the `loadMediaElement` method.
 * @property {Object} renderer=MultiCanvas Can be used to inject a custom
 * renderer.
 * @property {boolean|number} responsive=false If set to `true` resize the
 * waveform, when the window is resized. This is debounced with a `100ms`
 * timeout by default. If this parameter is a number it represents that timeout.
 * @property {boolean} rtl=false If set to `true`, renders waveform from
 * right-to-left.
 * @property {boolean} scrollParent=false Whether to scroll the container with a
 * lengthy waveform. Otherwise the waveform is shrunk to the container width
 * (see fillParent).
 * @property {number} skipLength=2 Number of seconds to skip with the
 * skipForward() and skipBackward() methods.
 * @property {boolean} splitChannels=false Render with separate waveforms for
 * the channels of the audio
 * @property {string} waveColor='#999' The fill color of the waveform after the
 * cursor.
 * @property {object} xhr={} XHR options. For example:
 * `let xhr = {
 *     cache: 'default',
 *     mode: 'cors',
 *     method: 'GET',
 *     credentials: 'same-origin',
 *     redirect: 'follow',
 *     referrer: 'client',
 *     headers: [
 *         {
 *             key: 'Authorization',
 *             value: 'my-token'
 *         }
 *     ]
 * };`
 */

/**
 * @typedef {Object} PluginDefinition
 * @desc The Object used to describe a plugin
 * @example wavesurfer.addPlugin(pluginDefinition);
 * @property {string} name The name of the plugin, the plugin instance will be
 * added as a property to the wavesurfer instance under this name
 * @property {?Object} staticProps The properties that should be added to the
 * wavesurfer instance as static properties
 * @property {?boolean} deferInit Don't initialise plugin
 * automatically
 * @property {Object} params={} The plugin parameters, they are the first parameter
 * passed to the plugin class constructor function
 * @property {PluginClass} instance The plugin instance factory, is called with
 * the dependency specified in extends. Returns the plugin class.
 */

/**
 * @interface PluginClass
 *
 * @desc This is the interface which is implemented by all plugin classes. Note
 * that this only turns into an observer after being passed through
 * `wavesurfer.addPlugin`.
 *
 * @extends {Observer}
 */

/* eslint-disable  no-unused-vars*/

var wavesurfer_PluginClass = /*#__PURE__*/function () {
  _createClass(PluginClass, [{
    key: "create",

    /**
     * Plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * It returns a `PluginDefinition` object representing the plugin.
     *
     * @param {Object} params={} The plugin params (specific to the plugin)
     */
    value: function create(params) {}
    /**
     * Construct the plugin
     *
     * @param {Object} params={} The plugin params (specific to the plugin)
     * @param {Object} ws The wavesurfer instance
     */

  }]);

  function PluginClass(params, ws) {
    _classCallCheck(this, PluginClass);
  }
  /**
   * Initialise the plugin
   *
   * Start doing something. This is called by
   * `wavesurfer.initPlugin(pluginName)`
   */


  _createClass(PluginClass, [{
    key: "init",
    value: function init() {}
    /**
     * Destroy the plugin instance
     *
     * Stop doing something. This is called by
     * `wavesurfer.destroyPlugin(pluginName)`
     */

  }, {
    key: "destroy",
    value: function destroy() {}
  }]);

  return PluginClass;
}();
/* eslint-enable */

/**
 * WaveSurfer core library class
 *
 * @extends {Observer}
 * @example
 * const params = {
 *   container: '#waveform',
 *   waveColor: 'violet',
 *   progressColor: 'purple'
 * };
 *
 * // initialise like this
 * const wavesurfer = WaveSurfer.create(params);
 *
 * // or like this ...
 * const wavesurfer = new WaveSurfer(params);
 * wavesurfer.init();
 *
 * // load audio file
 * wavesurfer.load('example/media/demo.wav');
 */


var wavesurfer_WaveSurfer = /*#__PURE__*/function (_util$Observer) {
  _inherits(WaveSurfer, _util$Observer);

  var _super = _createSuper(WaveSurfer);

  _createClass(WaveSurfer, null, [{
    key: "create",

    /** @private */

    /** @private */

    /**
     * Instantiate this class, call its `init` function and returns it
     *
     * @param {WavesurferParams} params The wavesurfer parameters
     * @return {Object} WaveSurfer instance
     * @example const wavesurfer = WaveSurfer.create(params);
     */
    value: function create(params) {
      var wavesurfer = new WaveSurfer(params);
      return wavesurfer.init();
    }
    /**
     * The library version number is available as a static property of the
     * WaveSurfer class
     *
     * @type {String}
     * @example
     * console.log('Using wavesurfer.js ' + WaveSurfer.VERSION);
     */
    // static VERSION = __VERSION__; // eslint-disable-line no-undef

    /**
     * Functions in the `util` property are available as a prototype property to
     * all instances
     *
     * @type {Object}
     * @example
     * const wavesurfer = WaveSurfer.create(params);
     * wavesurfer.util.style(myElement, { background: 'blue' });
     */

  }]);

  /**
   * Initialise wavesurfer instance
   *
   * @param {WavesurferParams} params Instantiation options for wavesurfer
   * @example
   * const wavesurfer = new WaveSurfer(params);
   * @returns {this} Wavesurfer instance
   */
  function WaveSurfer(params) {
    var _this;

    _classCallCheck(this, WaveSurfer);

    _this = _super.call(this);
    /**
     * Extract relevant parameters (or defaults)
     * @private
     */

    _defineProperty(_assertThisInitialized(_this), "defaultParams", {
      audioContext: null,
      audioScriptProcessor: null,
      audioRate: 1,
      autoCenter: true,
      autoCenterRate: 5,
      autoCenterImmediately: false,
      backend: "WebAudio",
      backgroundColor: null,
      barHeight: 1,
      barRadius: 0,
      barGap: null,
      barMinHeight: null,
      container: null,
      cursorColor: "#333",
      cursorWidth: 1,
      dragSelection: true,
      drawingContextAttributes: {
        // Boolean that hints the user agent to reduce the latency
        // by desynchronizing the canvas paint cycle from the event
        // loop
        desynchronized: false
      },
      duration: null,
      fillParent: true,
      forceDecode: false,
      height: 128,
      hideScrollbar: false,
      interact: true,
      loopSelection: true,
      maxCanvasWidth: 4000,
      mediaContainer: null,
      mediaControls: false,
      mediaType: "audio",
      minPxPerSec: 20,
      normalize: false,
      partialRender: false,
      pixelRatio: window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI,
      plugins: [],
      progressColor: "#555",
      removeMediaElementOnDestroy: true,
      renderer: drawer_multicanvas_MultiCanvas,
      responsive: false,
      rtl: false,
      scrollParent: false,
      skipLength: 2,
      splitChannels: false,
      splitChannelsOptions: {
        overlay: false,
        channelColors: {},
        filterChannels: []
      },
      waveColor: "#999",
      xhr: {}
    });

    _defineProperty(_assertThisInitialized(_this), "backends", {
      MediaElement: mediaelement_MediaElement,
      WebAudio: webaudio_WebAudio,
      MediaElementWebAudio: mediaelement_webaudio_MediaElementWebAudio
    });

    _defineProperty(_assertThisInitialized(_this), "util", util_namespaceObject);

    _this.params = Object.assign({}, _this.defaultParams, params);
    /** @private */

    _this.container = "string" == typeof params.container ? document.querySelector(_this.params.container) : params.container;

    if (!_this.container) {
      throw new Error("Container element not found");
    }

    if (_this.params.mediaContainer == null) {
      /** @private */
      _this.mediaContainer = _this.container;
    } else if (typeof _this.params.mediaContainer == "string") {
      /** @private */
      _this.mediaContainer = document.querySelector(_this.params.mediaContainer);
    } else {
      /** @private */
      _this.mediaContainer = _this.params.mediaContainer;
    }

    if (!_this.mediaContainer) {
      throw new Error("Media Container element not found");
    }

    if (_this.params.maxCanvasWidth <= 1) {
      throw new Error("maxCanvasWidth must be greater than 1");
    } else if (_this.params.maxCanvasWidth % 2 == 1) {
      throw new Error("maxCanvasWidth must be an even number");
    }

    if (_this.params.rtl === true) {
      style_style(_this.container, {
        transform: "rotateY(180deg)"
      });
    }

    if (_this.params.backgroundColor) {
      _this.setBackgroundColor(_this.params.backgroundColor);
    }
    /**
     * @private Used to save the current volume when muting so we can
     * restore once unmuted
     * @type {number}
     */


    _this.savedVolume = 0;
    /**
     * @private The current muted state
     * @type {boolean}
     */

    _this.isMuted = false;
    /**
     * @private Will hold a list of event descriptors that need to be
     * canceled on subsequent loads of audio
     * @type {Object[]}
     */

    _this.tmpEvents = [];
    /**
     * @private Holds any running audio downloads
     * @type {Observer}
     */

    _this.currentRequest = null;
    /** @private */

    _this.arraybuffer = null;
    /** @private */

    _this.drawer = null;
    /** @private */

    _this.backend = null;
    /** @private */

    _this.peakCache = null; // cache constructor objects

    if (typeof _this.params.renderer !== "function") {
      throw new Error("Renderer parameter is invalid");
    }
    /**
     * @private The uninitialised Drawer class
     */


    _this.Drawer = _this.params.renderer;
    /**
     * @private The uninitialised Backend class
     */
    // Back compat

    if (_this.params.backend == "AudioElement") {
      _this.params.backend = "MediaElement";
    }

    if ((_this.params.backend == "WebAudio" || _this.params.backend === "MediaElementWebAudio") && !webaudio_WebAudio.prototype.supportsWebAudio.call(null)) {
      _this.params.backend = "MediaElement";
    }

    _this.Backend = _this.backends[_this.params.backend];
    /**
     * @private map of plugin names that are currently initialised
     */

    _this.initialisedPluginList = {};
    /** @private */

    _this.isDestroyed = false;
    /**
     * Get the current ready status.
     *
     * @example const isReady = wavesurfer.isReady;
     * @return {boolean}
     */

    _this.isReady = false; // responsive debounced event listener. If this.params.responsive is not
    // set, this is never called. Use 100ms or this.params.responsive as
    // timeout for the debounce function.

    var prevWidth = 0;
    _this._onResize = debounce_default.a(function () {
      if (prevWidth != _this.drawer.wrapper.clientWidth && !_this.params.scrollParent) {
        prevWidth = _this.drawer.wrapper.clientWidth;

        _this.drawer.fireEvent("redraw");
      }
    }, typeof _this.params.responsive === "number" ? _this.params.responsive : 100);
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }
  /**
   * Initialise the wave
   *
   * @example
   * var wavesurfer = new WaveSurfer(params);
   * wavesurfer.init();
   * @return {this} The wavesurfer instance
   */


  _createClass(WaveSurfer, [{
    key: "init",
    value: function init() {
      this.registerPlugins(this.params.plugins);
      this.createDrawer();
      this.createBackend();
      this.createPeakCache();
      return this;
    }
    /**
     * Add and initialise array of plugins (if `plugin.deferInit` is falsey),
     * this function is called in the init function of wavesurfer
     *
     * @param {PluginDefinition[]} plugins An array of plugin definitions
     * @emits {WaveSurfer#plugins-registered} Called with the array of plugin definitions
     * @return {this} The wavesurfer instance
     */

  }, {
    key: "registerPlugins",
    value: function registerPlugins(plugins) {
      var _this2 = this;

      // first instantiate all the plugins
      plugins.forEach(function (plugin) {
        return _this2.addPlugin(plugin);
      }); // now run the init functions

      plugins.forEach(function (plugin) {
        // call init function of the plugin if deferInit is falsey
        // in that case you would manually use initPlugins()
        if (!plugin.deferInit) {
          _this2.initPlugin(plugin.name);
        }
      });
      this.fireEvent("plugins-registered", plugins);
      return this;
    }
    /**
     * Get a map of plugin names that are currently initialised
     *
     * @example wavesurfer.getPlugins();
     * @return {Object} Object with plugin names
     */

  }, {
    key: "getActivePlugins",
    value: function getActivePlugins() {
      return this.initialisedPluginList;
    }
    /**
     * Add a plugin object to wavesurfer
     *
     * @param {PluginDefinition} plugin A plugin definition
     * @emits {WaveSurfer#plugin-added} Called with the name of the plugin that was added
     * @example wavesurfer.addPlugin(WaveSurfer.minimap());
     * @return {this} The wavesurfer instance
     */

  }, {
    key: "addPlugin",
    value: function addPlugin(plugin) {
      var _this3 = this;

      if (!plugin.name) {
        throw new Error("Plugin does not have a name!");
      }

      if (!plugin.instance) {
        throw new Error("Plugin ".concat(plugin.name, " does not have an instance property!"));
      } // staticProps properties are applied to wavesurfer instance


      if (plugin.staticProps) {
        Object.keys(plugin.staticProps).forEach(function (pluginStaticProp) {
          /**
           * Properties defined in a plugin definition's `staticProps` property are added as
           * staticProps properties of the WaveSurfer instance
           */
          _this3[pluginStaticProp] = plugin.staticProps[pluginStaticProp];
        });
      }

      var Instance = plugin.instance; // turn the plugin instance into an observer

      var observerPrototypeKeys = Object.getOwnPropertyNames(observer_Observer.prototype);
      observerPrototypeKeys.forEach(function (key) {
        Instance.prototype[key] = observer_Observer.prototype[key];
      });
      /**
       * Instantiated plugin classes are added as a property of the wavesurfer
       * instance
       * @type {Object}
       */

      this[plugin.name] = new Instance(plugin.params || {}, this);
      this.fireEvent("plugin-added", plugin.name);
      return this;
    }
    /**
     * Initialise a plugin
     *
     * @param {string} name A plugin name
     * @emits WaveSurfer#plugin-initialised
     * @example wavesurfer.initPlugin('minimap');
     * @return {this} The wavesurfer instance
     */

  }, {
    key: "initPlugin",
    value: function initPlugin(name) {
      if (!this[name]) {
        throw new Error("Plugin ".concat(name, " has not been added yet!"));
      }

      if (this.initialisedPluginList[name]) {
        // destroy any already initialised plugins
        this.destroyPlugin(name);
      }

      this[name].init();
      this.initialisedPluginList[name] = true;
      this.fireEvent("plugin-initialised", name);
      return this;
    }
    /**
     * Destroy a plugin
     *
     * @param {string} name A plugin name
     * @emits WaveSurfer#plugin-destroyed
     * @example wavesurfer.destroyPlugin('minimap');
     * @returns {this} The wavesurfer instance
     */

  }, {
    key: "destroyPlugin",
    value: function destroyPlugin(name) {
      if (!this[name]) {
        throw new Error("Plugin ".concat(name, " has not been added yet and cannot be destroyed!"));
      }

      if (!this.initialisedPluginList[name]) {
        throw new Error("Plugin ".concat(name, " is not active and cannot be destroyed!"));
      }

      if (typeof this[name].destroy !== "function") {
        throw new Error("Plugin ".concat(name, " does not have a destroy function!"));
      }

      this[name].destroy();
      delete this.initialisedPluginList[name];
      this.fireEvent("plugin-destroyed", name);
      return this;
    }
    /**
     * Destroy all initialised plugins. Convenience function to use when
     * wavesurfer is removed
     *
     * @private
     */

  }, {
    key: "destroyAllPlugins",
    value: function destroyAllPlugins() {
      var _this4 = this;

      Object.keys(this.initialisedPluginList).forEach(function (name) {
        return _this4.destroyPlugin(name);
      });
    }
    /**
     * Create the drawer and draw the waveform
     *
     * @private
     * @emits WaveSurfer#drawer-created
     */

  }, {
    key: "createDrawer",
    value: function createDrawer() {
      var _this5 = this;

      this.drawer = new this.Drawer(this.container, this.params);
      this.drawer.init();
      this.fireEvent("drawer-created", this.drawer);

      if (this.params.responsive !== false) {
        window.addEventListener("resize", this._onResize, true);
        window.addEventListener("orientationchange", this._onResize, true);
      }

      this.drawer.on("redraw", function () {
        _this5.drawBuffer();

        _this5.drawer.progress(_this5.backend.getPlayedPercents());
      }); // Click-to-seek

      this.drawer.on("click", function (e, progress) {
        setTimeout(function () {
          return _this5.seekTo(progress);
        }, 0);
      }); // Relay the scroll event from the drawer

      this.drawer.on("scroll", function (e) {
        if (_this5.params.partialRender) {
          _this5.drawBuffer();
        }

        _this5.fireEvent("scroll", e);
      });
    }
    /**
     * Create the backend
     *
     * @private
     * @emits WaveSurfer#backend-created
     */

  }, {
    key: "createBackend",
    value: function createBackend() {
      var _this6 = this;

      if (this.backend) {
        this.backend.destroy();
      }

      this.backend = new this.Backend(this.params);
      this.backend.init();
      this.fireEvent("backend-created", this.backend);
      this.backend.on("finish", function () {
        _this6.drawer.progress(_this6.backend.getPlayedPercents());

        _this6.fireEvent("finish");
      });
      this.backend.on("play", function () {
        return _this6.fireEvent("play");
      });
      this.backend.on("pause", function () {
        return _this6.fireEvent("pause");
      });
      this.backend.on("audioprocess", function (time) {
        _this6.drawer.progress(_this6.backend.getPlayedPercents());

        _this6.fireEvent("audioprocess", time);
      }); // only needed for MediaElement and MediaElementWebAudio backend

      if (this.params.backend === "MediaElement" || this.params.backend === "MediaElementWebAudio") {
        this.backend.on("seek", function () {
          _this6.drawer.progress(_this6.backend.getPlayedPercents());
        });
        this.backend.on("volume", function () {
          var newVolume = _this6.getVolume();

          _this6.fireEvent("volume", newVolume);

          if (_this6.backend.isMuted !== _this6.isMuted) {
            _this6.isMuted = _this6.backend.isMuted;

            _this6.fireEvent("mute", _this6.isMuted);
          }
        });
      }
    }
    /**
     * Create the peak cache
     *
     * @private
     */

  }, {
    key: "createPeakCache",
    value: function createPeakCache() {
      if (this.params.partialRender) {
        this.peakCache = new peakcache_PeakCache();
      }
    }
    /**
     * Get the duration of the audio clip
     *
     * @example const duration = wavesurfer.getDuration();
     * @return {number} Duration in seconds
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.backend.getDuration();
    }
    /**
     * Get the current playback position
     *
     * @example const currentTime = wavesurfer.getCurrentTime();
     * @return {number} Playback position in seconds
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.backend.getCurrentTime();
    }
    /**
     * Set the current play time in seconds.
     *
     * @param {number} seconds A positive number in seconds. E.g. 10 means 10
     * seconds, 60 means 1 minute
     */

  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(seconds) {
      if (seconds >= this.getDuration()) {
        this.seekTo(1);
      } else {
        this.seekTo(seconds / this.getDuration());
      }
    }
    /**
     * Starts playback from the current position. Optional start and end
     * measured in seconds can be used to set the range of audio to play.
     *
     * @param {?number} start Position to start at
     * @param {?number} end Position to end at
     * @emits WaveSurfer#interaction
     * @return {Promise} Result of the backend play method
     * @example
     * // play from second 1 to 5
     * wavesurfer.play(1, 5);
     */

  }, {
    key: "play",
    value: function play(start, end) {
      var _this7 = this;

      this.fireEvent("interaction", function () {
        return _this7.play(start, end);
      });
      return this.backend.play(start, end);
    }
    /**
     * Set a point in seconds for playback to stop at.
     *
     * @param {number} position Position (in seconds) to stop at
     * @version 3.3.0
     */

  }, {
    key: "setPlayEnd",
    value: function setPlayEnd(position) {
      this.backend.setPlayEnd(position);
    }
    /**
     * Stops and pauses playback
     *
     * @example wavesurfer.pause();
     * @return {Promise} Result of the backend pause method
     */

  }, {
    key: "pause",
    value: function pause() {
      if (!this.backend.isPaused()) {
        return this.backend.pause();
      }
    }
    /**
     * Toggle playback
     *
     * @example wavesurfer.playPause();
     * @return {Promise} Result of the backend play or pause method
     */

  }, {
    key: "playPause",
    value: function playPause() {
      return this.backend.isPaused() ? this.play() : this.pause();
    }
    /**
     * Get the current playback state
     *
     * @example const isPlaying = wavesurfer.isPlaying();
     * @return {boolean} False if paused, true if playing
     */

  }, {
    key: "isPlaying",
    value: function isPlaying() {
      return !this.backend.isPaused();
    }
    /**
     * Skip backward
     *
     * @param {?number} seconds Amount to skip back, if not specified `skipLength`
     * is used
     * @example wavesurfer.skipBackward();
     */

  }, {
    key: "skipBackward",
    value: function skipBackward(seconds) {
      this.skip(-seconds || -this.params.skipLength);
    }
    /**
     * Skip forward
     *
     * @param {?number} seconds Amount to skip back, if not specified `skipLength`
     * is used
     * @example wavesurfer.skipForward();
     */

  }, {
    key: "skipForward",
    value: function skipForward(seconds) {
      this.skip(seconds || this.params.skipLength);
    }
    /**
     * Skip a number of seconds from the current position (use a negative value
     * to go backwards).
     *
     * @param {number} offset Amount to skip back or forwards
     * @example
     * // go back 2 seconds
     * wavesurfer.skip(-2);
     */

  }, {
    key: "skip",
    value: function skip(offset) {
      var duration = this.getDuration() || 1;
      var position = this.getCurrentTime() || 0;
      position = Math.max(0, Math.min(duration, position + (offset || 0)));
      this.seekAndCenter(position / duration);
    }
    /**
     * Seeks to a position and centers the view
     *
     * @param {number} progress Between 0 (=beginning) and 1 (=end)
     * @example
     * // seek and go to the middle of the audio
     * wavesurfer.seekTo(0.5);
     */

  }, {
    key: "seekAndCenter",
    value: function seekAndCenter(progress) {
      this.seekTo(progress);
      this.drawer.recenter(progress);
    }
    /**
     * Seeks to a position
     *
     * @param {number} progress Between 0 (=beginning) and 1 (=end)
     * @emits WaveSurfer#interaction
     * @emits WaveSurfer#seek
     * @example
     * // seek to the middle of the audio
     * wavesurfer.seekTo(0.5);
     */

  }, {
    key: "seekTo",
    value: function seekTo(progress) {
      var _this8 = this;

      // return an error if progress is not a number between 0 and 1
      if (typeof progress !== "number" || !isFinite(progress) || progress < 0 || progress > 1) {
        throw new Error("Error calling wavesurfer.seekTo, parameter must be a number between 0 and 1!");
      }

      this.fireEvent("interaction", function () {
        return _this8.seekTo(progress);
      });
      var paused = this.backend.isPaused(); // avoid draw wrong position while playing backward seeking

      if (!paused) {
        this.backend.pause();
      } // avoid small scrolls while paused seeking


      var oldScrollParent = this.params.scrollParent;
      this.params.scrollParent = false;
      this.backend.seekTo(progress * this.getDuration());
      this.drawer.progress(progress);

      if (!paused) {
        this.backend.play();
      }

      this.params.scrollParent = oldScrollParent;
      this.fireEvent("seek", progress);
    }
    /**
     * Stops and goes to the beginning.
     *
     * @example wavesurfer.stop();
     */

  }, {
    key: "stop",
    value: function stop() {
      this.pause();
      this.seekTo(0);
      this.drawer.progress(0);
    }
    /**
     * Sets the ID of the audio device to use for output and returns a Promise.
     *
     * @param {string} deviceId String value representing underlying output
     * device
     * @returns {Promise} `Promise` that resolves to `undefined` when there are
     * no errors detected.
     */

  }, {
    key: "setSinkId",
    value: function setSinkId(deviceId) {
      return this.backend.setSinkId(deviceId);
    }
    /**
     * Set the playback volume.
     *
     * @param {number} newVolume A value between 0 and 1, 0 being no
     * volume and 1 being full volume.
     * @emits WaveSurfer#volume
     */

  }, {
    key: "setVolume",
    value: function setVolume(newVolume) {
      this.backend.setVolume(newVolume);
      this.fireEvent("volume", newVolume);
    }
    /**
     * Get the playback volume.
     *
     * @return {number} A value between 0 and 1, 0 being no
     * volume and 1 being full volume.
     */

  }, {
    key: "getVolume",
    value: function getVolume() {
      return this.backend.getVolume();
    }
    /**
     * Set the playback rate.
     *
     * @param {number} rate A positive number. E.g. 0.5 means half the normal
     * speed, 2 means double speed and so on.
     * @example wavesurfer.setPlaybackRate(2);
     */

  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(rate) {
      this.backend.setPlaybackRate(rate);
    }
    /**
     * Get the playback rate.
     *
     * @return {number} The current playback rate.
     */

  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this.backend.getPlaybackRate();
    }
    /**
     * Toggle the volume on and off. If not currently muted it will save the
     * current volume value and turn the volume off. If currently muted then it
     * will restore the volume to the saved value, and then rest the saved
     * value.
     *
     * @example wavesurfer.toggleMute();
     */

  }, {
    key: "toggleMute",
    value: function toggleMute() {
      this.setMute(!this.isMuted);
    }
    /**
     * Enable or disable muted audio
     *
     * @param {boolean} mute Specify `true` to mute audio.
     * @emits WaveSurfer#volume
     * @emits WaveSurfer#mute
     * @example
     * // unmute
     * wavesurfer.setMute(false);
     * console.log(wavesurfer.getMute()) // logs false
     */

  }, {
    key: "setMute",
    value: function setMute(mute) {
      // ignore all muting requests if the audio is already in that state
      if (mute === this.isMuted) {
        this.fireEvent("mute", this.isMuted);
        return;
      }

      if (this.backend.setMute) {
        // Backends such as the MediaElement backend have their own handling
        // of mute, let them handle it.
        this.backend.setMute(mute);
        this.isMuted = mute;
      } else {
        if (mute) {
          // If currently not muted then save current volume,
          // turn off the volume and update the mute properties
          this.savedVolume = this.backend.getVolume();
          this.backend.setVolume(0);
          this.isMuted = true;
          this.fireEvent("volume", 0);
        } else {
          // If currently muted then restore to the saved volume
          // and update the mute properties
          this.backend.setVolume(this.savedVolume);
          this.isMuted = false;
          this.fireEvent("volume", this.savedVolume);
        }
      }

      this.fireEvent("mute", this.isMuted);
    }
    /**
     * Get the current mute status.
     *
     * @example const isMuted = wavesurfer.getMute();
     * @return {boolean} Current mute status
     */

  }, {
    key: "getMute",
    value: function getMute() {
      return this.isMuted;
    }
    /**
     * Get the list of current set filters as an array.
     *
     * Filters must be set with setFilters method first
     *
     * @return {array} List of enabled filters
     */

  }, {
    key: "getFilters",
    value: function getFilters() {
      return this.backend.filters || [];
    }
    /**
     * Toggles `scrollParent` and redraws
     *
     * @example wavesurfer.toggleScroll();
     */

  }, {
    key: "toggleScroll",
    value: function toggleScroll() {
      this.params.scrollParent = !this.params.scrollParent;
      this.drawBuffer();
    }
    /**
     * Toggle mouse interaction
     *
     * @example wavesurfer.toggleInteraction();
     */

  }, {
    key: "toggleInteraction",
    value: function toggleInteraction() {
      this.params.interact = !this.params.interact;
    }
    /**
     * Get the fill color of the waveform after the cursor.
     *
     * @return {string} A CSS color string.
     */

  }, {
    key: "getWaveColor",
    value: function getWaveColor() {
      return this.params.waveColor;
    }
    /**
     * Set the fill color of the waveform after the cursor.
     *
     * @param {string} color A CSS color string.
     * @example wavesurfer.setWaveColor('#ddd');
     */

  }, {
    key: "setWaveColor",
    value: function setWaveColor(color) {
      this.params.waveColor = color;
      this.drawBuffer();
    }
    /**
     * Get the fill color of the waveform behind the cursor.
     *
     * @return {string} A CSS color string.
     */

  }, {
    key: "getProgressColor",
    value: function getProgressColor() {
      return this.params.progressColor;
    }
    /**
     * Set the fill color of the waveform behind the cursor.
     *
     * @param {string} color A CSS color string.
     * @example wavesurfer.setProgressColor('#400');
     */

  }, {
    key: "setProgressColor",
    value: function setProgressColor(color) {
      this.params.progressColor = color;
      this.drawBuffer();
    }
    /**
     * Get the background color of the waveform container.
     *
     * @return {string} A CSS color string.
     */

  }, {
    key: "getBackgroundColor",
    value: function getBackgroundColor() {
      return this.params.backgroundColor;
    }
    /**
     * Set the background color of the waveform container.
     *
     * @param {string} color A CSS color string.
     * @example wavesurfer.setBackgroundColor('#FF00FF');
     */

  }, {
    key: "setBackgroundColor",
    value: function setBackgroundColor(color) {
      this.params.backgroundColor = color;
      style_style(this.container, {
        background: this.params.backgroundColor
      });
    }
    /**
     * Get the fill color of the cursor indicating the playhead
     * position.
     *
     * @return {string} A CSS color string.
     */

  }, {
    key: "getCursorColor",
    value: function getCursorColor() {
      return this.params.cursorColor;
    }
    /**
     * Set the fill color of the cursor indicating the playhead
     * position.
     *
     * @param {string} color A CSS color string.
     * @example wavesurfer.setCursorColor('#222');
     */

  }, {
    key: "setCursorColor",
    value: function setCursorColor(color) {
      this.params.cursorColor = color;
      this.drawer.updateCursor();
    }
    /**
     * Get the height of the waveform.
     *
     * @return {number} Height measured in pixels.
     */

  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.params.height;
    }
    /**
     * Set the height of the waveform.
     *
     * @param {number} height Height measured in pixels.
     * @example wavesurfer.setHeight(200);
     */

  }, {
    key: "setHeight",
    value: function setHeight(height) {
      this.params.height = height;
      this.drawer.setHeight(height * this.params.pixelRatio);
      this.drawBuffer();
    }
    /**
     * Hide channels from being drawn on the waveform if splitting channels.
     *
     * For example, if we want to draw only the peaks for the right stereo channel:
     *
     * const wavesurfer = new WaveSurfer.create({...splitChannels: true});
     * wavesurfer.load('stereo_audio.mp3');
     *
     * wavesurfer.setFilteredChannel([0]); <-- hide left channel peaks.
     *
     * @param {array} channelIndices Channels to be filtered out from drawing.
     * @version 4.0.0
     */

  }, {
    key: "setFilteredChannels",
    value: function setFilteredChannels(channelIndices) {
      this.params.splitChannelsOptions.filterChannels = channelIndices;
      this.drawBuffer();
    }
    /**
     * Get the correct peaks for current wave view-port and render wave
     *
     * @private
     * @emits WaveSurfer#redraw
     */

  }, {
    key: "drawBuffer",
    value: function drawBuffer() {
      var nominalWidth = Math.round(this.getDuration() * this.params.minPxPerSec * this.params.pixelRatio);
      var parentWidth = this.drawer.getWidth();
      var width = nominalWidth; // always start at 0 after zooming for scrolling : issue redraw left part

      var start = 0;
      var end = Math.max(start + parentWidth, width); // Fill container

      if (this.params.fillParent && (!this.params.scrollParent || nominalWidth < parentWidth)) {
        width = parentWidth;
        start = 0;
        end = width;
      }

      var peaks;

      if (this.params.partialRender) {
        var newRanges = this.peakCache.addRangeToPeakCache(width, start, end);
        var i;

        for (i = 0; i < newRanges.length; i++) {
          peaks = this.backend.getPeaks(width, newRanges[i][0], newRanges[i][1]);
          this.drawer.drawPeaks(peaks, width, newRanges[i][0], newRanges[i][1]);
        }
      } else {
        peaks = this.backend.getPeaks(width, start, end);
        this.drawer.drawPeaks(peaks, width, start, end);
      }

      this.fireEvent("redraw", peaks, width);
    }
    /**
     * Horizontally zooms the waveform in and out. It also changes the parameter
     * `minPxPerSec` and enables the `scrollParent` option. Calling the function
     * with a falsey parameter will reset the zoom state.
     *
     * @param {?number} pxPerSec Number of horizontal pixels per second of
     * audio, if none is set the waveform returns to unzoomed state
     * @emits WaveSurfer#zoom
     * @example wavesurfer.zoom(20);
     */

  }, {
    key: "zoom",
    value: function zoom(pxPerSec) {
      if (!pxPerSec) {
        this.params.minPxPerSec = this.defaultParams.minPxPerSec;
        this.params.scrollParent = false;
      } else {
        this.params.minPxPerSec = pxPerSec;
        this.params.scrollParent = true;
      }

      this.drawBuffer();
      this.drawer.progress(this.backend.getPlayedPercents());
      this.drawer.recenter(this.getCurrentTime() / this.getDuration());
      this.fireEvent("zoom", pxPerSec);
    }
    /**
     * Decode buffer and load
     *
     * @private
     * @param {ArrayBuffer} arraybuffer Buffer to process
     */

  }, {
    key: "loadArrayBuffer",
    value: function loadArrayBuffer(arraybuffer) {
      var _this9 = this;

      this.decodeArrayBuffer(arraybuffer, function (data) {
        if (!_this9.isDestroyed) {
          _this9.loadDecodedBuffer(data);
        }
      });
    }
    /**
     * Directly load an externally decoded AudioBuffer
     *
     * @private
     * @param {AudioBuffer} buffer Buffer to process
     * @emits WaveSurfer#ready
     */

  }, {
    key: "loadDecodedBuffer",
    value: function loadDecodedBuffer(buffer) {
      this.backend.load(buffer);
      this.drawBuffer();
      this.isReady = true;
      this.fireEvent("ready");
    }
    /**
     * Loads audio data from a Blob or File object
     *
     * @param {Blob|File} blob Audio data
     * @example
     */

  }, {
    key: "loadBlob",
    value: function loadBlob(blob) {
      var _this10 = this;

      // Create file reader
      var reader = new FileReader();
      reader.addEventListener("progress", function (e) {
        return _this10.onProgress(e);
      });
      reader.addEventListener("load", function (e) {
        return _this10.loadArrayBuffer(e.target.result);
      });
      reader.addEventListener("error", function () {
        return _this10.fireEvent("error", "Error reading file");
      });
      reader.readAsArrayBuffer(blob);
      this.empty();
    }
    /**
     * Loads audio and re-renders the waveform.
     *
     * @param {string|HTMLMediaElement} url The url of the audio file or the
     * audio element with the audio
     * @param {number[]|Number.<Array[]>} peaks Wavesurfer does not have to decode
     * the audio to render the waveform if this is specified
     * @param {?string} preload (Use with backend `MediaElement` and `MediaElementWebAudio`)
     * `'none'|'metadata'|'auto'` Preload attribute for the media element
     * @param {?number} duration The duration of the audio. This is used to
     * render the peaks data in the correct size for the audio duration (as
     * befits the current `minPxPerSec` and zoom value) without having to decode
     * the audio.
     * @returns {void}
     * @throws Will throw an error if the `url` argument is empty.
     * @example
     * // uses fetch or media element to load file (depending on backend)
     * wavesurfer.load('http://example.com/demo.wav');
     *
     * // setting preload attribute with media element backend and supplying
     * // peaks
     * wavesurfer.load(
     *   'http://example.com/demo.wav',
     *   [0.0218, 0.0183, 0.0165, 0.0198, 0.2137, 0.2888],
     *   true
     * );
     */

  }, {
    key: "load",
    value: function load(url, peaks, preload, duration) {
      if (!url) {
        throw new Error("url parameter cannot be empty");
      }

      this.empty();

      if (preload) {
        // check whether the preload attribute will be usable and if not log
        // a warning listing the reasons why not and nullify the variable
        var preloadIgnoreReasons = {
          "Preload is not 'auto', 'none' or 'metadata'": ["auto", "metadata", "none"].indexOf(preload) === -1,
          "Peaks are not provided": !peaks,
          "Backend is not of type 'MediaElement' or 'MediaElementWebAudio'": ["MediaElement", "MediaElementWebAudio"].indexOf(this.params.backend) === -1,
          "Url is not of type string": typeof url !== "string"
        };
        var activeReasons = Object.keys(preloadIgnoreReasons).filter(function (reason) {
          return preloadIgnoreReasons[reason];
        });

        if (activeReasons.length) {
          // eslint-disable-next-line no-console
          console.warn("Preload parameter of wavesurfer.load will be ignored because:\n\t- " + activeReasons.join("\n\t- ")); // stop invalid values from being used

          preload = null;
        }
      }

      switch (this.params.backend) {
        case "WebAudio":
          return this.loadBuffer(url, peaks, duration);

        case "MediaElement":
        case "MediaElementWebAudio":
          return this.loadMediaElement(url, peaks, preload, duration);
      }
    }
    /**
     * Loads audio using Web Audio buffer backend.
     *
     * @private
     * @param {string} url URL of audio file
     * @param {number[]|Number.<Array[]>} peaks Peaks data
     * @param {?number} duration Optional duration of audio file
     * @returns {void}
     */

  }, {
    key: "loadBuffer",
    value: function loadBuffer(url, peaks, duration) {
      var _this11 = this;

      var load = function load(action) {
        if (action) {
          _this11.tmpEvents.push(_this11.once("ready", action));
        }

        return _this11.getArrayBuffer(url, function (data) {
          return _this11.loadArrayBuffer(data);
        });
      };

      if (peaks) {
        this.backend.setPeaks(peaks, duration);
        this.drawBuffer();
        this.tmpEvents.push(this.once("interaction", load));
      } else {
        return load();
      }
    }
    /**
     * Either create a media element, or load an existing media element.
     *
     * @private
     * @param {string|HTMLMediaElement} urlOrElt Either a path to a media file, or an
     * existing HTML5 Audio/Video Element
     * @param {number[]|Number.<Array[]>} peaks Array of peaks. Required to bypass web audio
     * dependency
     * @param {?boolean} preload Set to true if the preload attribute of the
     * audio element should be enabled
     * @param {?number} duration Optional duration of audio file
     */

  }, {
    key: "loadMediaElement",
    value: function loadMediaElement(urlOrElt, peaks, preload, duration) {
      var _this12 = this;

      var url = urlOrElt;

      if (typeof urlOrElt === "string") {
        this.backend.load(url, this.mediaContainer, peaks, preload);
      } else {
        var elt = urlOrElt;
        this.backend.loadElt(elt, peaks); // If peaks are not provided,
        // url = element.src so we can get peaks with web audio

        url = elt.src;
      }

      this.tmpEvents.push(this.backend.once("canplay", function () {
        // ignore when backend was already destroyed
        if (!_this12.backend.destroyed) {
          _this12.drawBuffer();

          _this12.isReady = true;

          _this12.fireEvent("ready");
        }
      }), this.backend.once("error", function (err) {
        return _this12.fireEvent("error", err);
      }));

      if (peaks) {
        this.backend.setPeaks(peaks, duration);
        this.drawBuffer();
      } // If no pre-decoded peaks are provided, or are provided with
      // forceDecode flag, attempt to download the audio file and decode it
      // with Web Audio.


      if ((!peaks || this.params.forceDecode) && this.backend.supportsWebAudio()) {
        this.getArrayBuffer(url, function (arraybuffer) {
          _this12.decodeArrayBuffer(arraybuffer, function (buffer) {
            _this12.backend.buffer = buffer;

            _this12.backend.setPeaks(null);

            _this12.drawBuffer();

            _this12.fireEvent("waveform-ready");
          });
        });
      }
    }
    /**
     * Decode an array buffer and pass data to a callback
     *
     * @private
     * @param {Object} arraybuffer The array buffer to decode
     * @param {function} callback The function to call on complete
     */

  }, {
    key: "decodeArrayBuffer",
    value: function decodeArrayBuffer(arraybuffer, callback) {
      var _this13 = this;

      this.arraybuffer = arraybuffer;
      this.backend.decodeArrayBuffer(arraybuffer, function (data) {
        // Only use the decoded data if we haven't been destroyed or
        // another decode started in the meantime
        if (!_this13.isDestroyed && _this13.arraybuffer == arraybuffer) {
          callback(data);
          _this13.arraybuffer = null;
        }
      }, function () {
        return _this13.fireEvent("error", "Error decoding audiobuffer");
      });
    }
    /**
     * Load an array buffer using fetch and pass the result to a callback
     *
     * @param {string} url The URL of the file object
     * @param {function} callback The function to call on complete
     * @returns {util.fetchFile} fetch call
     * @private
     */

  }, {
    key: "getArrayBuffer",
    value: function getArrayBuffer(url, callback) {
      var _this14 = this;

      var options = Object.assign({
        url: url,
        responseType: "arraybuffer"
      }, this.params.xhr);
      var request = fetchFile(options);
      this.currentRequest = request;
      this.tmpEvents.push(request.on("progress", function (e) {
        _this14.onProgress(e);
      }), request.on("success", function (data) {
        callback(data);
        _this14.currentRequest = null;
      }), request.on("error", function (e) {
        _this14.fireEvent("error", e);

        _this14.currentRequest = null;
      }));
      return request;
    }
    /**
     * Called while the audio file is loading
     *
     * @private
     * @param {Event} e Progress event
     * @emits WaveSurfer#loading
     */

  }, {
    key: "onProgress",
    value: function onProgress(e) {
      var percentComplete;

      if (e.lengthComputable) {
        percentComplete = e.loaded / e.total;
      } else {
        // Approximate progress with an asymptotic
        // function, and assume downloads in the 1-3 MB range.
        percentComplete = e.loaded / (e.loaded + 1000000);
      }

      this.fireEvent("loading", Math.round(percentComplete * 100), e.target);
    }
    /**
     * Exports PCM data into a JSON array and opens in a new window.
     *
     * @param {number} length=1024 The scale in which to export the peaks
     * @param {number} accuracy=10000
     * @param {?boolean} noWindow Set to true to disable opening a new
     * window with the JSON
     * @param {number} start Start index
     * @param {number} end End index
     * @return {Promise} Promise that resolves with array of peaks
     */

  }, {
    key: "exportPCM",
    value: function exportPCM(length, accuracy, noWindow, start, end) {
      length = length || 1024;
      start = start || 0;
      accuracy = accuracy || 10000;
      noWindow = noWindow || false;
      var peaks = this.backend.getPeaks(length, start, end);
      var arr = [].map.call(peaks, function (val) {
        return Math.round(val * accuracy) / accuracy;
      });
      /* eslint-disable  no-unused-vars*/

      return new Promise(function (resolve, reject) {
        var json = JSON.stringify(arr);

        if (!noWindow) {
          window.open("data:application/json;charset=utf-8," + encodeURIComponent(json));
        }

        resolve(json);
      });
      /* eslint-enable */
    }
    /**
     * Save waveform image as data URI.
     *
     * The default format is `'image/png'`. Other supported types are
     * `'image/jpeg'` and `'image/webp'`.
     *
     * @param {string} format='image/png' A string indicating the image format.
     * The default format type is `'image/png'`.
     * @param {number} quality=1 A number between 0 and 1 indicating the image
     * quality to use for image formats that use lossy compression such as
     * `'image/jpeg'`` and `'image/webp'`.
     * @param {string} type Image data type to return. Either 'dataURL' (default)
     * or 'blob'.
     * @return {string|string[]|Promise} When using `'dataURL'` type this returns
     * a single data URL or an array of data URLs, one for each canvas. When using
     * `'blob'` type this returns a `Promise` resolving with an array of `Blob`
     * instances, one for each canvas.
     */

  }, {
    key: "exportImage",
    value: function exportImage(format, quality, type) {
      if (!format) {
        format = "image/png";
      }

      if (!quality) {
        quality = 1;
      }

      if (!type) {
        type = "dataURL";
      }

      return this.drawer.getImage(format, quality, type);
    }
    /**
     * Cancel any fetch request currently in progress
     */

  }, {
    key: "cancelAjax",
    value: function cancelAjax() {
      if (this.currentRequest && this.currentRequest.controller) {
        this.currentRequest.controller.abort();
        this.currentRequest = null;
      }
    }
    /**
     * @private
     */

  }, {
    key: "clearTmpEvents",
    value: function clearTmpEvents() {
      this.tmpEvents.forEach(function (e) {
        return e.un();
      });
    }
    /**
     * Display empty waveform.
     */

  }, {
    key: "empty",
    value: function empty() {
      if (!this.backend.isPaused()) {
        this.stop();
        this.backend.disconnectSource();
      }

      this.isReady = false;
      this.cancelAjax();
      this.clearTmpEvents(); // empty drawer

      this.drawer.progress(0);
      this.drawer.setWidth(0);
      this.drawer.drawPeaks({
        length: this.drawer.getWidth()
      }, 0);
    }
    /**
     * Remove events, elements and disconnect WebAudio nodes.
     *
     * @emits WaveSurfer#destroy
     */

  }, {
    key: "destroy",
    value: function destroy() {
      // this.fireEvent("destroy");
      this.destroyAllPlugins();
      this.cancelAjax();
      this.clearTmpEvents();
      this.unAll();

      if (this.params.responsive !== false) {
        window.removeEventListener("resize", this._onResize, true);
        window.removeEventListener("orientationchange", this._onResize, true);
      }

      if (this.backend) {
        this.backend.destroy();
      }

      if (this.drawer) {
        this.drawer.destroy();
      }

      this.isDestroyed = true;
      this.isReady = false;
      this.arraybuffer = null;
    }
  }]);

  return WaveSurfer;
}(observer_Observer);

_defineProperty(wavesurfer_WaveSurfer, "util", util_namespaceObject);


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// CONCATENATED MODULE: ./src/components/WaveSurfer/plugin/timeline.js








/**
 * @typedef {Object} TimelinePluginParams
 * @desc Extends the `WavesurferParams` wavesurfer was initialised with
 * @property {!string|HTMLElement} container CSS selector or HTML element where
 * the timeline should be drawn. This is the only required parameter.
 * @property {number} notchPercentHeight=90 Height of notches in percent
 * @property {string} unlabeledNotchColor='#c0c0c0' The colour of the notches
 * that do not have labels
 * @property {string} primaryColor='#000' The colour of the main notches
 * @property {string} secondaryColor='#c0c0c0' The colour of the secondary
 * notches
 * @property {string} primaryFontColor='#000' The colour of the labels next to
 * the main notches
 * @property {string} secondaryFontColor='#000' The colour of the labels next to
 * the secondary notches
 * @property {number} labelPadding=5 The padding between the label and the notch
 * @property {?number} zoomDebounce A debounce timeout to increase rendering
 * performance for large files
 * @property {string} fontFamily='Arial'
 * @property {number} fontSize=10 Font size of labels in pixels
 * @property {?number} duration Length of the track in seconds. Overrides
 * getDuration() for setting length of timeline
 * @property {function} formatTimeCallback (sec, pxPerSec) -> label
 * @property {function} timeInterval (pxPerSec) -> seconds between notches
 * @property {function} primaryLabelInterval (pxPerSec) -> cadence between
 * labels in primary color
 * @property {function} secondaryLabelInterval (pxPerSec) -> cadence between
 * labels in secondary color
 * @property {?number} offset Offset for the timeline start in seconds. May also be
 * negative.
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('timeline')`
 */

/**
 * Adds a timeline to the waveform.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import TimelinePlugin from 'wavesurfer.timeline.js';
 *
 * // commonjs
 * var TimelinePlugin = require('wavesurfer.timeline.js');
 *
 * // if you are using <script> tags
 * var TimelinePlugin = window.WaveSurfer.timeline;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     TimelinePlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
var timeline_TimelinePlugin = /*#__PURE__*/function () {
  _createClass(TimelinePlugin, null, [{
    key: "create",

    /**
     * Timeline plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * @param  {TimelinePluginParams} params parameters use to initialise the plugin
     * @return {PluginDefinition} an object representing the plugin
     */
    value: function create(params) {
      return {
        name: "timeline",
        deferInit: params && params.deferInit ? params.deferInit : false,
        params: params,
        instance: TimelinePlugin
      };
    } // event handlers

  }]);

  /**
   * Creates an instance of TimelinePlugin.
   *
   * You probably want to use TimelinePlugin.create()
   *
   * @param {TimelinePluginParams} params Plugin parameters
   * @param {object} ws Wavesurfer instance
   */
  function TimelinePlugin(params, _ws) {
    var _this = this;

    _classCallCheck(this, TimelinePlugin);

    _defineProperty(this, "_onScroll", function () {
      if (_this.wrapper && _this.drawer.wrapper) {
        _this.wrapper.scrollLeft = _this.drawer.wrapper.scrollLeft;
      }
    });

    _defineProperty(this, "_onRedraw", function () {
      return _this.render();
    });

    _defineProperty(this, "_onReady", function () {
      var ws = _this.wavesurfer;
      _this.drawer = ws.drawer;
      _this.pixelRatio = ws.drawer.params.pixelRatio;
      _this.maxCanvasWidth = ws.drawer.maxCanvasWidth || ws.drawer.width;
      _this.maxCanvasElementWidth = ws.drawer.maxCanvasElementWidth || Math.round(_this.maxCanvasWidth / _this.pixelRatio); // add listeners

      ws.drawer.wrapper.addEventListener("scroll", _this._onScroll);
      ws.on("redraw", _this._onRedraw);
      ws.on("zoom", _this._onZoom);

      _this.render();
    });

    _defineProperty(this, "_onWrapperClick", function (e) {
      e.preventDefault();
      var relX = "offsetX" in e ? e.offsetX : e.layerX;

      _this.fireEvent("click", relX / _this.wrapper.scrollWidth || 0);
    });

    this.container = "string" == typeof params.container ? document.querySelector(params.container) : params.container;

    if (!this.container) {
      throw new Error("No container for wavesurfer timeline");
    }

    this.wavesurfer = _ws;
    this.util = _ws.util;
    this.params = Object.assign({}, {
      height: 20,
      notchPercentHeight: 90,
      labelPadding: 5,
      unlabeledNotchColor: "#c0c0c0",
      primaryColor: "#000",
      secondaryColor: "#c0c0c0",
      primaryFontColor: "#000",
      secondaryFontColor: "#000",
      fontFamily: "Arial",
      fontSize: 10,
      duration: null,
      zoomDebounce: false,
      formatTimeCallback: this.defaultFormatTimeCallback,
      timeInterval: this.defaultTimeInterval,
      primaryLabelInterval: this.defaultPrimaryLabelInterval,
      secondaryLabelInterval: this.defaultSecondaryLabelInterval,
      offset: 0
    }, params);
    this.canvases = [];
    this.wrapper = null;
    this.drawer = null;
    this.pixelRatio = null;
    this.maxCanvasWidth = null;
    this.maxCanvasElementWidth = null;
    /**
     * This event handler has to be in the constructor function because it
     * relies on the debounce function which is only available after
     * instantiation
     *
     * Use a debounced function if `params.zoomDebounce` is defined
     *
     * @returns {void}
     */

    this._onZoom = this.params.zoomDebounce ? this.wavesurfer.util.debounce(function () {
      return _this.render();
    }, this.params.zoomDebounce) : function () {
      return _this.render();
    };
  }
  /**
   * Initialisation function used by the plugin API
   */


  _createClass(TimelinePlugin, [{
    key: "init",
    value: function init() {
      // Check if ws is ready
      if (this.wavesurfer.isReady) {
        this._onReady();
      } else {
        this.wavesurfer.once("ready", this._onReady);
      }
    }
    /**
     * Destroy function used by the plugin API
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.unAll();
      this.wavesurfer.un("redraw", this._onRedraw);
      this.wavesurfer.un("zoom", this._onZoom);
      this.wavesurfer.un("ready", this._onReady);
      this.wavesurfer.drawer.wrapper.removeEventListener("scroll", this._onScroll);

      if (this.wrapper && this.wrapper.parentNode) {
        this.wrapper.removeEventListener("click", this._onWrapperClick);
        this.wrapper.parentNode.removeChild(this.wrapper);
        this.wrapper = null;
      }
    }
    /**
     * Create a timeline element to wrap the canvases drawn by this plugin
     *
     */

  }, {
    key: "createWrapper",
    value: function createWrapper() {
      var wsParams = this.wavesurfer.params;
      this.container.innerHTML = "";
      this.wrapper = this.container.appendChild(document.createElement("timeline"));
      this.util.style(this.wrapper, {
        display: "block",
        position: "relative",
        userSelect: "none",
        webkitUserSelect: "none",
        height: "".concat(this.params.height, "px")
      });

      if (wsParams.fillParent || wsParams.scrollParent) {
        this.util.style(this.wrapper, {
          width: "100%",
          overflowX: "hidden",
          overflowY: "hidden"
        });
      }

      this.wrapper.addEventListener("click", this._onWrapperClick);
    }
    /**
     * Render the timeline (also updates the already rendered timeline)
     *
     */

  }, {
    key: "render",
    value: function render() {
      if (!this.wrapper) {
        this.createWrapper();
      }

      this.updateCanvases();
      this.updateCanvasesPositioning();
      this.renderCanvases();
    }
    /**
     * Add new timeline canvas
     *
     */

  }, {
    key: "addCanvas",
    value: function addCanvas() {
      var canvas = this.wrapper.appendChild(document.createElement("canvas"));
      this.canvases.push(canvas);
      this.util.style(canvas, {
        position: "absolute",
        zIndex: 4
      });
    }
    /**
     * Remove timeline canvas
     *
     */

  }, {
    key: "removeCanvas",
    value: function removeCanvas() {
      var canvas = this.canvases.pop();
      canvas.parentElement.removeChild(canvas);
    }
    /**
     * Make sure the correct of timeline canvas elements exist and are cached in
     * this.canvases
     *
     */

  }, {
    key: "updateCanvases",
    value: function updateCanvases() {
      var totalWidth = Math.round(this.drawer.wrapper.scrollWidth);
      var requiredCanvases = Math.ceil(totalWidth / this.maxCanvasElementWidth);

      while (this.canvases.length < requiredCanvases) {
        this.addCanvas();
      }

      while (this.canvases.length > requiredCanvases) {
        this.removeCanvas();
      }
    }
    /**
     * Update the dimensions and positioning style for all the timeline canvases
     *
     */

  }, {
    key: "updateCanvasesPositioning",
    value: function updateCanvasesPositioning() {
      var _this2 = this;

      // cache length for performance
      var canvasesLength = this.canvases.length;
      this.canvases.forEach(function (canvas, i) {
        // canvas width is the max element width, or if it is the last the
        // required width
        var canvasWidth = i === canvasesLength - 1 ? _this2.drawer.wrapper.scrollWidth - _this2.maxCanvasElementWidth * (canvasesLength - 1) : _this2.maxCanvasElementWidth; // set dimensions and style

        canvas.width = canvasWidth * _this2.pixelRatio; // on certain pixel ratios the canvas appears cut off at the bottom,
        // therefore leave 1px extra

        canvas.height = (_this2.params.height + 1) * _this2.pixelRatio;

        _this2.util.style(canvas, {
          width: "".concat(canvasWidth, "px"),
          height: "".concat(_this2.params.height, "px"),
          left: "".concat(i * _this2.maxCanvasElementWidth, "px")
        });
      });
    }
    /**
     * Render the timeline labels and notches
     *
     */

  }, {
    key: "renderCanvases",
    value: function renderCanvases() {
      var _this3 = this;

      var duration = this.params.duration || this.wavesurfer.backend.getDuration();

      if (duration <= 0) {
        return;
      }

      var wsParams = this.wavesurfer.params;
      var fontSize = this.params.fontSize * wsParams.pixelRatio;
      var totalSeconds = parseInt(duration, 10) + 1;
      var width = wsParams.fillParent && !wsParams.scrollParent ? this.drawer.getWidth() : this.drawer.wrapper.scrollWidth * wsParams.pixelRatio;
      var height1 = this.params.height * this.pixelRatio;
      var height2 = this.params.height * (this.params.notchPercentHeight / 100) * this.pixelRatio;
      var pixelsPerSecond = width / duration;
      var formatTime = this.params.formatTimeCallback; // if parameter is function, call the function with
      // pixelsPerSecond, otherwise simply take the value as-is

      var intervalFnOrVal = function intervalFnOrVal(option) {
        return typeof option === "function" ? option(pixelsPerSecond) : option;
      };

      var timeInterval = intervalFnOrVal(this.params.timeInterval);
      var primaryLabelInterval = intervalFnOrVal(this.params.primaryLabelInterval);
      var secondaryLabelInterval = intervalFnOrVal(this.params.secondaryLabelInterval);
      var curPixel = pixelsPerSecond * this.params.offset;
      var curSeconds = 0;
      var i; // build an array of position data with index, second and pixel data,
      // this is then used multiple times below

      var positioning = [];

      for (i = 0; i < totalSeconds / timeInterval; i++) {
        positioning.push([i, curSeconds, curPixel]);
        curSeconds += timeInterval;
        curPixel += pixelsPerSecond * timeInterval;
      } // iterate over each position


      var renderPositions = function renderPositions(cb) {
        positioning.forEach(function (pos) {
          cb(pos[0], pos[1], pos[2]);
        });
      }; // render primary labels


      this.setFillStyles(this.params.primaryColor);
      this.setFonts("".concat(fontSize, "px ").concat(this.params.fontFamily));
      this.setFillStyles(this.params.primaryFontColor);
      renderPositions(function (i, curSeconds, curPixel) {
        if (i % primaryLabelInterval === 0) {
          _this3.fillRect(curPixel, 0, 1, height1);

          _this3.fillText(formatTime(curSeconds, pixelsPerSecond), curPixel + _this3.params.labelPadding * _this3.pixelRatio, height1);
        }
      }); // render secondary labels

      this.setFillStyles(this.params.secondaryColor);
      this.setFonts("".concat(fontSize, "px ").concat(this.params.fontFamily));
      this.setFillStyles(this.params.secondaryFontColor);
      renderPositions(function (i, curSeconds, curPixel) {
        if (i % secondaryLabelInterval === 0) {
          _this3.fillRect(curPixel, 0, 1, height1);

          _this3.fillText(formatTime(curSeconds, pixelsPerSecond), curPixel + _this3.params.labelPadding * _this3.pixelRatio, height1);
        }
      }); // render the actual notches (when no labels are used)

      this.setFillStyles(this.params.unlabeledNotchColor);
      renderPositions(function (i, curSeconds, curPixel) {
        if (i % secondaryLabelInterval !== 0 && i % primaryLabelInterval !== 0) {
          _this3.fillRect(curPixel, 0, 1, height2);
        }
      });
    }
    /**
     * Set the canvas fill style
     *
     * @param {DOMString|CanvasGradient|CanvasPattern} fillStyle Fill style to
     * use
     */

  }, {
    key: "setFillStyles",
    value: function setFillStyles(fillStyle) {
      this.canvases.forEach(function (canvas) {
        canvas.getContext("2d").fillStyle = fillStyle;
      });
    }
    /**
     * Set the canvas font
     *
     * @param {DOMString} font Font to use
     */

  }, {
    key: "setFonts",
    value: function setFonts(font) {
      this.canvases.forEach(function (canvas) {
        canvas.getContext("2d").font = font;
      });
    }
    /**
     * Draw a rectangle on the canvases
     *
     * (it figures out the offset for each canvas)
     *
     * @param {number} x X-position
     * @param {number} y Y-position
     * @param {number} width Width
     * @param {number} height Height
     */

  }, {
    key: "fillRect",
    value: function fillRect(x, y, width, height) {
      var _this4 = this;

      this.canvases.forEach(function (canvas, i) {
        var leftOffset = i * _this4.maxCanvasWidth;
        var intersection = {
          x1: Math.max(x, i * _this4.maxCanvasWidth),
          y1: y,
          x2: Math.min(x + width, i * _this4.maxCanvasWidth + canvas.width),
          y2: y + height
        };

        if (intersection.x1 < intersection.x2) {
          canvas.getContext("2d").fillRect(intersection.x1 - leftOffset, intersection.y1, intersection.x2 - intersection.x1, intersection.y2 - intersection.y1);
        }
      });
    }
    /**
     * Fill a given text on the canvases
     *
     * @param {string} text Text to render
     * @param {number} x X-position
     * @param {number} y Y-position
     */

  }, {
    key: "fillText",
    value: function fillText(text, x, y) {
      var textWidth;
      var xOffset = 0;
      this.canvases.forEach(function (canvas) {
        var context = canvas.getContext("2d");
        var canvasWidth = context.canvas.width;

        if (xOffset > x + textWidth) {
          return;
        }

        if (xOffset + canvasWidth > x) {
          textWidth = context.measureText(text).width;
          context.fillText(text, x - xOffset, y);
        }

        xOffset += canvasWidth;
      });
    }
    /**
     * Turn the time into a suitable label for the time.
     *
     * @param {number} seconds Seconds to format
     * @param {number} pxPerSec Pixels per second
     * @returns {number} Time
     */

    /* eslint-disable  no-unused-vars */

  }, {
    key: "defaultFormatTimeCallback",
    value: function defaultFormatTimeCallback(seconds, pxPerSec) {
      if (seconds / 60 > 1) {
        // calculate minutes and seconds from seconds count
        var minutes = parseInt(seconds / 60, 10);
        seconds = parseInt(seconds % 60, 10); // fill up seconds with zeroes

        seconds = seconds < 10 ? "0" + seconds : seconds;
        return "".concat(minutes, ":").concat(seconds);
      }

      return Math.round(seconds * 1000) / 1000;
    }
    /* eslint-enable */

    /**
     * Return how many seconds should be between each notch
     *
     * @param {number} pxPerSec Pixels per second
     * @returns {number} Time
     */

  }, {
    key: "defaultTimeInterval",
    value: function defaultTimeInterval(pxPerSec) {
      if (pxPerSec >= 25) {
        return 1;
      } else if (pxPerSec * 5 >= 25) {
        return 5;
      } else if (pxPerSec * 15 >= 25) {
        return 15;
      }

      return Math.ceil(0.5 / pxPerSec) * 60;
    }
    /**
     * Return the cadence of notches that get labels in the primary color.
     *
     * @param {number} pxPerSec Pixels per second
     * @returns {number} Cadence
     */

  }, {
    key: "defaultPrimaryLabelInterval",
    value: function defaultPrimaryLabelInterval(pxPerSec) {
      if (pxPerSec >= 25) {
        return 10;
      } else if (pxPerSec * 5 >= 25) {
        return 6;
      } else if (pxPerSec * 15 >= 25) {
        return 4;
      }

      return 4;
    }
    /**
     * Return the cadence of notches that get labels in the secondary color.
     *
     * @param {number} pxPerSec Pixels per second
     * @returns {number} Cadence
     */

  }, {
    key: "defaultSecondaryLabelInterval",
    value: function defaultSecondaryLabelInterval(pxPerSec) {
      if (pxPerSec >= 25) {
        return 5;
      } else if (pxPerSec * 5 >= 25) {
        return 2;
      } else if (pxPerSec * 15 >= 25) {
        return 2;
      }

      return 2;
    }
  }]);

  return TimelinePlugin;
}();


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find-index.js
var es_array_find_index = __webpack_require__("c740");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/applyDecoratedDescriptor.js





function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__("b680");

// CONCATENATED MODULE: ./src/decorators.js


var DEBUG = false;
function perf(key, func) {
  var start = performance.now();
  var res = func();
  var sec = (performance.now() - start) / 1000;

  if (DEBUG) {
    console.log(key, "run: ".concat(sec.toFixed(3), " sec"));
  }

  return res;
}
function log(name) {
  var isShow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function decorator(t, n, descriptor) {
    var original = descriptor.value;

    if (typeof original === "function") {
      descriptor.value = function () {
        try {
          var start = performance.now();

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var result = original.apply(this, args);
          var sec = (performance.now() - start) / 1000;

          if (isShow) {
            console.log(name, "run: ".concat(sec.toFixed(3), " sec"));
          }

          return result;
        } catch (e) {
          if (DEBUG) {
            console.log("Error from ".concat(name, ": ").concat(e));
          }

          throw e;
        }
      };
    }

    return descriptor;
  };
}
function logger() {
  if (DEBUG) {
    var _console;

    (_console = console).log.apply(_console, arguments);
  }
}
// CONCATENATED MODULE: ./src/components/WaveSurfer/plugin/pointline.js





















var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class, _temp;

// デバックロガー

var pointline_DEBUG = false;
/**
 * @typedef {Object} PointlinePluginParams.
 * @desc Extends the `WavesurferParams` wavesurfer was initialised with.
 * @property {!string|HTMLElement} container CSS selector or HTML element where the pointline should be drawn. This is the only required parameter.
 * @property {?number} zoomDebounce A debounce timeout to increase rendering performance for large files
 * @property {?number} duration Length of the track in seconds. Overrides
 * getDuration() for setting length of pointline labels in primary color
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('pointline')`
 */

/**
 * Adds a pointline to the waveform.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import PointlinePlugin from 'wavesurfer.pointline.js';
 *
 * // commonjs
 * var PointlinePlugin = require('wavesurfer.pointline.js');
 *
 * // if you are using <script> tags
 * var PointlinePlugin = window.WaveSurfer.pointline;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     PointlinePlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */

var pointline_PointlinePlugin = (_dec = log("pointline.create", pointline_DEBUG), _dec2 = log("pointline.init", pointline_DEBUG), _dec3 = log("pointline.destroy", pointline_DEBUG), _dec4 = log("pointline.createWrapper", pointline_DEBUG), _dec5 = log("pointline.render", pointline_DEBUG), _dec6 = log("pointline.genUuid", pointline_DEBUG), _dec7 = log("pointline.addPoint", pointline_DEBUG), _dec8 = log("pointline.updatePoint", pointline_DEBUG), _dec9 = log("pointline.deletePoint", pointline_DEBUG), _dec10 = log("pointline.addCanvas", pointline_DEBUG), _dec11 = log("pointline.removeCanvas", pointline_DEBUG), _dec12 = log("pointline.updateCanvases", pointline_DEBUG), _dec13 = log("pointline.updateCanvasesPositioning", pointline_DEBUG), _dec14 = log("pointline.renderCanvases", pointline_DEBUG), _dec15 = log("pointline.setFillStyles", pointline_DEBUG), _dec16 = log("pointline.fillRect", pointline_DEBUG), _dec17 = log("pointline.defaultFormatTimeCallback", pointline_DEBUG), _dec18 = log("pointline.defaultTimeInterval", pointline_DEBUG), _dec19 = log("pointline.defaultPrimaryLabelInterval", pointline_DEBUG), (_class = (_temp = /*#__PURE__*/function () {
  _createClass(PointlinePlugin, null, [{
    key: "create",

    /**
     * Pointline plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * @param  {PointlinePluginParams} params parameters use to initialise the plugin
     * @return {PluginDefinition} an object representing the plugin
     */
    value: function create(params) {
      return {
        name: "pointline",
        deferInit: params && params.deferInit ? params.deferInit : false,
        params: params,
        instance: PointlinePlugin
      };
    } // event handlers

    /** @private */

  }]);

  /**
   * Creates an instance of PointlinePlugin.
   *
   * You probably want to use PointlinePlugin.create()
   *
   * @param {PointlinePluginParams} params Plugin parameters
   * @param {object} ws Wavesurfer instance
   */
  function PointlinePlugin(params, _ws) {
    var _this = this;

    _classCallCheck(this, PointlinePlugin);

    _defineProperty(this, "_onScroll", function () {
      if (_this.wrapper && _this.drawer.wrapper) {
        _this.wrapper.scrollLeft = _this.drawer.wrapper.scrollLeft;
      }
    });

    _defineProperty(this, "_onRedraw", function () {
      return _this.render();
    });

    _defineProperty(this, "_onReady", function () {
      var ws = _this.wavesurfer;
      _this.drawer = ws.drawer;
      _this.pixelRatio = ws.drawer.params.pixelRatio;
      _this.maxCanvasWidth = ws.drawer.maxCanvasWidth || ws.drawer.width;
      _this.maxCanvasElementWidth = ws.drawer.maxCanvasElementWidth || Math.round(_this.maxCanvasWidth / _this.pixelRatio); // add listeners

      ws.drawer.wrapper.addEventListener("scroll", _this._onScroll);
      ws.on("redraw", _this._onRedraw);
      ws.on("zoom", _this._onZoom);

      _this.render();
    });

    _defineProperty(this, "_onWrapperClick", function (e) {
      e.preventDefault();
      var relX = "offsetX" in e ? e.offsetX : e.layerX;

      _this.fireEvent("click", relX / _this.wrapper.scrollWidth || 0);
    });

    /** @private */
    perf("pointline.constructor", function () {
      _this.container = "string" == typeof params.container ? document.querySelector(params.container) : params.container;

      if (!_this.container) {
        throw new Error("No container for wavesurfer pointline");
      }
      /** @private */


      _this.wavesurfer = _ws;
      /** @private */

      _this.util = _ws.util;
      /** @private */

      _this.params = Object.assign({}, {
        height: 100,
        pointWidth: 3,
        duration: null,
        zoomDebounce: false
      }, params);
      /** @private */

      if (_this.params.points.length > 0) {
        _this.params.points = _this.params.points.map(function (x) {
          if (x.id === undefined) {
            x.id = _this.genUuid();
          }

          return x;
        });
      }
      /** @private */


      _this.canvases = [];
      /** @private */

      _this.wrapper = null;
      /** @private */

      _this.drawer = null;
      /** @private */

      _this.pixelRatio = null;
      /** @private */

      _this.maxCanvasWidth = null;
      /** @private */

      _this.maxCanvasElementWidth = null;
      /**
       * This event handler has to be in the constructor function because it
       * relies on the debounce function which is only available after
       * instantiation
       *
       * Use a debounced function if `params.zoomDebounce` is defined
       *
       * @private
       * @returns {void}
       */

      _this._onZoom = _this.params.zoomDebounce ? _this.wavesurfer.util.debounce(function () {
        return _this.render();
      }, _this.params.zoomDebounce) : function () {
        return _this.render();
      };
    });
  }
  /**
   * Initialisation function used by the plugin API
   */


  _createClass(PointlinePlugin, [{
    key: "init",
    value: function init() {
      // Check if ws is ready
      if (this.wavesurfer.isReady) {
        this._onReady();
      } else {
        this.wavesurfer.once("ready", this._onReady);
      }
    }
    /**
     * Destroy function used by the plugin API
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.unAll();
      this.wavesurfer.un("redraw", this._onRedraw);
      this.wavesurfer.un("zoom", this._onZoom);
      this.wavesurfer.un("ready", this._onReady);
      this.wavesurfer.drawer.wrapper.removeEventListener("scroll", this._onScroll);

      if (this.wrapper && this.wrapper.parentNode) {
        this.wrapper.removeEventListener("click", this._onWrapperClick);
        this.wrapper.parentNode.removeChild(this.wrapper);
        this.wrapper = null;
      }
    }
    /**
     * Create a pointline element to wrap the canvases drawn by this plugin
     *
     * @private
     */

  }, {
    key: "createWrapper",
    value: function createWrapper() {
      var wsParams = this.wavesurfer.params;
      this.container.innerHTML = "";
      this.wrapper = this.container.appendChild(document.createElement("pointline"));
      this.util.style(this.wrapper, {
        display: "block",
        position: "relative",
        userSelect: "none",
        webkitUserSelect: "none",
        height: "".concat(this.params.height, "px")
      });

      if (wsParams.fillParent || wsParams.scrollParent) {
        this.util.style(this.wrapper, {
          width: "100%",
          overflowX: "hidden",
          overflowY: "hidden"
        });
      }

      this.wrapper.addEventListener("click", this._onWrapperClick);
    }
    /**
     * Render the pointline (also updates the already rendered pointline)
     *
     * @private
     */

  }, {
    key: "render",
    value: function render() {
      if (!this.wrapper) {
        this.createWrapper();
      }

      this.updateCanvases();
      this.updateCanvasesPositioning();
      this.renderCanvases();
    }
  }, {
    key: "genUuid",
    value: function genUuid() {
      var chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");

      for (var i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
          case "x":
            chars[i] = Math.floor(Math.random() * 16).toString(16);
            break;

          case "y":
            chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
            break;
        }
      }

      return chars.join("");
    }
  }, {
    key: "addPoint",
    value: function addPoint(obj) {
      var point = {
        id: this.genUuid(),
        time: obj.time,
        value: obj.value,
        color: obj.color,
        size: obj.size
      };
      this.params.points.push(point);
      this.render();
      this.fireEvent("addPoint", point);
    }
  }, {
    key: "updatePoint",
    value: function updatePoint(id, point) {
      var idx = this.params.points.findIndex(function (x) {
        return x.id == id;
      });

      if (idx > -1) {
        point.id = this.params.points[idx].id;
        this.params.points[idx] = point;
        this.render();
        this.fireEvent("updatePoint", point);
      }
    }
  }, {
    key: "deletePoint",
    value: function deletePoint(id) {
      var idx = this.params.points.findIndex(function (x) {
        return x.id == id;
      });

      if (idx > -1) {
        var point = this.params.points[idx];
        this.params.points.splice(idx, 1);
        this.render();
        this.fireEvent("deletePoint", point);
      }
    }
    /**
     * Add new pointline canvas
     *
     * @private
     */

  }, {
    key: "addCanvas",
    value: function addCanvas() {
      var canvas = this.wrapper.appendChild(document.createElement("canvas"));
      this.canvases.push(canvas);
      this.util.style(canvas, {
        position: "absolute",
        zIndex: 4
      });
    }
    /**
     * Remove pointline canvas
     *
     * @private
     */

  }, {
    key: "removeCanvas",
    value: function removeCanvas() {
      var canvas = this.canvases.pop();
      canvas.parentElement.removeChild(canvas);
    }
    /**
     * Make sure the correct of pointline canvas elements exist and are cached in
     * this.canvases
     *
     * @private
     */

  }, {
    key: "updateCanvases",
    value: function updateCanvases() {
      var totalWidth = Math.round(this.drawer.wrapper.scrollWidth);
      var requiredCanvases = Math.ceil(totalWidth / this.maxCanvasElementWidth);

      while (this.canvases.length < requiredCanvases) {
        this.addCanvas();
      }

      while (this.canvases.length > requiredCanvases) {
        this.removeCanvas();
      }
    }
    /**
     * Update the dimensions and positioning style for all the pointline canvases
     *
     * @private
     */

  }, {
    key: "updateCanvasesPositioning",
    value: function updateCanvasesPositioning() {
      var _this2 = this;

      // cache length for performance
      var canvasesLength = this.canvases.length;
      this.canvases.forEach(function (canvas, i) {
        // canvas width is the max element width, or if it is the last the
        // required width
        var canvasWidth = i === canvasesLength - 1 ? _this2.drawer.wrapper.scrollWidth - _this2.maxCanvasElementWidth * (canvasesLength - 1) : _this2.maxCanvasElementWidth; // set dimensions and style

        canvas.width = canvasWidth * _this2.pixelRatio; // on certain pixel ratios the canvas appears cut off at the bottom,
        // therefore leave 1px extra

        canvas.height = (_this2.params.height + 1) * _this2.pixelRatio;

        _this2.util.style(canvas, {
          width: "".concat(canvasWidth, "px"),
          height: "".concat(_this2.params.height, "px"),
          left: "".concat(i * _this2.maxCanvasElementWidth, "px")
        });
      });
    }
    /**
     * Render the pointline labels and notches
     *
     * @private
     */

  }, {
    key: "renderCanvases",
    value: function renderCanvases() {
      var _this3 = this;

      var duration = this.wavesurfer.pointline.params.duration || this.wavesurfer.backend.getDuration();

      if (duration <= 0) {
        return;
      }

      var wsParams = this.wavesurfer.params;
      var width = wsParams.fillParent && !wsParams.scrollParent ? this.drawer.getWidth() : this.drawer.wrapper.scrollWidth * wsParams.pixelRatio;
      var pixelsPerSecond = width / duration; // build an array of position data with index, second and pixel data,
      // this is then used multiple times below
      // points の正規化

      var vm = this;
      var positioning = [];
      var minVal = Math.min.apply(null, vm.params.points.map(function (x) {
        return x.value;
      }));
      var tmps = this.params.points.map(function (x) {
        var color = "color" in x ? x.color : "#000";
        var size = "size" in x ? Number(x.size) : vm.params.pointWidth;
        return {
          time: x.time,
          value: x.value - minVal,
          color: color,
          size: size
        };
      });
      var maxVal = Math.max.apply(null, tmps.map(function (x) {
        return x.value;
      }));
      var points = tmps.map(function (x) {
        var value = x.value == 0 ? x.value : x.value / maxVal;
        return {
          time: x.time,
          value: value,
          color: x.color,
          size: x.size
        };
      });

      var _iterator = _createForOfIteratorHelper(points),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var x = _step.value;
          var curSeconds = x.time;
          var curPixel = pixelsPerSecond * x.time;
          positioning.push([curSeconds, curPixel, x.value, x.color, x.size]);
        } // iterate over each position

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var renderPositions = function renderPositions(cb) {
        positioning.forEach(function (pos) {
          cb(pos[0], pos[1], pos[2], pos[3], pos[4]);
        });
      }; // render primary labels


      renderPositions(function (curSeconds, curPixel, val, color, size) {
        _this3.setFillStyles(color);

        _this3.fillRect(curPixel, val, size);
      });
    }
    /**
     * Set the canvas fill style
     *
     * @param {DOMString|CanvasGradient|CanvasPattern} fillStyle Fill style to
     * use
     * @private
     */

  }, {
    key: "setFillStyles",
    value: function setFillStyles(fillStyle) {
      this.canvases.forEach(function (canvas) {
        canvas.getContext("2d").fillStyle = fillStyle;
      });
    }
    /**
     * Draw a rectangle on the canvases
     *
     * (it figures out the offset for each canvas)
     *
     * @param {number} x X-position
     * @param {number} y Y-position
     * @param {number} width Width
     * @param {number} height Height
     * @private
     */

  }, {
    key: "fillRect",
    value: function fillRect(x, y, width) {
      var _this4 = this;

      this.canvases.forEach(function (canvas, i) {
        var leftOffset = i * _this4.maxCanvasWidth;
        var intersection = {
          x1: Math.max(x, i * _this4.maxCanvasWidth),
          x2: Math.min(x + width, i * _this4.maxCanvasWidth + canvas.width)
        };

        if (intersection.x1 < intersection.x2) {
          var val = y * canvas.height;
          var ctx = canvas.getContext("2d");
          ctx.beginPath();
          ctx.arc(intersection.x1 - leftOffset, canvas.height - val, width, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
          ctx.fill();
        }
      });
    }
    /**
     * Turn the time into a suitable label for the time.
     *
     * @param {number} seconds Seconds to format
     * @param {number} pxPerSec Pixels per second
     * @returns {number} Time
     */

  }, {
    key: "defaultFormatTimeCallback",
    value: function defaultFormatTimeCallback(seconds) {
      if (seconds / 60 > 1) {
        // calculate minutes and seconds from seconds count
        var minutes = parseInt(seconds / 60, 10);
        seconds = parseInt(seconds % 60, 10); // fill up seconds with zeroes

        seconds = seconds < 10 ? "0" + seconds : seconds;
        return "".concat(minutes, ":").concat(seconds);
      }

      return Math.round(seconds * 1000) / 1000;
    }
    /**
     * Return how many seconds should be between each notch
     *
     * @param {number} pxPerSec Pixels per second
     * @returns {number} Time
     */

  }, {
    key: "defaultTimeInterval",
    value: function defaultTimeInterval(pxPerSec) {
      if (pxPerSec >= 25) {
        return 1;
      } else if (pxPerSec * 5 >= 25) {
        return 5;
      } else if (pxPerSec * 15 >= 25) {
        return 15;
      }

      return Math.ceil(0.5 / pxPerSec) * 60;
    }
    /**
     * Return the cadence of notches that get labels in the primary color.
     *
     * @param {number} pxPerSec Pixels per second
     * @returns {number} Cadence
     */

  }, {
    key: "defaultPrimaryLabelInterval",
    value: function defaultPrimaryLabelInterval(pxPerSec) {
      if (pxPerSec >= 25) {
        return 10;
      } else if (pxPerSec * 5 >= 25) {
        return 6;
      } else if (pxPerSec * 15 >= 25) {
        return 4;
      }

      return 4;
    }
  }]);

  return PointlinePlugin;
}(), _temp), (_applyDecoratedDescriptor(_class, "create", [_dec], Object.getOwnPropertyDescriptor(_class, "create"), _class), _applyDecoratedDescriptor(_class.prototype, "init", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "init"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "destroy", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "destroy"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "createWrapper", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "createWrapper"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "render", [_dec5], Object.getOwnPropertyDescriptor(_class.prototype, "render"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "genUuid", [_dec6], Object.getOwnPropertyDescriptor(_class.prototype, "genUuid"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "addPoint", [_dec7], Object.getOwnPropertyDescriptor(_class.prototype, "addPoint"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updatePoint", [_dec8], Object.getOwnPropertyDescriptor(_class.prototype, "updatePoint"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deletePoint", [_dec9], Object.getOwnPropertyDescriptor(_class.prototype, "deletePoint"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "addCanvas", [_dec10], Object.getOwnPropertyDescriptor(_class.prototype, "addCanvas"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "removeCanvas", [_dec11], Object.getOwnPropertyDescriptor(_class.prototype, "removeCanvas"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateCanvases", [_dec12], Object.getOwnPropertyDescriptor(_class.prototype, "updateCanvases"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateCanvasesPositioning", [_dec13], Object.getOwnPropertyDescriptor(_class.prototype, "updateCanvasesPositioning"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "renderCanvases", [_dec14], Object.getOwnPropertyDescriptor(_class.prototype, "renderCanvases"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setFillStyles", [_dec15], Object.getOwnPropertyDescriptor(_class.prototype, "setFillStyles"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "fillRect", [_dec16], Object.getOwnPropertyDescriptor(_class.prototype, "fillRect"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "defaultFormatTimeCallback", [_dec17], Object.getOwnPropertyDescriptor(_class.prototype, "defaultFormatTimeCallback"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "defaultTimeInterval", [_dec18], Object.getOwnPropertyDescriptor(_class.prototype, "defaultTimeInterval"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "defaultPrimaryLabelInterval", [_dec19], Object.getOwnPropertyDescriptor(_class.prototype, "defaultPrimaryLabelInterval"), _class.prototype)), _class));

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// CONCATENATED MODULE: ./src/io/textgrid.js
















var dumpPointTier = function dumpPointTier(values) {
  var lines = [];

  for (var i in values) {
    lines.push("        points [".concat(Number(i) + 1, "]:"));
    lines.push("            number = ".concat(values[i].time, " "));
    lines.push("            mark = \"".concat(values[i].text, "\" "));
  }

  return lines;
};

var dumpIntervalTier = function dumpIntervalTier(values, duration) {
  var lines = [];

  for (var i in values) {
    lines.push("        intervals [".concat(Number(i) + 1, "]:"));

    if (i == 0) {
      lines.push("            xmin = 0 ");
    } else {
      lines.push("            xmin = ".concat(values[Number(i) - 1].time, " "));
    }

    if (i == values.length - 1) {
      lines.push("            xmax = ".concat(duration, " "));
    } else {
      lines.push("            xmax = ".concat(values[i].time, " "));
    }

    lines.push("            text = \"".concat(values[i].text, "\" "));
  }

  return lines;
};

var getItemIndex = function getItemIndex(lines) {
  var indexes = [];
  var itemSize = 0;

  for (var i in lines) {
    if (lines[i].match(/^\s{4}item.+/)) {
      indexes.push({
        start: Number(i) + 1,
        end: null
      });

      if (itemSize > 0) {
        indexes[itemSize - 1].end = Number(i);
      }

      itemSize++;
    }
  }

  indexes[itemSize - 1].end = lines.length;
  return indexes;
};

var parsePointTier = function parsePointTier(lines) {
  var name = lines[1].split("=")[1].trim().slice(1).slice(0, -1);
  var values = [];

  for (var i in lines) {
    if (~lines[i].indexOf("number")) {
      var number = parseFloat(lines[i].split("=")[1].trim());
      var mark = lines[Number(i) + 1].split("=")[1].trim().slice(1).slice(0, -1);
      values.push({
        time: number,
        text: mark
      });
    }
  }

  return {
    name: name,
    values: values,
    type: "point"
  };
};

var parseIntervalTier = function parseIntervalTier(lines) {
  var name = lines[1].split("=")[1].trim().slice(1).slice(0, -1);
  var values = [];

  for (var i in lines) {
    if (~lines[i].indexOf("text")) {
      var text = lines[Number(i)].split("=")[1].trim().slice(1).slice(0, -1);
      var xmax = parseFloat(lines[Number(i) - 1].split("=")[1].trim());
      values.push({
        time: xmax,
        text: text
      });
    }
  }

  return {
    name: name,
    values: values,
    type: "interval"
  };
};

/* harmony default export */ var textgrid = ({
  load: function load(text) {
    var lines = text.split("\n");
    var itemLines = getItemIndex(lines).map(function (range) {
      return lines.slice(range.start, range.end);
    });
    var items = itemLines.map(function (lines) {
      if (~lines[0].indexOf("TextTier")) {
        return parsePointTier(lines);
      } else if (~lines[0].indexOf("IntervalTier")) {
        return parseIntervalTier(lines);
      }
    });
    var result = {};

    var _iterator = _createForOfIteratorHelper(items),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        result[item.name] = {
          type: item.type,
          values: item.values
        };
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return result;
  },
  dump: function dump(duration, tiers) {
    var lines = ['File type = "ooTextFile"', 'Object class = "TextGrid"', "", "xmin = 0 ", "xmax = ".concat(duration, " "), "tiers? <exists> ", "size = ".concat(Object.keys(tiers).length, " "), "item []: "];
    var i = 1;

    for (var key in tiers) {
      lines.push("    item [".concat(i, "]:"));

      if (tiers[key].type == "interval") {
        lines.push('        class = "IntervalTier"');
      } else {
        lines.push('        class = "TextTier"');
      }

      lines.push("        name = \"".concat(key, "\" "));
      lines.push("        xmin = 0 ");
      lines.push("        xmax = ".concat(duration, " "));

      if (tiers[key].type == "point") {
        lines.push("        points: size = ".concat(tiers[key].values.length, " "));
        lines = lines.concat(dumpPointTier(tiers[key].values));
      } else if (tiers[key].type == "interval") {
        var values = tiers[key].values;

        if (values[values.length - 1].time < duration) {
          values.push({
            text: "",
            time: duration
          });
        }

        lines.push("        intervals: size = ".concat(values.length, " "));
        lines = lines.concat(dumpIntervalTier(values, duration));
      }

      i++;
    }

    return lines.join("\n");
  }
});
// CONCATENATED MODULE: ./src/io/index.js

/* harmony default export */ var io = ({
  textgrid: textgrid
});
// CONCATENATED MODULE: ./src/components/WaveSurfer/plugin/textgrid.js



















/**
 * @typedef {Object} TextgridPluginParams
 * @desc Extends the `WavesurferParams` wavesurfer was initialised with
 * @property {!string|HTMLElement} container CSS selector or HTML element where the textgrid should be drawn. This is the only required parameter.
 * @property {string} color='#000' The colour of the notches
 * @property {string} activeColor='#c0c0c0' The colour of the notches
 * @property {string} fontColor='#000' The colour of the labels next to the notches
 * @property {?number} zoomDebounce A debounce timeout to increase rendering
 * performance for large files
 * @property {string} fontFamily='Arial'
 * @property {number} fontSize=10 Font size of labels in pixels
 * @property {?boolean} deferInit Set to true to manually call `initPlugin('textgrid')`
 */

/**
 * Adds a textgrid to the waveform.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import TextgridPlugin from 'wavesurfer.textgrid.js';
 *
 * // commonjs
 * var TextgridPlugin = require('wavesurfer.textgrid.js');
 *
 * // if you are using <script> tags
 * var TextgridPlugin = window.WaveSurfer.textgrid;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     TextgridPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */

var textgrid_TextgridPlugin = /*#__PURE__*/function () {
  _createClass(TextgridPlugin, null, [{
    key: "create",

    /**
     * Textgrid plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * @param  {TextgridPluginParams} params parameters use to initialise the plugin
     * @return {PluginDefinition} an object representing the plugin
     */
    value: function create(params) {
      return {
        name: "textgrid",
        deferInit: params && params.deferInit ? params.deferInit : false,
        params: params,
        instance: TextgridPlugin
      };
    } // event handlers

  }]);

  /**
   * Creates an instance of TextgridPlugin.
   *
   * You probably want to use TextgridPlugin.create()
   *
   * @param {TextgridPluginParams} params Plugin parameters
   * @param {object} ws Wavesurfer instance
   */
  function TextgridPlugin(params, _ws) {
    var _this = this;

    _classCallCheck(this, TextgridPlugin);

    _defineProperty(this, "_onScroll", function () {
      if (_this.wrapper && _this.drawer.wrapper) {
        _this.wrapper.scrollLeft = _this.drawer.wrapper.scrollLeft;
      }
    });

    _defineProperty(this, "_onRedraw", function () {
      return _this.render();
    });

    _defineProperty(this, "_onReady", function () {
      var ws = _this.wavesurfer;
      _this.drawer = ws.drawer;
      _this.pixelRatio = ws.drawer.params.pixelRatio;
      _this.maxCanvasWidth = ws.drawer.maxCanvasWidth || ws.drawer.width;
      _this.maxCanvasElementWidth = ws.drawer.maxCanvasElementWidth || Math.round(_this.maxCanvasWidth / _this.pixelRatio); // add listeners

      ws.drawer.wrapper.addEventListener("scroll", _this._onScroll);
      ws.on("redraw", _this._onRedraw);
      ws.on("zoom", _this._onZoom);

      _this.render();
    });

    this.container = "string" == typeof params.container ? document.querySelector(params.container) : params.container;

    if (!this.container) {
      throw new Error("No container for wavesurfer textgrid");
    }

    this.wavesurfer = _ws;
    this.util = _ws.util;
    this.params = Object.assign({}, {
      height: 50,
      fontColor: "#000",
      color: "#000",
      activeColor: "#FF6D00",
      fontFamily: "Arial",
      fontSize: 15,
      zoomDebounce: false,
      tiers: {}
    }, params);
    this.wrapper = null;
    this.drawer = null;
    this.pixelRatio = null;
    this.maxCanvasWidth = null;
    this.maxCanvasElementWidth = null;
    this.tiers = this.params.tiers;
    this.current = {
      key: null,
      item: null,
      index: null
    };
    /**
     * This event handler has to be in the constructor function because it
     * relies on the debounce function which is only available after
     * instantiation
     *
     * Use a debounced function if `params.zoomDebounce` is defined
     *
     * @returns {void}
     */

    this._onZoom = this.params.zoomDebounce ? this.wavesurfer.util.debounce(function () {
      return _this.render();
    }, this.params.zoomDebounce) : function () {
      return _this.render();
    };
  }
  /**
   * Initialisation function used by the plugin API
   */


  _createClass(TextgridPlugin, [{
    key: "init",
    value: function init() {
      // Check if ws is ready
      if (this.wavesurfer.isReady) {
        this._onReady();
      } else {
        this.wavesurfer.once("ready", this._onReady);
      }
    }
    /**
     * Destroy function used by the plugin API
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.unAll();
      this.wavesurfer.un("redraw", this._onRedraw);
      this.wavesurfer.un("zoom", this._onZoom);
      this.wavesurfer.un("ready", this._onReady);
      this.wavesurfer.drawer.wrapper.removeEventListener("scroll", this._onScroll);

      if (this.wrapper && this.wrapper.parentNode) {
        for (var key in this.tiers) {
          var canvas = this.tiers[key].canvas;
          canvas.removeEventListener("dblclick", canvas.onDblClick);
        }

        this.wrapper.parentNode.removeChild(this.wrapper);
        this.wrapper = null;
      }
    }
    /**
     * Create a textgrid element to wrap the canvas drawn by this plugin
     *
     */

  }, {
    key: "createWrapper",
    value: function createWrapper() {
      this.container.innerHTML = "";
      this.wrapper = this.container.appendChild(document.createElement("textgrid"));
    }
    /**
     * Render the textgrid (also updates the already rendered textgrid)
     *
     */

  }, {
    key: "render",
    value: function render() {
      this.wsParams = this.wavesurfer.params;

      if (!this.wrapper) {
        this.createWrapper();
      } // ラッパーのスタイルを調整


      this.util.style(this.wrapper, {
        display: "block",
        position: "relative",
        userSelect: "none",
        webkitUserSelect: "none",
        height: "".concat(this.params.height * Object.keys(this.tiers).length, "px")
      });

      if (this.wsParams.fillParent || this.wsParams.scrollParent) {
        this.util.style(this.wrapper, {
          width: "100%",
          overflowX: "hidden",
          overflowY: "hidden"
        });
      }

      var i = 0;

      for (var key in this.tiers) {
        this.updateCanvas(key, i);
        this.updateCanvasPositioning(key);
        this.renderCanvas(key);
        this.renderLabel(key);
        i++;
      }
    }
    /**
     * Add new textgrid canvas
     *
     */

  }, {
    key: "addCanvas",
    value: function addCanvas(key, i) {
      if (this.tiers[key].canvas == undefined) {
        var canvas = this.wrapper.appendChild(document.createElement("canvas"));
        this.util.style(canvas, {
          position: "absolute",
          zIndex: 3,
          top: "".concat(i * this.params.height, "px"),
          "border-top": "solid 1px ".concat(this.params.color),
          "border-bottom": "solid 1px ".concat(this.params.color)
        });
        var vm = this;

        this.tiers[key].onClick = function (e) {
          e.preventDefault();
          var time = vm.event2time(e);
          var item = {
            key: key,
            time: time
          };
          var canditates = vm.tiers[key].values.filter(function (x) {
            return x.time > time;
          });
          canditates.sort(function (a, b) {
            return a.time - b.time;
          });
          var currentItem = canditates[0];

          if (currentItem) {
            vm.current.key = key;
            vm.setCurrent(key, item);
            vm.render();
          }

          vm.wavesurfer.fireEvent("textgrid-click", item);
        };

        this.tiers[key].onDblClick = function (e) {
          e.preventDefault();
          var time = vm.event2time(e);
          var item = {
            key: key,
            time: time
          };
          vm.wavesurfer.fireEvent("textgrid-dblclick", item);
        };

        canvas.addEventListener("click", this.tiers[key].onClick, false);
        canvas.addEventListener("dblclick", this.tiers[key].onDblClick, false);
        this.tiers[key].canvas = canvas;
        var label = this.wrapper.appendChild(document.createElement("canvas"));
        label.classList.add("tier-labels");
        this.drawer.style(label, {
          position: "absolute",
          top: "".concat(i * this.params.height, "px"),
          zIndex: 4,
          width: "${this.params.fontSize + 4}px"
        });
        this.tiers[key].label = label;
      }
    }
    /**
     * Remove textgrid canvas
     *
     */

  }, {
    key: "removeCanvas",
    value: function removeCanvas(key) {
      var canvas = this.tiers[key].canvas;
      canvas.parentElement.removeChild(canvas);
    }
  }, {
    key: "updateCanvas",
    value: function updateCanvas(key, i) {
      // if (this.params.tiers[key].canvas != undefined) {
      //   this.removeCanvas();
      // }
      this.addCanvas(key, i);
    }
    /**
     * Update the dimensions and positioning style for all the textgrid canvas
     */

  }, {
    key: "updateCanvasPositioning",
    value: function updateCanvasPositioning(key) {
      var canvas = this.tiers[key].canvas; // cache length for performance

      var canvasesLength = 1; // canvas width is the max element width, or if it is the last the
      // required width

      var canvasWidth = 0 === canvasesLength - 1 ? this.drawer.wrapper.scrollWidth - this.maxCanvasElementWidth * (canvasesLength - 1) : this.maxCanvasElementWidth; // set dimensions and style

      canvas.width = canvasWidth * this.pixelRatio; // on certain pixel ratios the canvas appears cut off at the bottom,
      // therefore leave 1px extra

      canvas.height = (this.params.height + 1) * this.pixelRatio;
      this.util.style(canvas, {
        width: "".concat(canvasWidth, "px"),
        height: "".concat(this.params.height, "px"),
        left: "".concat(0 * this.maxCanvasElementWidth, "px")
      });
    }
    /**
     * Render the textgrid labels and notches
     *
     */

  }, {
    key: "renderCanvas",
    value: function renderCanvas(key) {
      var duration = this.wavesurfer.backend.getDuration();

      if (duration <= 0) {
        return;
      }

      var width = this.wsParams.fillParent && !this.wsParams.scrollParent ? this.drawer.getWidth() : this.drawer.wrapper.scrollWidth * this.wsParams.pixelRatio;
      var pixelsPerSecond = width / duration; // build an array of position data with index, second and pixel data,
      // this is then used multiple times below

      var values = this.tiers[key].values;
      values.sort(function (a, b) {
        return a.time - b.time;
      });
      var positioning = [];
      var i = 0;

      var _iterator = _createForOfIteratorHelper(values),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var x = _step.value;
          var curPixel = pixelsPerSecond * x.time;
          var preSec = i == 0 ? 0 : values[i - 1].time;
          var prePixel = i == 0 ? 0 : pixelsPerSecond * preSec;
          positioning.push([x.time, curPixel, prePixel, x.text]);
          i++;
        } // iterate over each position

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (this.tiers[key].type == "interval") {
        this.renderIntervalTier(key, positioning);
      } else if (this.tiers[key].type == "point") {
        this.renderPointTier(key, positioning);
      } else {
        this.wavesurfer.fireEvent("error", "tier.type is 'interval' or 'point'");
      }
    }
  }, {
    key: "renderIntervalTier",
    value: function renderIntervalTier(key, positioning) {
      var _this2 = this;

      var height = this.params.height * this.pixelRatio;
      this.fillRect(key, 0, 0, 1, height);

      var renderPositions = function renderPositions(cb) {
        positioning.forEach(function (pos) {
          cb(pos[0], pos[1], pos[2], pos[3]);
        });
      }; // render labels


      renderPositions(function (curSeconds, curPixel, prePixel, text) {
        // 現在クリック時の表示箇所を強調
        if (_this2.current.key == key && _this2.current.item) {
          if (_this2.current.item.time == curSeconds) {
            _this2.setFillStyles(key, _this2.params.activeColor);

            var canvas = _this2.tiers[key].canvas;
            canvas.getContext("2d").fillRect(prePixel, 0, curPixel - prePixel, canvas.height);
          }

          _this2.setFillStyles(key, _this2.params.color);

          _this2.setFillStyles(key, _this2.params.fontColor);
        }

        _this2.fillRect(key, curPixel, 0, 1, height); // 文字表示が可能な場合文字を表示


        if (text) {
          var fontSize = _this2.params.fontSize * _this2.wsParams.pixelRatio;

          var textLength = _this2.getStrLength(text);

          var pixels = curPixel - prePixel;
          var textPiexels = fontSize * textLength;

          if (pixels < textPiexels) {
            fontSize = Math.round(pixels / textLength);

            _this2.setFonts(key, "".concat(fontSize, "px ").concat(_this2.params.fontFamily));
          }

          _this2.setFonts(key, "".concat(fontSize, "px ").concat(_this2.params.fontFamily));

          _this2.fillText(key, text, Math.round((prePixel + curPixel) / 2) - fontSize * textLength * 0.25, height + fontSize / 2);
        }
      });
    }
  }, {
    key: "renderPointTier",
    value: function renderPointTier(key, positioning) {
      var _this3 = this;

      var height = this.params.height * this.pixelRatio;

      var renderPositions = function renderPositions(cb) {
        positioning.forEach(function (pos) {
          cb(pos[0], pos[1], pos[2], pos[3]);
        });
      }; // render labels


      renderPositions(function (curSeconds, curPixel, prePixel, text) {
        // 現在クリック時の表示箇所を強調
        if (_this3.current.key == key && _this3.current.item) {
          if (_this3.current.item.time == curSeconds) {
            _this3.setFillStyles(key, _this3.params.activeColor);

            _this3.fillRect(key, curPixel, 0, 3, Math.round(height / 2));
          } else {
            _this3.setFillStyles(key, _this3.params.color);

            _this3.fillRect(key, curPixel, 0, 1, Math.round(height / 2));
          }
        } else {
          _this3.setFillStyles(key, _this3.params.color);

          _this3.fillRect(key, curPixel, 0, 1, Math.round(height / 2));
        } // 文字表示が可能な場合文字を表示


        if (text) {
          var textLength = _this3.getStrLength(text);

          var fontSize = _this3.params.fontSize * _this3.wsParams.pixelRatio;

          _this3.setFonts(key, "".concat(fontSize, "px ").concat(_this3.params.fontFamily));

          _this3.fillText(key, text, Math.round(curPixel - fontSize * textLength / 4), Math.round(height * 2 - fontSize));
        }
      });
    }
  }, {
    key: "renderLabel",
    value: function renderLabel(key) {
      var bgWidth = this.params.fontSize;
      var bgFill = "rgba(".concat([0, 0, 0, 0.5], ")");
      var label = this.tiers[key].label;
      var ctx = label.getContext("2d");
      label.height = this.tiers[key].canvas.height;
      label.width = bgWidth;
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, label.width, label.height);
      ctx.fill();
      var textColor = "#fff";
      var fontSize = 15;
      var fontType = "Helvetica";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "".concat(fontSize, "px ").concat(fontType);
      ctx.fillStyle = textColor;

      for (var i in key) {
        var str = key[i];
        ctx.fillText(str, fontSize / 2, i * fontSize + 10);
      }
    }
    /**
     * Set the canvas fill style
     *
     * @param {DOMString|CanvasGradient|CanvasPattern} fillStyle Fill style to
     * use
     */

  }, {
    key: "setFillStyles",
    value: function setFillStyles(key, fillStyle) {
      var canvas = this.tiers[key].canvas;
      canvas.getContext("2d").fillStyle = fillStyle;
    }
    /**
     * Set the canvas font
     *
     * @param {DOMString} font Font to use
     */

  }, {
    key: "setFonts",
    value: function setFonts(key, font) {
      var canvas = this.tiers[key].canvas;
      canvas.getContext("2d").font = font;
    }
    /**
     * Draw a rectangle on the canvas
     *
     * (it figures out the offset for each canvas)
     *
     * @param {number} x X-position
     * @param {number} y Y-position
     * @param {number} width Width
     * @param {number} height Height
     */

  }, {
    key: "fillRect",
    value: function fillRect(key, x, y, width, height) {
      var canvas = this.tiers[key].canvas;
      var leftOffset = 0;
      var intersection = {
        x1: Math.max(x, 0),
        y1: y,
        x2: Math.min(x + width, canvas.width),
        y2: y + height
      };

      if (intersection.x1 < intersection.x2) {
        canvas.getContext("2d").fillRect(intersection.x1 - leftOffset, intersection.y1, intersection.x2 - intersection.x1, intersection.y2 - intersection.y1);
      }
    }
    /**
     * Fill a given text on the canvas
     *
     * @param {string} text Text to render
     * @param {number} x X-position
     * @param {number} y Y-position
     */

  }, {
    key: "fillText",
    value: function fillText(key, text, x, y) {
      var textWidth;
      var xOffset = 0;
      var canvas = this.tiers[key].canvas;
      var context = canvas.getContext("2d");
      var canvasWidth = context.canvas.width;

      if (xOffset > x + textWidth) {
        return;
      }

      if (xOffset + canvasWidth > x) {
        textWidth = context.measureText(text).width;
        context.fillText(text, x, y / 2);
      }

      xOffset += canvasWidth;
    }
  }, {
    key: "setCurrent",
    value: function setCurrent(key, item) {
      var _this4 = this;

      this.current.key = key;
      this.current.item = item;

      if (item) {
        this.current.index = this.tiers[key].values.findIndex(function (x) {
          return x.time == _this4.current.item.time;
        });
      }

      this.wavesurfer.fireEvent("textgrid-current-update", this.current);
    }
    /**
     * 全角半角を考慮して文字列のカウントを行う
     *
     * @param {string} str String for counting.
     */

  }, {
    key: "getStrLength",
    value: function getStrLength(str) {
      var count = 0;

      for (var i = 0; i < str.length; i++) {
        var chr = str.charCodeAt(i);

        if (chr >= 0x00 && chr < 0x81 || chr === 0xf8f0 || chr >= 0xff61 && chr < 0xffa0 || chr >= 0xf8f1 && chr < 0xf8f4) {
          count += 1; //半角文字の場合は1を加算
        } else {
          //それ以外の文字の場合は2を加算
          count += 2;
        }
      }

      return count;
    }
  }, {
    key: "event2time",
    value: function event2time(e) {
      var relX = "offsetX" in e ? e.offsetX : e.layerX;
      var duration = this.wavesurfer.backend.getDuration();
      if (duration <= 0) return;
      var width = this.wsParams.fillParent && !this.wsParams.scrollParent ? this.drawer.getWidth() : this.drawer.wrapper.scrollWidth * this.wsParams.pixelRatio;
      var pixelsPerSecond = width / duration;
      return relX / pixelsPerSecond;
    }
  }, {
    key: "addTier",
    value: function addTier(key, type) {
      this.tiers[key] = {
        type: type,
        values: []
      };
      this.render();
      this.setCurrent(key, null);
      this.wavesurfer.fireEvent("textgrid-update", this.tiers);
    }
  }, {
    key: "deleteTier",
    value: function deleteTier(key) {
      if (key in this.tiers) {
        this.removeCanvas(key);
        delete this.tiers[key];
        this.setCurrent(null, null);
        this.render();
      }

      this.wavesurfer.fireEvent("textgrid-update", this.tiers);
    }
  }, {
    key: "updateTier",
    value: function updateTier(key, obj) {
      if (key in this.tiers) {
        if ("name" in obj) {
          var type = "type" in obj ? obj.type : this.tiers[key].type;
          var values = this.tiers[key];
          this.addTier(obj.name, type);
          this.tiers[obj.name].values = values;
          this.setCurrent(obj.name, values[0]);
          this.wavesurfer.fireEvent("textgrid-current-update", this.current);
          this.deleteTier(key);
        } else if ("type" in obj) {
          this.tiers[key].type = obj.type;
          this.setCurrent(key, this.tiers[key].values[0]);
        }

        this.render();
        this.wavesurfer.fireEvent("textgrid-update", this.tiers);
      }
    }
  }, {
    key: "addTierValue",
    value: function addTierValue(key, obj) {
      if (key in this.tiers) {
        this.tiers[key].values.push(obj);
        this.setCurrent(key, obj);
        this.render();
        this.wavesurfer.fireEvent("textgrid-update", this.tiers);
      }
    }
  }, {
    key: "setTierValue",
    value: function setTierValue(key, idx, object) {
      this.tiers[key].values[idx] = object;
      this.setCurrent(key, this.tiers[key].values[idx]);
      this.render();
      this.wavesurfer.fireEvent("textgrid-update", this.tiers);
    }
  }, {
    key: "deleteTierValue",
    value: function deleteTierValue(key, idx) {
      if (key in this.tiers) {
        if (idx > -1) {
          this.tiers[key].values.splice(idx, 1);
          this.setCurrent(key, null);
          this.render();
          this.wavesurfer.fireEvent("textgrid-update", this.tiers);
        }
      }
    }
  }, {
    key: "loadTextGrid",
    value: function loadTextGrid(file) {
      var _this5 = this;

      var fr = new FileReader();
      var vm = this;
      fr.readAsText(file);
      fr.addEventListener("load", function () {
        vm.tiers = io.textgrid.load(fr.result);
        var keys = Object.keys(_this5.tiers);
        vm.setCurrent(keys[0], _this5.tiers[keys[0]].values[0]);
        vm.wavesurfer.fireEvent("textgrid-current-update", vm.current);
        vm.render();
        vm.wavesurfer.fireEvent("textgrid-update", vm.tiers);
      });
    }
  }, {
    key: "dumpTextGrid",
    value: function dumpTextGrid() {
      var duration = this.wavesurfer.backend.getDuration();
      var tiers = this.tiers;
      var content = io.textgrid.dump(duration, tiers);
      return content;
    }
  }, {
    key: "downloadTextGrid",
    value: function downloadTextGrid(filename) {
      var content = this.dumpTextGrid();
      var blob = new Blob([content], {
        type: "text/plain"
      });
      var downloadLink = document.createElement("a");
      downloadLink.download = filename;
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.dataset.downloadurl = ["text/plain", downloadLink.download, downloadLink.href].join(":");
      downloadLink.click();
    }
  }]);

  return TextgridPlugin;
}();


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.math.log10.js
var es_math_log10 = __webpack_require__("6b93");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.uint8-array.js
var es_typed_array_uint8_array = __webpack_require__("5cc6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.copy-within.js
var es_typed_array_copy_within = __webpack_require__("9a8c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.every.js
var es_typed_array_every = __webpack_require__("a975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.fill.js
var es_typed_array_fill = __webpack_require__("735e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.filter.js
var es_typed_array_filter = __webpack_require__("c1ac");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find.js
var es_typed_array_find = __webpack_require__("d139");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find-index.js
var es_typed_array_find_index = __webpack_require__("3a7b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.for-each.js
var es_typed_array_for_each = __webpack_require__("d5d6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.includes.js
var es_typed_array_includes = __webpack_require__("82f8");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.index-of.js
var es_typed_array_index_of = __webpack_require__("e91f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.iterator.js
var es_typed_array_iterator = __webpack_require__("60bd");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.join.js
var es_typed_array_join = __webpack_require__("5f96");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.last-index-of.js
var es_typed_array_last_index_of = __webpack_require__("3280");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.map.js
var es_typed_array_map = __webpack_require__("3fcc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reduce.js
var es_typed_array_reduce = __webpack_require__("ca91");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reduce-right.js
var es_typed_array_reduce_right = __webpack_require__("25a1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reverse.js
var es_typed_array_reverse = __webpack_require__("cd26");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.set.js
var es_typed_array_set = __webpack_require__("3c5d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.slice.js
var es_typed_array_slice = __webpack_require__("2954");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.some.js
var es_typed_array_some = __webpack_require__("649e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.sort.js
var es_typed_array_sort = __webpack_require__("219c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.subarray.js
var es_typed_array_subarray = __webpack_require__("170b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-locale-string.js
var es_typed_array_to_locale_string = __webpack_require__("b39a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-string.js
var es_typed_array_to_string = __webpack_require__("72f7");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.float32-array.js
var es_typed_array_float32_array = __webpack_require__("cfc3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.uint32-array.js
var es_typed_array_uint32_array = __webpack_require__("fb2c");

// CONCATENATED MODULE: ./src/components/WaveSurfer/plugin/spectrogram/fft.js





























/* eslint-disable complexity, no-redeclare, no-var, one-var */

/**
 * Calculate FFT - Based on https://github.com/corbanbrook/dsp.js
 *
 * @param {Number} bufferSize Buffer size
 * @param {Number} sampleRate Sample rate
 * @param {Function} windowFunc Window function
 * @param {Number} alpha Alpha channel
 */
function FFT(bufferSize, sampleRate, windowFunc, alpha) {
  this.bufferSize = bufferSize;
  this.sampleRate = sampleRate;
  this.bandwidth = 2 / bufferSize * (sampleRate / 2);
  this.sinTable = new Float32Array(bufferSize);
  this.cosTable = new Float32Array(bufferSize);
  this.windowValues = new Float32Array(bufferSize);
  this.reverseTable = new Uint32Array(bufferSize);
  this.peakBand = 0;
  this.peak = 0;
  var i;

  switch (windowFunc) {
    case "bartlett":
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 2 / (bufferSize - 1) * ((bufferSize - 1) / 2 - Math.abs(i - (bufferSize - 1) / 2));
      }

      break;

    case "bartlettHann":
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 0.62 - 0.48 * Math.abs(i / (bufferSize - 1) - 0.5) - 0.38 * Math.cos(Math.PI * 2 * i / (bufferSize - 1));
      }

      break;

    case "blackman":
      alpha = alpha || 0.16;

      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = (1 - alpha) / 2 - 0.5 * Math.cos(Math.PI * 2 * i / (bufferSize - 1)) + alpha / 2 * Math.cos(4 * Math.PI * i / (bufferSize - 1));
      }

      break;

    case "cosine":
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = Math.cos(Math.PI * i / (bufferSize - 1) - Math.PI / 2);
      }

      break;

    case "gauss":
      alpha = alpha || 0.25;

      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = Math.pow(Math.E, -0.5 * Math.pow((i - (bufferSize - 1) / 2) / (alpha * (bufferSize - 1) / 2), 2));
      }

      break;

    case "hamming":
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 0.54 - 0.46 * Math.cos(Math.PI * 2 * i / (bufferSize - 1));
      }

      break;

    case "hann":
    case undefined:
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 0.5 * (1 - Math.cos(Math.PI * 2 * i / (bufferSize - 1)));
      }

      break;

    case "lanczoz":
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = Math.sin(Math.PI * (2 * i / (bufferSize - 1) - 1)) / (Math.PI * (2 * i / (bufferSize - 1) - 1));
      }

      break;

    case "rectangular":
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 1;
      }

      break;

    case "triangular":
      for (i = 0; i < bufferSize; i++) {
        this.windowValues[i] = 2 / bufferSize * (bufferSize / 2 - Math.abs(i - (bufferSize - 1) / 2));
      }

      break;

    default:
      throw Error("No such window function '" + windowFunc + "'");
  }

  var limit = 1;
  var bit = bufferSize >> 1;
  var i;

  while (limit < bufferSize) {
    for (i = 0; i < limit; i++) {
      this.reverseTable[i + limit] = this.reverseTable[i] + bit;
    }

    limit = limit << 1;
    bit = bit >> 1;
  }

  for (i = 0; i < bufferSize; i++) {
    this.sinTable[i] = Math.sin(-Math.PI / i);
    this.cosTable[i] = Math.cos(-Math.PI / i);
  }

  this.calculateSpectrum = function (buffer) {
    // Locally scope variables for speed up
    var bufferSize = this.bufferSize;
    var cosTable = this.cosTable;
    var sinTable = this.sinTable;
    var reverseTable = this.reverseTable;
    var bSi = 2 / this.bufferSize;
    var sqrt = Math.sqrt;
    var k = Math.floor(Math.log(bufferSize) / Math.LN2);
    var rval, ival, mag;
    var imag = new Float32Array(bufferSize);
    var real = new Float32Array(bufferSize);
    var spectrum = new Float32Array(bufferSize / 2);

    if (Math.pow(2, k) !== bufferSize) {
      throw "Invalid buffer size, must be a power of 2.";
    }

    if (bufferSize !== buffer.length) {
      var msg = ["Supplied buffer is not the same size as defined FFT.", "FFT Size: ".concat(bufferSize, " Buffer Size: ").concat(buffer.length)].join(" ");
      throw msg;
    }

    var halfSize = 1;
    var off, tmpReal;
    var phaseShiftStepReal, phaseShiftStepImag;
    var currentPhaseShiftReal, currentPhaseShiftImag;
    var tr, ti;

    for (var _i = 0; _i < bufferSize; _i++) {
      real[_i] = buffer[reverseTable[_i]] * this.windowValues[reverseTable[_i]];
      imag[_i] = 0;
    }

    while (halfSize < bufferSize) {
      phaseShiftStepReal = cosTable[halfSize];
      phaseShiftStepImag = sinTable[halfSize];
      currentPhaseShiftReal = 1;
      currentPhaseShiftImag = 0;

      for (var fftStep = 0; fftStep < halfSize; fftStep++) {
        var _i2 = fftStep;

        while (_i2 < bufferSize) {
          off = _i2 + halfSize;
          tr = currentPhaseShiftReal * real[off] - currentPhaseShiftImag * imag[off];
          ti = currentPhaseShiftReal * imag[off] + currentPhaseShiftImag * real[off];
          real[off] = real[_i2] - tr;
          imag[off] = imag[_i2] - ti;
          real[_i2] += tr;
          imag[_i2] += ti;
          _i2 += halfSize << 1;
        }

        tmpReal = currentPhaseShiftReal;
        currentPhaseShiftReal = tmpReal * phaseShiftStepReal - currentPhaseShiftImag * phaseShiftStepImag;
        currentPhaseShiftImag = tmpReal * phaseShiftStepImag + currentPhaseShiftImag * phaseShiftStepReal;
      }

      halfSize = halfSize << 1;
    }

    for (var _i3 = 0, N = bufferSize / 2; _i3 < N; _i3++) {
      rval = real[_i3];
      ival = imag[_i3];
      mag = bSi * sqrt(rval * rval + ival * ival);

      if (mag > this.peak) {
        this.peakBand = _i3;
        this.peak = mag;
      }

      spectrum[_i3] = mag;
    }

    return spectrum;
  };

  this.async_calculateSpectrum = function (buffer) {
    var _this = this;

    // Locally scope variables for speed up
    return new Promise(function (resolve, reject) {
      var bufferSize = _this.bufferSize;
      var cosTable = _this.cosTable;
      var sinTable = _this.sinTable;
      var reverseTable = _this.reverseTable;
      var bSi = 2 / _this.bufferSize;
      var sqrt = Math.sqrt;
      var k = Math.floor(Math.log(bufferSize) / Math.LN2);
      var rval, ival, mag;
      var imag = new Float32Array(bufferSize);
      var real = new Float32Array(bufferSize);
      var spectrum = new Float32Array(bufferSize / 2);

      if (Math.pow(2, k) !== bufferSize) {
        reject(new Error("Invalid buffer size, must be a power of 2."));
      }

      if (bufferSize !== buffer.length) {
        var msg = ["Supplied buffer is not the same size as defined FFT.", "FFT Size: ".concat(bufferSize, " Buffer Size: ").concat(buffer.length)].join(" ");
        reject(new Error(msg));
      }

      var halfSize = 1;
      var off, tmpReal;
      var phaseShiftStepReal, phaseShiftStepImag;
      var currentPhaseShiftReal, currentPhaseShiftImag;
      var tr, ti;

      for (var _i4 = 0; _i4 < bufferSize; _i4++) {
        real[_i4] = buffer[reverseTable[_i4]] * _this.windowValues[reverseTable[_i4]];
        imag[_i4] = 0;
      }

      while (halfSize < bufferSize) {
        phaseShiftStepReal = cosTable[halfSize];
        phaseShiftStepImag = sinTable[halfSize];
        currentPhaseShiftReal = 1;
        currentPhaseShiftImag = 0;

        for (var fftStep = 0; fftStep < halfSize; fftStep++) {
          var _i5 = fftStep;

          while (_i5 < bufferSize) {
            off = _i5 + halfSize;
            tr = currentPhaseShiftReal * real[off] - currentPhaseShiftImag * imag[off];
            ti = currentPhaseShiftReal * imag[off] + currentPhaseShiftImag * real[off];
            real[off] = real[_i5] - tr;
            imag[off] = imag[_i5] - ti;
            real[_i5] += tr;
            imag[_i5] += ti;
            _i5 += halfSize << 1;
          }

          tmpReal = currentPhaseShiftReal;
          currentPhaseShiftReal = tmpReal * phaseShiftStepReal - currentPhaseShiftImag * phaseShiftStepImag;
          currentPhaseShiftImag = tmpReal * phaseShiftStepImag + currentPhaseShiftImag * phaseShiftStepReal;
        }

        halfSize = halfSize << 1;
      }

      for (var _i6 = 0, N = bufferSize / 2; _i6 < N; _i6++) {
        rval = real[_i6];
        ival = imag[_i6];
        mag = bSi * sqrt(rval * rval + ival * ival);

        if (mag > _this.peak) {
          _this.peakBand = _i6;
          _this.peak = mag;
        }

        spectrum[_i6] = mag;
      }

      resolve(spectrum);
    });
  };
}
// CONCATENATED MODULE: ./src/components/WaveSurfer/plugin/spectrogram/index.js







































var spectrogram_dec, spectrogram_dec2, spectrogram_dec3, spectrogram_class;

/* eslint-enable complexity, no-redeclare, no-var, one-var */


var spectrogram_DEBUG = false;
/**
 * @typedef {Object} SpectrogramPluginParams
 * @property {string|HTMLElement} container Selector of element or element in
 * which to render
 * @property {number} fftSamples=512 Number of samples to fetch to FFT. Must be
 * a power of 2.
 * @property {boolean} labels Set to true to display frequency labels.
 * @property {number} noverlap Size of the overlapping window. Must be <
 * fftSamples. Auto deduced from canvas size by default.
 * @property {string} windowFunc='hann' The window function to be used. One of
 * these: `'bartlett'`, `'bartlettHann'`, `'blackman'`, `'cosine'`, `'gauss'`,
 * `'hamming'`, `'hann'`, `'lanczoz'`, `'rectangular'`, `'triangular'`
 * @property {?number} alpha Some window functions have this extra value.
 * (Between 0 and 1)
 * @property {number} pixelRatio=wavesurfer.params.pixelRatio to control the
 * size of the spectrogram in relation with its canvas. 1 = Draw on the whole
 * canvas. 2 = Draw on a quarter (1/2 the length and 1/2 the width)
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('spectrogram')`
 * @property {?number[][]} colorMap A 256 long array of 4-element arrays.
 * Each entry should contain a float between 0 and 1 and specify
 * r, g, b, and alpha.
 */

/**
 * Render a spectrogram visualisation of the audio.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import SpectrogramPlugin from 'wavesurfer.spectrogram.js';
 *
 * // commonjs
 * var SpectrogramPlugin = require('wavesurfer.spectrogram.js');
 *
 * // if you are using <script> tags
 * var SpectrogramPlugin = window.WaveSurfer.spectrogram;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     SpectrogramPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */

var spectrogram_SpectrogramPlugin = (spectrogram_dec = log("spectrogram.drawerSpectrogram", spectrogram_DEBUG), spectrogram_dec2 = log("spectrogram.getFrequencies", spectrogram_DEBUG), spectrogram_dec3 = log("spectrogram.loadLabels", spectrogram_DEBUG), (spectrogram_class = /*#__PURE__*/function () {
  _createClass(SpectrogramPlugin, null, [{
    key: "create",

    /**
     * Spectrogram plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * @param  {SpectrogramPluginParams} params Parameters used to initialise the plugin
     * @return {PluginDefinition} An object representing the plugin.
     */
    value: function create(params) {
      return {
        name: "spectrogram",
        deferInit: params && params.deferInit ? params.deferInit : false,
        params: params,
        staticProps: {
          FFT: FFT
        },
        instance: SpectrogramPlugin
      };
    }
  }]);

  function SpectrogramPlugin(params, ws) {
    var _this = this;

    _classCallCheck(this, SpectrogramPlugin);

    this.params = params;
    this.wavesurfer = ws;
    this.util = ws.util;
    this.frequenciesDataUrl = params.frequenciesDataUrl;

    this._onScroll = function (e) {
      _this.updateScroll(e);
    };

    this._onRender = function () {
      _this.render();
    };

    this._onWrapperClick = function (e) {
      _this._wrapperClickHandler(e);
    };

    this._onReady = function () {
      var drawer = _this.drawer = ws.drawer;
      _this.container = "string" == typeof params.container ? document.querySelector(params.container) : params.container;

      if (!_this.container) {
        throw Error("No container for WaveSurfer spectrogram");
      }

      if (params.colorMap) {
        if (params.colorMap.length < 256) {
          throw new Error("Colormap must contain 256 elements");
        }

        for (var i = 0; i < params.colorMap.length; i++) {
          var cmEntry = params.colorMap[i];

          if (cmEntry.length !== 4) {
            throw new Error("ColorMap entries must contain 4 values");
          }
        }

        _this.colorMap = params.colorMap;
      } else {
        _this.colorMap = [];

        for (var _i = 0; _i < 256; _i++) {
          var val = (255 - _i) / 256;

          _this.colorMap.push([val, val, val, 1]);
        }
      }

      _this.width = drawer.width;
      _this.pixelRatio = _this.params.pixelRatio || ws.params.pixelRatio;
      _this.fftSamples = _this.params.fftSamples || ws.params.fftSamples || 512;
      _this.height = _this.fftSamples / 2;
      _this.noverlap = params.noverlap;
      _this.windowFunc = params.windowFunc;
      _this.alpha = params.alpha;

      _this.createWrapper();

      _this.createCanvas();

      _this.render();

      drawer.wrapper.addEventListener("scroll", _this._onScroll);
      ws.on("redraw", _this._onRender);
    };
  }

  _createClass(SpectrogramPlugin, [{
    key: "init",
    value: function init() {
      // Check if wavesurfer is ready
      if (this.wavesurfer.isReady) {
        this._onReady();
      } else {
        this.wavesurfer.once("ready", this._onReady);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unAll();
      this.wavesurfer.un("ready", this._onReady);
      this.wavesurfer.un("redraw", this._onRender);
      this.drawer && this.drawer.wrapper.removeEventListener("scroll", this._onScroll);
      this.wavesurfer = null;
      this.util = null;
      this.params = null;

      if (this.wrapper) {
        this.wrapper.removeEventListener("click", this._onWrapperClick);
        this.wrapper.parentNode.removeChild(this.wrapper);
        this.wrapper = null;
      }
    }
  }, {
    key: "createWrapper",
    value: function createWrapper() {
      var prevSpectrogram = this.container.querySelector("spectrogram");

      if (prevSpectrogram) {
        this.container.removeChild(prevSpectrogram);
      }

      var wsParams = this.wavesurfer.params;
      this.wrapper = document.createElement("spectrogram"); // if labels are active

      if (this.params.labels) {
        var labelsEl = this.labelsEl = document.createElement("canvas");
        labelsEl.classList.add("spec-labels");
        this.drawer.style(labelsEl, {
          left: 0,
          position: "absolute",
          zIndex: 3,
          height: "".concat(this.height / this.pixelRatio, "px"),
          width: "".concat(55 / this.pixelRatio, "px")
        });
        this.wrapper.appendChild(labelsEl);
      }

      this.drawer.style(this.wrapper, {
        display: "block",
        position: "relative",
        userSelect: "none",
        webkitUserSelect: "none",
        height: "".concat(this.height / this.pixelRatio, "px")
      });

      if (wsParams.fillParent || wsParams.scrollParent) {
        this.drawer.style(this.wrapper, {
          width: "100%",
          overflowX: "hidden",
          overflowY: "hidden"
        });
      }

      this.container.appendChild(this.wrapper);
      this.wrapper.addEventListener("click", this._onWrapperClick);
    }
  }, {
    key: "_wrapperClickHandler",
    value: function _wrapperClickHandler(event) {
      event.preventDefault();
      var relX = "offsetX" in event ? event.offsetX : event.layerX;
      this.fireEvent("click", relX / this.width || 0);
    }
  }, {
    key: "createCanvas",
    value: function createCanvas() {
      var canvas = this.canvas = this.wrapper.appendChild(document.createElement("canvas"));
      this.canvas = canvas;
      this.spectrCc = canvas.getContext("2d");
      this.util.style(canvas, {
        position: "absolute",
        zIndex: 2
      });
    }
  }, {
    key: "render",
    value: function render() {
      this.updateCanvasStyle();
      this.wavesurfer.fireEvent("spectrogram-render-start");

      if (this.frequenciesDataUrl) {
        this.loadFrequenciesData(this.frequenciesDataUrl);
      } else {
        this.getFrequencies(this.drawSpectrogram);
      }

      if (this.params.labels) {
        this.loadLabels("rgba(68,68,68,0.5)", "12px", "10px", "", "#fff", "#f7f7f7", "center", "#specLabels");
      }
    }
  }, {
    key: "updateCanvasStyle",
    value: function updateCanvasStyle() {
      this.width = this.drawer.width;
      var width = Math.round(this.width / this.pixelRatio) + "px";
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.style.width = width;
    }
  }, {
    key: "drawSpectrogram",
    value: function () {
      var _drawSpectrogram = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(frequenciesData, vm) {
        var height, widthFactor, pixels, freqRate, heightFactor, i, j, colorMap;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                height = vm.height;
                widthFactor = vm.wavesurfer.params.minPxPerSec / 100;
                pixels = vm.resample(frequenciesData);
                freqRate = vm.params.freqRate || 1;
                heightFactor = 4;

                if (vm.buffer) {
                  if (vm.buffer.numberOfChannels) {
                    heightFactor = 4 / vm.buffer.numberOfChannels;
                  }
                }

                vm.spectrCc.clearRect(0, 0, vm.width, height);

                for (i = 0; i < pixels.length; i++) {
                  for (j = 0; j < Math.round(pixels[i].length * freqRate); j++) {
                    colorMap = vm.colorMap[pixels[i][j]];
                    vm.spectrCc.fillStyle = "rgba(".concat(colorMap[0] * 256, ", ").concat(colorMap[1] * 256, ", ").concat(colorMap[2] * 256, ", ").concat(colorMap[3], ")");
                    vm.spectrCc.fillRect(Math.round(i * widthFactor), Math.round(height - j * (heightFactor / freqRate)), Math.round(widthFactor), Math.round(heightFactor / freqRate));
                  }
                }

                vm.wavesurfer.fireEvent("spectrogram-render-end");

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function drawSpectrogram(_x, _x2) {
        return _drawSpectrogram.apply(this, arguments);
      }

      return drawSpectrogram;
    }()
  }, {
    key: "getFrequencies",
    value: function () {
      var _getFrequencies = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(callback) {
        var fftSamples, buffer, targetChannel, channelOne, sampleRate, frequencies, noverlap, uniqueSamplesPerPx, fft, currentOffset, segment, spectrum, array;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fftSamples = this.fftSamples;
                buffer = this.buffer = this.wavesurfer.backend.buffer;

                if (buffer) {
                  _context2.next = 5;
                  break;
                }

                this.fireEvent("error", "Web Audio buffer is not available");
                return _context2.abrupt("return");

              case 5:
                targetChannel = 0;

                if (buffer) {
                  if (buffer.numberOfChannels != null) {
                    if (buffer.numberOfChannels > 1) {
                      targetChannel = this.params.targetChannel || 0;
                    }
                  }

                  channelOne = buffer.getChannelData(targetChannel);
                  sampleRate = buffer.sampleRate;
                }

                frequencies = [];
                noverlap = this.noverlap;

                if (!noverlap) {
                  uniqueSamplesPerPx = buffer.length / this.canvas.width;
                  noverlap = Math.max(0, Math.round(fftSamples - uniqueSamplesPerPx));
                }

                fft = new FFT(fftSamples, sampleRate, this.windowFunc, this.alpha);
                currentOffset = 0;

              case 12:
                if (!(currentOffset + fftSamples < channelOne.length)) {
                  _context2.next = 22;
                  break;
                }

                segment = channelOne.slice(currentOffset, currentOffset + fftSamples);
                _context2.next = 16;
                return fft.async_calculateSpectrum(segment);

              case 16:
                spectrum = _context2.sent;
                array = spectrum.slice(0, Math.round(fftSamples / 2)).map(function (x) {
                  return Math.max(-255, Math.log10(x) * 45);
                });
                frequencies.push(array);
                currentOffset += fftSamples - noverlap;
                _context2.next = 12;
                break;

              case 22:
                callback(frequencies, this);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getFrequencies(_x3) {
        return _getFrequencies.apply(this, arguments);
      }

      return getFrequencies;
    }()
  }, {
    key: "loadFrequenciesData",
    value: function loadFrequenciesData(url) {
      var _this2 = this;

      var request = this.util.fetchFile({
        url: url
      });
      request.on("success", function (data) {
        return _this2.drawSpectrogram(JSON.parse(data), _this2);
      });
      request.on("error", function (e) {
        return _this2.fireEvent("error", e);
      });
      return request;
    }
  }, {
    key: "freqType",
    value: function freqType(freq) {
      return freq >= 1000 ? (freq / 1000).toFixed(1) : Math.round(freq);
    }
  }, {
    key: "unitType",
    value: function unitType(freq) {
      return freq >= 1000 ? "KHz" : "Hz";
    }
  }, {
    key: "loadLabels",
    value: function loadLabels(bgFill, fontSizeFreq, fontSizeUnit, fontType, textColorFreq, textColorUnit, textAlign) {
      bgFill = bgFill || "rgba(68,68,68,0)";
      fontSizeFreq = fontSizeFreq || "12px";
      fontSizeUnit = fontSizeUnit || "10px";
      fontType = fontType || "Helvetica";
      textColorFreq = textColorFreq || "#fff";
      textColorUnit = textColorUnit || "#fff";
      textAlign = textAlign || "center";
      var freqRate = this.params.freqRate || 1;
      var heightFactor = 4;

      if (this.buffer) {
        if (this.buffer.numberOfChannels) {
          heightFactor = 2 / this.buffer.numberOfChannels;
        }
      }

      var bgWidth = 55;
      var getMaxY = this.height || 512;
      var labelIndex = 5 * (getMaxY / (256 * freqRate));
      var freqStart = 0;
      var step = (this.wavesurfer.backend.ac.sampleRate / 2 - freqStart) / labelIndex; // prepare canvas element for labels

      var ctx = this.labelsEl.getContext("2d");
      this.labelsEl.height = this.height;
      this.labelsEl.width = bgWidth; // fill background

      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, bgWidth, getMaxY);
      ctx.fill();
      var i; // render labels

      for (i = 0; i <= labelIndex; i++) {
        ctx.textAlign = textAlign;
        ctx.textBaseline = "middle";
        var freq = freqStart + step * i;
        var label = this.freqType(freq / (2 * heightFactor));
        var units = this.unitType(freq);
        var yLabelOffset = 2;
        var x = 16;
        var y = void 0;

        if (i == 0) {
          y = getMaxY + i - 10; // unit label

          ctx.fillStyle = textColorUnit;
          ctx.font = fontSizeUnit + " " + fontType;
          ctx.fillText(units, x + 24, y); // freq label

          ctx.fillStyle = textColorFreq;
          ctx.font = fontSizeFreq + " " + fontType;
          ctx.fillText(label, x, y);
        } else {
          y = getMaxY - i * 50 + yLabelOffset; // unit label

          ctx.fillStyle = textColorUnit;
          ctx.font = fontSizeUnit + " " + fontType;
          ctx.fillText(units, x + 24, y); // freq label

          ctx.fillStyle = textColorFreq;
          ctx.font = fontSizeFreq + " " + fontType;
          ctx.fillText(label, x, y);
        }
      }
    }
  }, {
    key: "updateScroll",
    value: function updateScroll(e) {
      if (this.wrapper) {
        this.wrapper.scrollLeft = e.target.scrollLeft;
      }
    }
  }, {
    key: "resample",
    value: function resample(oldMatrix) {
      var widthFactor = this.wavesurfer.params.minPxPerSec / 100;
      var columnsNumber = this.width / widthFactor;
      var newMatrix = [];
      var oldPiece = 1 / oldMatrix.length;
      var newPiece = 1 / columnsNumber;
      var i;

      for (i = 0; i < columnsNumber; i++) {
        var column = new Array(oldMatrix[0].length);
        var j = void 0;

        for (j = 0; j < oldMatrix.length; j++) {
          var oldStart = j * oldPiece;
          var oldEnd = oldStart + oldPiece;
          var newStart = i * newPiece;
          var newEnd = newStart + newPiece;
          var overlap = oldEnd <= newStart || newEnd <= oldStart ? 0 : Math.min(Math.max(oldEnd, newStart), Math.max(newEnd, oldStart)) - Math.max(Math.min(oldEnd, newStart), Math.min(newEnd, oldStart));
          var k = void 0;
          /* eslint-disable max-depth */

          if (overlap > 0) {
            for (k = 0; k < oldMatrix[0].length; k++) {
              if (column[k] == null) {
                column[k] = 0;
              }

              column[k] += overlap / newPiece * oldMatrix[j][k];
            }
          }
          /* eslint-enable max-depth */

        }

        var intColumn = new Uint8Array(oldMatrix[0].length);
        var m = void 0;

        for (m = 0; m < oldMatrix[0].length; m++) {
          intColumn[m] = column[m];
        }

        newMatrix.push(intColumn);
      }

      return newMatrix;
    }
  }]);

  return SpectrogramPlugin;
}(), (_applyDecoratedDescriptor(spectrogram_class.prototype, "drawSpectrogram", [spectrogram_dec], Object.getOwnPropertyDescriptor(spectrogram_class.prototype, "drawSpectrogram"), spectrogram_class.prototype), _applyDecoratedDescriptor(spectrogram_class.prototype, "getFrequencies", [spectrogram_dec2], Object.getOwnPropertyDescriptor(spectrogram_class.prototype, "getFrequencies"), spectrogram_class.prototype), _applyDecoratedDescriptor(spectrogram_class.prototype, "loadLabels", [spectrogram_dec3], Object.getOwnPropertyDescriptor(spectrogram_class.prototype, "loadLabels"), spectrogram_class.prototype)), spectrogram_class));

// CONCATENATED MODULE: ./src/components/WaveSurfer/plugin/microphone/index.js








/**
 * @typedef {Object} MicrophonePluginParams
 * @property {MediaStreamConstraints} constraints The constraints parameter is a
 * MediaStreamConstaints object with two members: video and audio, describing
 * the media types requested. Either or both must be specified.
 * @property {number} bufferSize=4096 The buffer size in units of sample-frames.
 * If specified, the bufferSize must be one of the following values: `256`,
 * `512`, `1024`, `2048`, `4096`, `8192`, `16384`
 * @property {number} numberOfInputChannels=1 Integer specifying the number of
 * channels for this node's input. Values of up to 32 are supported.
 * @property {number} numberOfOutputChannels=1 Integer specifying the number of
 * channels for this node's output.
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('microphone')`
 */

/**
 * Visualize microphone input in a wavesurfer instance.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import MicrophonePlugin from 'wavesurfer.microphone.js';
 *
 * // commonjs
 * var MicrophonePlugin = require('wavesurfer.microphone.js');
 *
 * // if you are using <script> tags
 * var MicrophonePlugin = window.WaveSurfer.microphone;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     MicrophonePlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
var microphone_MicrophonePlugin = /*#__PURE__*/function () {
  _createClass(MicrophonePlugin, null, [{
    key: "create",

    /**
     * Microphone plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * @param  {MicrophonePluginParams} params parameters use to initialise the plugin
     * @return {PluginDefinition} an object representing the plugin
     */
    value: function create(params) {
      return {
        name: "microphone",
        deferInit: params && params.deferInit ? params.deferInit : false,
        params: params,
        instance: MicrophonePlugin
      };
    }
    /* eslint-disable  no-unused-vars */

  }]);

  function MicrophonePlugin(params, ws) {
    var _this = this;

    _classCallCheck(this, MicrophonePlugin);

    this.params = params;
    this.wavesurfer = ws;
    this.active = false;
    this.paused = false;
    this.browser = this.detectBrowser();

    this.reloadBufferFunction = function (e) {
      return _this.reloadBuffer(e);
    }; // cross-browser getUserMedia


    var promisifiedOldGUM = function promisifiedOldGUM(constraints, successCallback, errorCallback) {
      // get a hold of getUserMedia, if present
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia; // Some browsers just don't implement it - return a rejected
      // promise with an error to keep a consistent interface

      if (!getUserMedia) {
        return Promise.reject(new Error("getUserMedia is not implemented in this browser"));
      } // otherwise, wrap the call to the old navigator.getUserMedia with
      // a Promise


      return new Promise(function (successCallback, errorCallback) {
        getUserMedia.call(navigator, constraints, successCallback, errorCallback);
      });
    }; // Older browsers might not implement mediaDevices at all, so we set an
    // empty object first


    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    } // Some browsers partially implement mediaDevices. We can't just assign
    // an object with getUserMedia as it would overwrite existing
    // properties. Here, we will just add the getUserMedia property if it's
    // missing.


    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
    }

    this.constraints = this.params.constraints || {
      video: false,
      audio: true
    };
    this.bufferSize = this.params.bufferSize || 4096;
    this.numberOfInputChannels = this.params.numberOfInputChannels || 1;
    this.numberOfOutputChannels = this.params.numberOfOutputChannels || 1;

    this._onBackendCreated = function () {
      // wavesurfer's AudioContext where we'll route the mic signal to
      _this.micContext = _this.wavesurfer.backend.getAudioContext();
    };
  }
  /* eslint-enable */


  _createClass(MicrophonePlugin, [{
    key: "init",
    value: function init() {
      this.wavesurfer.on("backend-created", this._onBackendCreated);

      if (this.wavesurfer.backend) {
        this._onBackendCreated();
      }
    }
    /**
     * Destroy the microphone plugin.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      // make sure the buffer is not redrawn during
      // cleanup and demolition of this plugin.
      this.paused = true;
      this.wavesurfer.un("backend-created", this._onBackendCreated);
      this.stop();
    }
    /**
     * Allow user to select audio input device, e.g. microphone, and
     * start the visualization.
     */

  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      navigator.mediaDevices.getUserMedia(this.constraints).then(function (data) {
        return _this2.gotStream(data);
      }).catch(function (data) {
        return _this2.deviceError(data);
      });
    }
    /**
     * Pause/resume visualization.
     */

  }, {
    key: "togglePlay",
    value: function togglePlay() {
      if (!this.active) {
        // start it first
        this.start();
      } else {
        // toggle paused
        this.paused = !this.paused;

        if (this.paused) {
          this.pause();
        } else {
          this.play();
        }
      }
    }
    /**
     * Play visualization.
     */

  }, {
    key: "play",
    value: function play() {
      this.paused = false;
      this.connect();
    }
    /**
     * Pause visualization.
     */

  }, {
    key: "pause",
    value: function pause() {
      this.paused = true; // disconnect sources so they can be used elsewhere
      // (eg. during audio playback)

      this.disconnect();
    }
    /**
     * Stop the device stream and remove any remaining waveform drawing from
     * the wavesurfer canvas.
     */

  }, {
    key: "stop",
    value: function stop() {
      if (this.active) {
        // stop visualization and device
        this.stopDevice(); // empty last frame

        this.wavesurfer.empty();
      }
    }
    /**
     * Stop the device and the visualization.
     */

  }, {
    key: "stopDevice",
    value: function stopDevice() {
      this.active = false; // stop visualization

      this.disconnect(); // stop stream from device

      if (this.stream) {
        // MediaStream.stop is deprecated since:
        // - Firefox 44 (https://www.fxsitecompat.com/en-US/docs/2015/mediastream-stop-has-been-deprecated/)
        // - Chrome 45 (https://developers.google.com/web/updates/2015/07/mediastream-deprecations)
        if (this.browser.browser === "chrome" && this.browser.version >= 45 || this.browser.browser === "firefox" && this.browser.version >= 44 || this.browser.browser === "edge" || this.browser.browser === "safari") {
          if (this.stream.getTracks) {
            // note that this should not be a call
            this.stream.getTracks().forEach(function (stream) {
              return stream.stop();
            });
            return;
          }
        }

        this.stream.stop();
      }
    }
    /**
     * Connect the media sources that feed the visualization.
     */

  }, {
    key: "connect",
    value: function connect() {
      if (this.stream !== undefined) {
        // Create a local buffer for data to be copied to the Wavesurfer buffer for Edge
        if (this.browser.browser === "edge") {
          this.localAudioBuffer = this.micContext.createBuffer(this.numberOfInputChannels, this.bufferSize, this.micContext.sampleRate);
        } // Create an AudioNode from the stream.


        this.mediaStreamSource = this.micContext.createMediaStreamSource(this.stream);
        this.levelChecker = this.micContext.createScriptProcessor(this.bufferSize, this.numberOfInputChannels, this.numberOfOutputChannels);
        this.mediaStreamSource.connect(this.levelChecker);
        this.levelChecker.connect(this.micContext.destination);
        this.levelChecker.onaudioprocess = this.reloadBufferFunction;
      }
    }
    /**
     * Disconnect the media sources that feed the visualization.
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this.mediaStreamSource !== undefined) {
        this.mediaStreamSource.disconnect();
      }

      if (this.levelChecker !== undefined) {
        this.levelChecker.disconnect();
        this.levelChecker.onaudioprocess = undefined;
      }

      if (this.localAudioBuffer !== undefined) {
        this.localAudioBuffer = undefined;
      }
    }
    /**
     * Redraw the waveform.
     *
     * @param {object} event Audioprocess event
     */

  }, {
    key: "reloadBuffer",
    value: function reloadBuffer(event) {
      if (!this.paused) {
        this.wavesurfer.empty();

        if (this.browser.browser === "edge") {
          // copy audio data to a local audio buffer,
          // from https://github.com/audiojs/audio-buffer-utils
          var channel, l;

          for (channel = 0, l = Math.min(this.localAudioBuffer.numberOfChannels, event.inputBuffer.numberOfChannels); channel < l; channel++) {
            this.localAudioBuffer.getChannelData(channel).set(event.inputBuffer.getChannelData(channel));
          }

          this.wavesurfer.loadDecodedBuffer(this.localAudioBuffer);
        } else {
          this.wavesurfer.loadDecodedBuffer(event.inputBuffer);
        }
      }
    }
    /**
     * Audio input device is ready.
     *
     * @param {MediaStream} stream The microphone's media stream.
     */

  }, {
    key: "gotStream",
    value: function gotStream(stream) {
      this.stream = stream;
      this.active = true; // start visualization

      this.play(); // notify listeners

      this.fireEvent("deviceReady", stream);
    }
    /**
     * Device error callback.
     *
     * @param {string} code Error message
     */

  }, {
    key: "deviceError",
    value: function deviceError(code) {
      // notify listeners
      this.fireEvent("deviceError", code);
    }
    /**
     * Extract browser version out of the provided user agent string.
     * @param {!string} uastring userAgent string.
     * @param {!string} expr Regular expression used as match criteria.
     * @param {!number} pos position in the version string to be returned.
     * @return {!number} browser version.
     */

  }, {
    key: "extractVersion",
    value: function extractVersion(uastring, expr, pos) {
      var match = uastring.match(expr);
      return match && match.length >= pos && parseInt(match[pos], 10);
    }
    /**
     * Browser detector.
     * @return {object} result containing browser, version and minVersion
     *     properties.
     */

  }, {
    key: "detectBrowser",
    value: function detectBrowser() {
      // Returned result object.
      var result = {};
      result.browser = null;
      result.version = null;
      result.minVersion = null; // Non supported browser.

      if (typeof window === "undefined" || !window.navigator) {
        result.browser = "Not a supported browser.";
        return result;
      }

      if (navigator.mozGetUserMedia) {
        // Firefox
        result.browser = "firefox";
        result.version = this.extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
        result.minVersion = 31;
        return result;
      } else if (navigator.webkitGetUserMedia) {
        // Chrome/Chromium/Webview/Opera
        result.browser = "chrome";
        result.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
        result.minVersion = 38;
        return result;
      } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
        // Edge
        result.browser = "edge";
        result.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
        result.minVersion = 10547;
        return result;
      } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
        // Safari
        result.browser = "safari";
        result.minVersion = 11;
        result.version = this.extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
        return result;
      } // Non supported browser default.


      result.browser = "Not a supported browser.";
      return result;
    }
  }]);

  return MicrophonePlugin;
}();


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WaveSurfer/WaveSurfer.vue?vue&type=script&lang=js&








//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var WaveSurfervue_type_script_lang_js_ = ({
  name: "wave-surfer",
  data: function data() {
    return {
      wavesurfer: null,
      timeline: null,
      pointline: null,
      spectrogram: null,
      textGrid: null,
      isSpectrogramRendered: false,
      microphone: null,
      audioChunks: [],
      audioUrl: null
    };
  },
  props: {
    source: {
      validator: function validator(value) {
        var value_type = _typeof(value);

        if (value_type == "string") {
          return true;
        } else if (value_type == "object") {
          var class_string = toString.call(value);

          if (class_string == "[object HTMLVideoElement]") {
            return true;
          } else if (class_string == "[object HTMLAudioElement]") {
            return true;
          }
        }

        return false;
      },
      default: ""
    },
    showTextGrid: {
      type: Boolean,
      default: false
    },
    showTimeLine: {
      type: Boolean,
      default: false
    },
    showPointLine: {
      type: Boolean,
      default: false
    },
    showSpectrogram: {
      type: Boolean,
      default: false
    },
    rec: {
      type: Boolean,
      default: false
    },
    audioRate: {
      type: Number,
      default: 1
    },
    audioContext: {
      type: Object,
      default: function _default() {}
    },
    audioScriptProcessor: {
      type: Object,
      default: function _default() {}
    },
    autoCenter: {
      type: Boolean,
      default: true
    },
    backend: {
      type: String,
      default: "WebAudio"
    },
    backgroundColor: {
      type: String,
      default: ""
    },
    barGap: {
      validator: function validator(prop) {
        return typeof prop === "number" || prop === null;
      },
      default: null
    },
    barHeight: {
      type: Number,
      default: 1
    },
    barMinHeight: {
      validator: function validator(prop) {
        return typeof prop === "number" || prop === null;
      },
      default: null
    },
    barRadius: {
      type: Number,
      default: 0
    },
    barWidth: {
      validator: function validator(prop) {
        return typeof prop === "number" || prop === null;
      },
      default: null
    },
    closeAudioContext: {
      type: Boolean,
      default: false
    },
    cursorColor: {
      type: String,
      default: "#333"
    },
    cursorWidth: {
      type: Number,
      default: 1
    },
    drawingContextAttributes: {
      type: Object,
      default: function _default() {
        return {
          desynchronized: true
        };
      }
    },
    fillParent: {
      type: Boolean,
      default: true
    },
    forceDecode: {
      type: Boolean,
      default: false
    },
    freqRate: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: function _default() {
        if (this.showSpectrogram) {
          return 64;
        }

        return 128;
      }
    },
    hideScrollbar: {
      type: Boolean,
      default: false
    },
    interact: {
      type: Boolean,
      default: true
    },
    loopSelection: {
      type: Boolean,
      default: true
    },
    maxCanvasWidth: {
      type: Number,
      default: 4000
    },
    mediaControls: {
      type: Boolean,
      default: false
    },
    mediaType: {
      type: String,
      default: "audio"
    },
    minPxPerSec: {
      type: Number,
      default: 50
    },
    normalize: {
      type: Boolean,
      default: false
    },
    partialRender: {
      type: Boolean,
      default: false
    },
    pixelRatio: {
      type: Number,
      default: 1
    },
    progressColor: {
      type: String,
      default: "#555"
    },
    pointWidth: {
      type: Number,
      default: 1
    },
    points: {
      validator: function validator(value) {
        if (Array.isArray(value)) {
          var _iterator = _createForOfIteratorHelper(value),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var obj = _step.value;
              if (!("time" in obj)) return false;
              if (!("value" in obj)) return false;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return true;
        }

        return false;
      },
      default: function _default() {
        return [];
      }
    },
    removeMediaElementOnDestroy: {
      type: Boolean,
      default: true
    },
    responsive: {
      default: false
    },
    scrollParent: {
      type: Boolean,
      default: false
    },
    skipLength: {
      type: Number,
      default: 2
    },
    splitChannels: {
      type: Boolean,
      default: false
    },
    targetChannel: {
      type: Number,
      default: 0
    },
    waveColor: {
      type: String,
      default: "#999"
    },
    xhr: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  watch: {
    source: function source(val, old_val) {
      if (val != old_val) {
        this.load(val);
      }
    },
    audioRate: function audioRate(val, old_val) {
      if (val != old_val) this.updateDrawer("audioRate", val);
    },
    autoCenter: function autoCenter(val, old_val) {
      if (val != old_val) this.updateDrawer("autoCenter", val);
    },
    backgroundColor: function backgroundColor(val, old_val) {
      if (val != old_val) this.updateDrawer("backgroundColor", val);
    },
    barGap: function barGap(val, old_val) {
      if (val != old_val) this.updateDrawer("barGap", val);
    },
    barHeight: function barHeight(val, old_val) {
      if (val != old_val) this.updateDrawer("barHeight", val);
    },
    barMinHeight: function barMinHeight(val, old_val) {
      if (val != old_val) this.updateDrawer("barMinHeight", val);
    },
    barRadius: function barRadius(val, old_val) {
      if (val != old_val) {
        this.destroy();
        this.initWaveSurfer();
      }
    },
    barWidth: function barWidth(val, old_val) {
      if (val != old_val) {
        this.updateDrawer("barWidth", val);
      }
    },
    closeAudioContext: function closeAudioContext(val, old_val) {
      if (val != old_val) {
        this.updateDrawer("closeAudioContext", val);
      }
    },
    cursorColor: function cursorColor(val, old_val) {
      if (val != old_val) this.updateDrawer("cursorColor", val);
    },
    cursorWidth: function cursorWidth(val, old_val) {
      if (val != old_val) {
        this.destroy();
        this.initWaveSurfer();
      }
    },
    fillParent: function fillParent(val, old_val) {
      if (val != old_val) this.updateDrawer("fillParent", val);
    },
    forceDecode: function forceDecode(val, old_val) {
      if (val != old_val) this.updateDrawer("forceDecode", val);
    },
    freqRate: function freqRate(val, old_val) {
      if (this.showSpectrogram) {
        if (val != old_val) {
          this.spectrogram.params.freqRate = val;
          this.wavesurfer.fireEvent("redraw");
        }
      }
    },
    height: function height(val, old_val) {
      if (val != old_val) {
        this.destroy();
        this.initWaveSurfer();
      }
    },
    hideScrollbar: function hideScrollbar(val, old_val) {
      if (val != old_val) this.updateDrawer("hideScrollbar", val);
    },
    interact: function interact(val, old_val) {
      if (val != old_val) this.updateDrawer("interact", val);
    },
    loopSelection: function loopSelection(val, old_val) {
      if (val != old_val) this.updateDrawer("loopSelection", val);
    },
    maxCanvasWidth: function maxCanvasWidth(val, old_val) {
      if (val != old_val) this.updateDrawer("maxCanvasWidth", val);
    },
    mediaControls: function mediaControls(val, old_val) {
      if (val != old_val) this.updateDrawer("mediaControls", val);
    },
    mediaType: function mediaType(val, old_val) {
      if (val != old_val) this.updateDrawer("mediaType", val);
    },
    minPxPerSec: function minPxPerSec(val, old_val) {
      if (val != old_val) this.updateDrawer("minPxPerSec", val);
    },
    normalize: function normalize(val, old_val) {
      if (val != old_val) this.updateDrawer("normalize", val);
    },
    partialRender: function partialRender(val, old_val) {
      if (val != old_val) this.updateDrawer("partialRender", val);
    },
    pixelRatio: function pixelRatio(val, old_val) {
      if (val != old_val) this.updateDrawer("pixelRatio", val);
    },
    progressColor: function progressColor(val, old_val) {
      if (val != old_val) this.updateDrawer("progressColor", val);
    },
    removeMediaElementOnDestroy: function removeMediaElementOnDestroy(val, old_val) {
      if (val != old_val) this.updateDrawer("removeMediaElementOnDestroy", val);
    },
    responsive: function responsive(val, old_val) {
      if (val != old_val) this.updateDrawer("responsive", val);
    },
    scrollParent: function scrollParent(val, old_val) {
      if (val != old_val) this.updateDrawer("scrollParent", val);
    },
    skipLength: function skipLength(val, old_val) {
      if (val != old_val) this.updateDrawer("skipLength", val);
    },
    splitChannels: function splitChannels(val, old_val) {
      if (val != old_val) this.updateDrawer("splitChannels", val);
    },
    targetChannel: function targetChannel(val, old_val) {
      if (this.showSpectrogram) {
        if (val != old_val) {
          this.spectrogram.params.targetChannel = val;
          this.wavesurfer.fireEvent("redraw");
        }
      }
    },
    waveColor: function waveColor(val, old_val) {
      if (val != old_val) this.updateDrawer("waveColor", val);
    }
  },
  methods: {
    initWaveSurfer: function initWaveSurfer() {
      var _this = this;

      if (this.wavesurfer === null) {
        this.$nextTick(function () {
          var options = {
            container: _this.$refs.waveform,
            audioRate: _this.audioRate,
            audioContext: _this.audioContext,
            audioScriptProcessor: _this.audioScriptProcessor,
            autoCenter: _this.autoCenter,
            backend: _this.backend,
            backgroundColor: _this.backgroundColor,
            barGap: _this.barGap,
            barHeight: _this.barHeight,
            barMinHeight: _this.barMinHeight,
            barRadius: _this.barRadius,
            barWidth: _this.barWidth,
            closeAudioContext: _this.closeAudioContext,
            cursorColor: _this.cursorColor,
            cursorWidth: _this.cursorWidth,
            drawingContextAttributes: _this.drawingContextAttributes,
            fillParent: _this.fillParent,
            forceDecode: _this.forceDecode,
            height: _this.height,
            hideScrollbar: _this.hideScrollbar,
            interact: _this.interact,
            loopSelection: _this.loopSelection,
            maxCanvasWidth: _this.maxCanvasWidth,
            mediaControls: _this.mediaControls,
            mediaType: _this.mediaType,
            minPxPerSec: _this.minPxPerSec,
            normalize: _this.normalize,
            partialRender: _this.partialRender,
            pixelRatio: _this.pixelRatio,
            progressColor: _this.progressColor,
            removeMediaElementOnDestroy: _this.removeMediaElementOnDestroy,
            responsive: _this.responsive,
            scrollParent: _this.scrollParent,
            skipLength: _this.skipLength,
            splitChannels: _this.splitChannels,
            waveColor: _this.waveColor,
            xhr: _this.xhr
          };

          if (_this.rec) {
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

            if (isSafari) {
              var AudioContext = window.AudioContext || window.webkitAudioContext;
              options.audioContext = new AudioContext();
              options.audioScriptProcessor = _this.audioContext.createScriptProcessor(1024, 1, 1);
            }

            options.cursorWidth = 0;
            options.interact = false;
          }

          if (_this.$refs.waveform) {
            _this.wavesurfer = wavesurfer_WaveSurfer.create(options);

            _this.wavesurfer.on("audioprocess", _this.onAudioprocess);

            _this.wavesurfer.on("dblclick", _this.onDblClick);

            _this.wavesurfer.on("error", _this.onError);

            _this.wavesurfer.on("finish", _this.onFinish);

            _this.wavesurfer.on("interaction", _this.onInteraction);

            _this.wavesurfer.on("loading", _this.onLoading);

            _this.wavesurfer.on("mute", _this.onMute);

            _this.wavesurfer.on("pause", _this.onPause);

            _this.wavesurfer.on("play", _this.onPlay);

            _this.wavesurfer.on("ready", _this.onReady);

            _this.wavesurfer.on("scroll", _this.onScroll);

            _this.wavesurfer.on("seek", _this.onSeek);

            _this.wavesurfer.on("volume", _this.onVolume);

            _this.wavesurfer.on("waveform-ready", _this.onWaveformReady);

            _this.wavesurfer.on("zoom", _this.onZoom);

            if (_this.showTimeLine) {
              _this.timeline = timeline_TimelinePlugin.create({
                container: _this.$refs.timeline
              });

              _this.wavesurfer.addPlugin(_this.timeline).initPlugin("timeline");
            }

            if (_this.showSpectrogram) {
              _this.spectrogram = spectrogram_SpectrogramPlugin.create({
                labels: true,
                freqRate: _this.freqRate,
                targetChannel: _this.targetChannel,
                container: _this.$refs.spectrogram
              });

              _this.wavesurfer.addPlugin(_this.spectrogram).initPlugin("spectrogram");

              _this.wavesurfer.on("spectrogram-render-start", _this.onSpectrogramRenderStart);

              _this.wavesurfer.on("spectrogram-render-end", _this.onSpectrogramRenderEnd);
            }

            if (_this.showTextGrid) {
              _this.textgrid = textgrid_TextgridPlugin.create({
                container: _this.$refs.textgrid
              });

              _this.wavesurfer.addPlugin(_this.textgrid).initPlugin("textgrid");

              _this.wavesurfer.on("textgrid-dblclick", _this.onTextGridDblClick);

              _this.wavesurfer.on("textgrid-click", _this.onTextGridClick);

              _this.wavesurfer.on("textgrid-update", _this.onTextGridUpdate);

              _this.wavesurfer.on("textgrid-current-update", _this.onTextGridCurrentUpdate);
            }

            if (_this.showPointLine) {
              _this.pointline = pointline_PointlinePlugin.create({
                container: _this.$refs.pointline,
                points: _this.points,
                pointWidth: _this.pointWidth
              });

              _this.wavesurfer.addPlugin(_this.pointline).initPlugin("pointline");

              _this.wavesurfer.pointline.on("addPoint", function (point) {
                _this.$emit("addPoint", point);
              });

              _this.wavesurfer.pointline.on("updatePoint", function (point) {
                _this.$emit("updatePoint", point);
              });

              _this.wavesurfer.pointline.on("deletePoint", function (point) {
                _this.$emit("deletePoint", point);
              });
            }

            if (_this.rec) {
              _this.microphone = microphone_MicrophonePlugin.create({
                bufferSize: 4096,
                numberOfInputChannels: 1,
                numberOfOutputChannels: 1,
                constraints: {
                  video: false,
                  audio: true
                }
              });

              _this.wavesurfer.addPlugin(_this.microphone).initPlugin("microphone");

              _this.wavesurfer.microphone.on("deviceReady", function (stream) {
                var mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                mediaRecorder.addEventListener("dataavailable", function (event) {
                  _this.audioChunks.push(event.data);
                });
                mediaRecorder.addEventListener("stop", function () {
                  var audioBlob = new Blob(_this.audioChunks);
                  _this.audioUrl = URL.createObjectURL(audioBlob);

                  _this.downloadWave();
                });
              });

              _this.wavesurfer.microphone.on("deviceError", function (code) {
                _this.$emit("deviceError", code);
              });
            } else {
              if (_this.source) {
                _this.load(_this.source);
              }
            }
          }
        });
      }
    },
    updateDrawer: function updateDrawer(key, val) {
      if (this.wavesurfer) {
        this.wavesurfer.params[key] = val;
        this.wavesurfer.drawer.fireEvent("redraw");
      }
    },
    runWaveSurfer: function runWaveSurfer(func) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.wavesurfer) {
        if (args) {
          var _this$wavesurfer;

          return (_this$wavesurfer = this.wavesurfer)[func].apply(_this$wavesurfer, _toConsumableArray(args));
        } else {
          return this.wavesurfer[func]();
        }
      }

      return null;
    },
    addPoint: function addPoint(point) {
      this.wavesurfer.pointline.addPoint(point);
    },
    deletePoint: function deletePoint(id) {
      this.wavesurfer.pointline.deletePoint(id);
    },
    updatePoint: function updatePoint(id, point) {
      this.wavesurfer.pointline.updatePoint(id, point);
    },
    addTier: function addTier(key, type) {
      this.wavesurfer.textgrid.addTier(key, type);
    },
    updateTier: function updateTier(key, obj) {
      this.wavesurfer.textgrid.updateTier(key, obj);
    },
    deleteTier: function deleteTier(key) {
      this.wavesurfer.textgrid.deleteTier(key);
    },
    addTierValue: function addTierValue(key, obj) {
      this.wavesurfer.textgrid.addTierValue(key, obj);
    },
    setTierValue: function setTierValue(key, idx, text) {
      this.wavesurfer.textgrid.setTierValue(key, idx, text);
    },
    deleteTierValue: function deleteTierValue(key, idx) {
      this.wavesurfer.textgrid.deleteTierValue(key, idx);
    },
    loadTextGrid: function loadTextGrid(file) {
      this.wavesurfer.textgrid.loadTextGrid(file);
    },
    downloadTextGrid: function downloadTextGrid(filename) {
      this.wavesurfer.textgrid.downloadTextGrid(filename);
    },
    onAudioprocess: function onAudioprocess(e) {
      this.$emit("audioprocess", e);
    },
    onDblclick: function onDblclick(e) {
      this.$emit("dblclick", e);
    },
    onDestroy: function onDestroy(e) {
      this.$emit("destroy", e);
    },
    onError: function onError(e) {
      this.$emit("error", e);
    },
    onFinish: function onFinish(e) {
      this.$emit("finish", e);
    },
    onInteraction: function onInteraction(e) {
      this.$emit("interaction", e);
    },
    onLoading: function onLoading(e) {
      this.$emit("loading", e);
    },
    onMute: function onMute(e) {
      this.$emit("mute", e);
    },
    onPause: function onPause(e) {
      this.$emit("pause", e);
    },
    onPlay: function onPlay(e) {
      this.$emit("play", e);
    },
    onReady: function onReady(e) {
      this.$emit("ready", e);
    },
    onScroll: function onScroll(e) {
      this.$emit("scroll", e);
    },
    onSeek: function onSeek(e) {
      this.$emit("seek", e);
    },
    onTextGridClick: function onTextGridClick(e) {
      this.$emit("textgrid-click", e);
    },
    onTextGridDblClick: function onTextGridDblClick(e) {
      this.$emit("textgrid-dblclick", e);
    },
    onTextGridUpdate: function onTextGridUpdate(textgrid) {
      this.$emit("textgrid-update", textgrid);
    },
    onTextGridCurrentUpdate: function onTextGridCurrentUpdate(current) {
      this.$emit("textgrid-current-update", current);
    },
    onSpectrogramRenderEnd: function onSpectrogramRenderEnd(e) {
      this.isSpectrogramRendered = true;
      this.$emit("spectrogram-render-end", e);
    },
    onSpectrogramRenderStart: function onSpectrogramRenderStart(e) {
      this.isSpectrogramRendered = false;
      this.$emit("spectrogram-render-start", e);
    },
    onVolume: function onVolume(e) {
      this.$emit("volume", e);
    },
    onZoom: function onZoom(e) {
      this.$emit("zoom", e);
    },
    onWaveformReady: function onWaveformReady(e) {
      this.$emit("waveform-ready", e);
    },
    cancelAjax: function cancelAjax() {
      return this.runWaveSurfer("cancelAjax");
    },
    destroy: function destroy() {
      var res = this.runWaveSurfer("destroy");
      this.wavesurfer = null;
      this.onDestroy();
      return res;
    },
    empty: function empty() {
      return this.runWaveSurfer("empty");
    },
    getActivePlugins: function getActivePlugins() {
      return this.runWaveSurfer("getActivePlugins");
    },
    getBackgroundColor: function getBackgroundColor() {
      return this.runWaveSurfer("getBackgroundColor");
    },
    getCurrentTime: function getCurrentTime() {
      return this.runWaveSurfer("getCurrentTime");
    },
    getCursorColor: function getCursorColor() {
      return this.runWaveSurfer("getCursorColor");
    },
    getDuration: function getDuration() {
      return this.runWaveSurfer("getDuration");
    },
    getPlaybackRate: function getPlaybackRate() {
      return this.runWaveSurfer("getPlaybackRate");
    },
    getProgressColor: function getProgressColor() {
      return this.runWaveSurfer("getProgressColor");
    },
    getVolume: function getVolume() {
      return this.runWaveSurfer("getVolume");
    },
    getMute: function getMute() {
      return this.runWaveSurfer("getMute");
    },
    getFilters: function getFilters() {
      return this.runWaveSurfer("getFilters");
    },
    getWaveColor: function getWaveColor() {
      return this.runWaveSurfer("getCurrentTime");
    },
    exportPCM: function exportPCM(length, accuracy, noWindow, start) {
      var args = [length, accuracy, noWindow, start];
      return this.runWaveSurfer("exportPCM", args);
    },
    isPlaying: function isPlaying() {
      return this.runWaveSurfer("isPlaying");
    },
    load: function load(url, peaks, preload) {
      var args = [url, peaks, preload];
      var vm = this;
      setTimeout(function () {
        vm.runWaveSurfer("load", args);
      }, 1);
    },
    loadBlob: function loadBlob(url) {
      var args = [url];
      return this.runWaveSurfer("loadBlob", args);
    },
    on: function on(eventName, callback) {
      var args = [eventName, callback];
      return this.runWaveSurfer("on", args);
    },
    un: function un(eventName, callback) {
      var args = [eventName, callback];
      return this.runWaveSurfer("un", args);
    },
    unAll: function unAll() {
      return this.runWaveSurfer("unAll");
    },
    pause: function pause() {
      return this.runWaveSurfer("pause");
    },
    play: function play(start, end) {
      var args = [start, end];
      return this.runWaveSurfer("play", args);
    },
    playPause: function playPause() {
      return this.runWaveSurfer("playPause");
    },
    seekAndCenter: function seekAndCenter(progress) {
      return this.runWaveSurfer("seekAndCenter", [progress]);
    },
    seekTo: function seekTo(progress) {
      return this.runWaveSurfer("seekTo", [progress]);
    },
    setBackgroundColor: function setBackgroundColor(color) {
      return this.runWaveSurfer("setBackgroundColor", [color]);
    },
    setCursorColor: function setCursorColor(color) {
      return this.runWaveSurfer("setCursorColor", [color]);
    },
    setHeight: function setHeight(height) {
      return this.runWaveSurfer("setHeight", [height]);
    },
    setFilter: function setFilter(filters) {
      return this.runWaveSurfer("setFilter", [filters]);
    },
    setPlaybackRate: function setPlaybackRate(rate) {
      return this.runWaveSurfer("setPlaybackRate", [rate]);
    },
    setPlayEnd: function setPlayEnd(position) {
      return this.runWaveSurfer("setPlayEnd", [position]);
    },
    setVolume: function setVolume(newVolume) {
      return this.runWaveSurfer("setVolume", [newVolume]);
    },
    setMute: function setMute(mute) {
      return this.runWaveSurfer("mute", [mute]);
    },
    setProgressColor: function setProgressColor(color) {
      return this.runWaveSurfer("setProgressColor", [color]);
    },
    setWaveColor: function setWaveColor(color) {
      return this.runWaveSurfer("setWaveColor", [color]);
    },
    skip: function skip(offset) {
      return this.runWaveSurfer("skip", [offset]);
    },
    skipBackward: function skipBackward() {
      return this.runWaveSurfer("skipBackward");
    },
    skipForward: function skipForward() {
      return this.runWaveSurfer("skipForward");
    },
    setSinkId: function setSinkId(deviceId) {
      return this.runWaveSurfer("setSinkId", [deviceId]);
    },
    stop: function stop() {
      return this.runWaveSurfer("stop");
    },
    toggleMute: function toggleMute() {
      return this.runWaveSurfer("toggleMute");
    },
    toggleInteraction: function toggleInteraction() {
      return this.runWaveSurfer("toggleInteraction");
    },
    toggleScroll: function toggleScroll() {
      return this.runWaveSurfer("toggleScroll");
    },
    zoom: function zoom(pxPerSec) {
      return this.runWaveSurfer("zoom", [pxPerSec]);
    },
    recStart: function recStart() {
      if (this.rec) {
        if (this.wavesurfer) this.wavesurfer.microphone.start();
      }
    },
    recStop: function recStop() {
      if (this.rec) {
        if (this.wavesurfer) {
          if (this.wavesurfer.microphone.active) this.wavesurfer.microphone.stop();
        }
      }
    },
    downloadWave: function downloadWave() {
      var link = document.createElement("a");
      link.href = this.audioUrl;
      link.download = "rec.wav";
      link.click();
    }
  },
  mounted: function mounted() {
    this.initWaveSurfer();
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  }
});
// CONCATENATED MODULE: ./src/components/WaveSurfer/WaveSurfer.vue?vue&type=script&lang=js&
 /* harmony default export */ var WaveSurfer_WaveSurfervue_type_script_lang_js_ = (WaveSurfervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/WaveSurfer/WaveSurfer.vue





/* normalize component */

var component = normalizeComponent(
  WaveSurfer_WaveSurfervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "6b70233f",
  null
  
)

/* harmony default export */ var WaveSurfer_WaveSurfer = (component.exports);
// CONCATENATED MODULE: ./src/components/index.js


external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component("wave-surfer", WaveSurfer_WaveSurfer);
/* harmony default export */ var components = (WaveSurfer_WaveSurfer);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (components);



/***/ }),

/***/ "fb2c":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Uint32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "fea9":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global.Promise;


/***/ })

/******/ });
});
//# sourceMappingURL=wave-furfer.umd.js.map