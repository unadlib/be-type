/* be-type version 1.0.0 */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



























var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var CheckType = function () {
  function CheckType() {
    classCallCheck(this, CheckType);
  }

  createClass(CheckType, [{
    key: 'Function',
    value: function Function(value) {
      return typeof value === 'function';
    }
  }, {
    key: 'Object',
    value: function Object(value) {
      return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
    }
  }, {
    key: 'String',
    value: function String(value) {
      return be.string(value) && typeof value === 'string';
    }
  }, {
    key: 'Number',
    value: function Number(value) {
      return be.number(value) && typeof value === 'number';
    }
  }, {
    key: 'Boolean',
    value: function Boolean(value) {
      return be.boolean(value) && typeof value === 'boolean';
    }
  }, {
    key: 'NaN',
    value: function NaN(value) {
      return be.number(value) && isNaN(value);
    }
  }, {
    key: 'Nil',
    value: function Nil(value) {
      return be.undefined(value) || be.null(value);
    }
  }, {
    key: 'Empty',
    value: function Empty(value) {
      return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !be.null(value) && Object.keys(value).length === 0 || be.Boolean(value) || be.Function(value) || be.Nil(value) || value === '' || value === 0;
    }
  }, {
    key: 'Infinity',
    value: function (_Infinity) {
      function Infinity(_x) {
        return _Infinity.apply(this, arguments);
      }

      Infinity.toString = function () {
        return _Infinity.toString();
      };

      return Infinity;
    }(function (value) {
      return Infinity === value;
    })
  }, {
    key: 'Finite',
    value: function Finite(value) {
      return be.Number(value) && !be.Infinity(value) && !be.NaN(value);
    }
  }, {
    key: 'Native',
    value: function Native(value) {
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reRegExpCharFn = /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g;
      var reIsNative = RegExp('^' + Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(reRegExpChar, '\\$&').replace(reRegExpCharFn, '$1.*?') + '$');
      return be.Function(value) && reIsNative.test(value);
    }
  }, {
    key: 'SafeInteger',
    value: function SafeInteger(value) {
      return Number.isInteger(value) && value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER;
    }
  }, {
    key: 'Integer',
    value: function Integer(value) {
      return Number.isInteger(value);
    }
  }, {
    key: 'Element',
    value: function Element(value) {
      return be.Object(value) && !be.object(value) && value.nodeType === 1;
    }
  }]);
  return CheckType;
}();

var setBe = function setBe() {
  var setting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return new Proxy({}, {
    get: function get$$1(target, name) {
      return function (value) {
        var checkType = new CheckType();
        var transform = {};
        Object.entries(setting).forEach(function (_ref) {
          var _ref2 = slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          var name = key[0].toUpperCase() + key.slice(1);
          transform[name] = value;
        });
        Object.assign(checkType, transform);
        var check = checkType[name];
        if (check) {
          return check(value);
        }
        var type = Object.prototype.toString.call(value).slice(8, -1);
        return type[0].toLowerCase() + type.slice(1) === name;
      };
    }
  });
};

var be = setBe();

export { setBe };
export default be;
/* follow be-type on Github! git+https://github.com/unadlib/be-type.git */
//# sourceMappingURL=index.js.map
