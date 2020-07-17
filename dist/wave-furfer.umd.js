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

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


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

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d7f3097c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WaveSurfer/WaveSurfer.vue?vue&type=template&id=96ca9746&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{ref:"waveform"}),_c('div',{ref:"timeline"})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WaveSurfer/WaveSurfer.vue?vue&type=template&id=96ca9746&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

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

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

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
      this.seekTo(start);
      var promise = this.media.play();
      end && this.setPlayEnd(end);
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


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WaveSurfer/WaveSurfer.vue?vue&type=script&lang=js&



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
      options: {}
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
    showTimeLine: {
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
    height: {
      type: Number,
      default: 128
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
      console.log("watch-source", val);

      if (val != old_val) {
        this.load(val);
      }
    }
  },
  methods: {
    initWaveSurper: function initWaveSurper() {
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

          if (_this.$refs.waveform) {
            _this.wavesurfer = wavesurfer_WaveSurfer.create(options);

            if (_this.showTimeLine) {
              _this.wavesurfer.addPlugin(timeline_TimelinePlugin.create({
                container: _this.$refs.timeline
              })).initPlugin("timeline");
            }

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
          }

          if (_this.source) {
            _this.load(_this.source);
          }
        });
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
      return this.runWaveSurfer("load", args);
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
    }
  },
  mounted: function mounted() {
    this.initWaveSurper();
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
  "96ca9746",
  null
  
)

/* harmony default export */ var WaveSurfer_WaveSurfer = (component.exports);
// CONCATENATED MODULE: ./src/components/index.js


external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component("wave-surfer", WaveSurfer_WaveSurfer);
/* harmony default export */ var components = (WaveSurfer_WaveSurfer);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (components);



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


/***/ })

/******/ });
});
//# sourceMappingURL=wave-furfer.umd.js.map