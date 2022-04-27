"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _rethinkdb = _interopRequireDefault(require("rethinkdb"));

var _database = require("../config/database");

var _database2 = require("../utils/database");

var router = _express["default"].Router();

router.get('/create', function (req, res) {
  _rethinkdb["default"].dbCreate(_database.database).run(req._rdb);

  console.log("Database ".concat(_database.database, " created"));

  _rethinkdb["default"].db(_database.database).tableCreate('test_table').run(req._rdb);

  console.log("Table test_table created");
  res.json({
    title: 'Rethink',
    message: 'Sucessfully created DB and Table'
  });
});
router.get('/users', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {
              first: 'Bob',
              last: 'Tom',
              DOB: '1111'
            }; // createDatabase('stream_example', req);
            // createTable('stream_example', 'test', req);

            (0, _database2.insert)('stream_example', 'users', data, req); // const users = await getData('ttt', 'ttt', req);

            res.json({
              users: users
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = router;