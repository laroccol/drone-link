"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _socket = _interopRequireDefault(require("socket.io"));

var _http = _interopRequireDefault(require("http"));

var _index = _interopRequireDefault(require("./routes/index"));

var _rest = _interopRequireDefault(require("./routes/database/rest"));

var _userHandler = _interopRequireDefault(require("./routes/database/userHandler"));

var _rest2 = _interopRequireDefault(require("./routes/mqtt/rest"));

var _connect = require("./lib/connect");

var _mqttHandler = _interopRequireDefault(require("./config/mqttHandler"));

var app = (0, _express["default"])();
var port = 3000;

var server = _http["default"].createServer(app);

var io = (0, _socket["default"])(server);
app.use(_connect.connect);
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../../static/dist')));
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
var mqttClient = new _mqttHandler["default"]('test');
mqttClient.connect();
io.on('connect', function (socket) {});
/**
 * Route Handling
 */

app.use('/', _index["default"]);
app.use('/database', _rest["default"]);
app.use('/mqtt', _rest2["default"].sendMessage(mqttClient)); //Serves the static react bundle on any route that is not an API call

app.use(function (req, res, next) {
  res.sendFile(_path["default"].join(__dirname, '../../static/dist/index.html'));
});
app.use(_connect.close);
app.listen(port, function () {
  return console.log("Server Luanched on port: ".concat(port));
});