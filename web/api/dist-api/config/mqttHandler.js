"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mqtt = _interopRequireDefault(require("mqtt"));

var host = 'mqtt://mqtt:8883';

var MQTTHandler = /*#__PURE__*/function () {
  function MQTTHandler(topic) {
    (0, _classCallCheck2["default"])(this, MQTTHandler);
    this.mqttClient = null, this.topic = topic;
  }

  (0, _createClass2["default"])(MQTTHandler, [{
    key: "connect",
    value: function connect() {
      var _this = this;

      this.mqttClient = _mqtt["default"].connect(host);
      this.mqttClient.on('error', function (e) {
        console.log(e);

        _this.mqttClient.end();
      });
      this.mqttClient.on('connect', function () {
        console.log('MQTT Client Connected');
      });
      this.topic ? this.subscribe() : null;
      this.mqttClient.on('message', function (topic, message) {
        console.log('topic: ', topic);
        console.log('message: ', message.toString());
      });
      this.mqttClient.on('close', function () {
        console.log('MQTT connection closed');
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(topic) {
      this.topic = this.topic === null ? topic : this.topic;
      this.mqttClient.subscribe(topic || this.topic, {
        qos: 0
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(message) {
      this.mqttClient.publish(this.topic, message);
    }
  }]);
  return MQTTHandler;
}();

exports["default"] = MQTTHandler;