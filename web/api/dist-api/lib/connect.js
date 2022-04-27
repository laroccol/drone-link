"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.close = exports.connect = void 0;

var _rethinkdb = _interopRequireDefault(require("rethinkdb"));

var _database = require("../config/database");

var connect = function connect(req, res, next) {
  var count = 0;

  _rethinkdb["default"].connect({
    host: _database.host,
    port: _database.port
  }, function (e, connection) {
    if (e && e.name === 'ReqlDriverError' && e.message.indexOf('Could not connect') === 0 && ++count < 31) {
      console.log(e);
      return;
    }

    req._rdb = connection;
    next();
  });
};

exports.connect = connect;

var close = function close(req, res, next) {
  req._rdb.close();
};

exports.close = close;