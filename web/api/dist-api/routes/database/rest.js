"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _database = require("../../utils/database");

var router = _express["default"].Router();

router.post('/dbcreate', function (req, res) {
  var response = (0, _database.createDatabase)(req.body.name, req);
  res.json({
    response: response.message
  });
});
router.post('/tablecreate', function (req, res) {
  var response = (0, _database.createTable)(req.body.database, req.body.name, req);
  res.json({
    response: response
  });
});
router.post('/insert', function (req, res) {
  var response = (0, _database.insert)(req.body.database, req.body.tablename, JSON.parse(req.body.data), req);
  res.json({
    response: response.message
  });
});
router.post('/getall', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _database.getData)(req.body.database, req.body.tablename, req);

          case 2:
            response = _context.sent;
            response.data.toArray(function (e, r) {
              return res.json({
                result: r
              });
            });

          case 4:
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