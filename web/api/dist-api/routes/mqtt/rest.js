"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var sendMessage = function sendMessage(client) {
  return router.post('/message', function (req, res) {
    client.sendMessage(req.body.message);
    res.status(200).send('Message sent to MQTT');
  });
};

var _default = {
  sendMessage: sendMessage
};
exports["default"] = _default;