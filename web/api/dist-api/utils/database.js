"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribe = exports.getData = exports.insert = exports.createTable = exports.createDatabase = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rethinkdb = _interopRequireDefault(require("rethinkdb"));

var _database = require("../config/database");

var createDatabase = function createDatabase(name, req) {
  _rethinkdb["default"].dbCreate(name).run(req._rdb)["catch"](function (e) {
    return {
      message: handleErrors(e)
    };
  });

  return {
    message: 'Successfully Created Database'
  };
};

exports.createDatabase = createDatabase;

var createTable = function createTable(database, name, req) {
  _rethinkdb["default"].db(database).tableCreate(name).run(req._rdb)["catch"](function (e) {
    return {
      message: handleErrors(e)
    };
  });

  return {
    message: 'Successfully Created Table'
  };
};

exports.createTable = createTable;

var insert = function insert(database, tableName, data, req) {
  _rethinkdb["default"].db(database).table(tableName).insert(data).run(req._rdb)["catch"](function (e) {
    return {
      message: handleErrors(e)
    };
  });

  return {
    message: "Succesfully Inserted into Table: ".concat(tableName)
  };
};

exports.insert = insert;

var getData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(database, tableName, req) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _rethinkdb["default"].db(database).table(tableName).run(req._rdb);

          case 3:
            data = _context.sent;
            return _context.abrupt("return", {
              data: data,
              message: 'Successfully Retrieved Data'
            });

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {
              data: null,
              message: handleErrors(_context.t0)
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getData = getData;

var subscribe = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(database, tableName, req) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _rethinkdb["default"].db(database).table(tableName).changes().run(req._rdb);

          case 3:
            data = _context2.sent;
            return _context2.abrupt("return", {
              data: data,
              message: 'Sucessfully Updated Data'
            });

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", {
              data: null,
              message: handleErrors(_context2.t0)
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function subscribe(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.subscribe = subscribe;

var handleErrors = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(type) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = type.constructor.name;
            _context3.next = _context3.t0 === 'ReqlOpFailedError' ? 3 : 4;
            break;

          case 3:
            return _context3.abrupt("return", "Operation Error: ".concat(type.msg));

          case 4:
            console.log('This error is not handled, please add it for ', type.constructor.name);
            console.error(type.stack);
            return _context3.abrupt("break", 7);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function handleErrors(_x7) {
    return _ref3.apply(this, arguments);
  };
}();