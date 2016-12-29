'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const tplink     = require('./src/tplink');
const logger     = require('./src/config/logger');

const client = new tplink.Create();
const app = express();

logger.info('[API] - registering middleware');
app.use(bodyParser.json());
app.use(morgan('combined'));
logger.info('[API] - completed registering middleware');

app.get('/plugs', function (req, res) {
  logger.info('[API][Plugs][List]  - list all plugs on network');

  client.getAll().then((plugs) => {
    res.send(plugs);
  });
});

app.get('/plugs/:deviceId', function (req, res) {
  logger.info('[API][Plugs][Info]  - get device info', req.params.deviceId);

  client.getInfoByDeviceId(req.params.deviceId).then((info) => {
    res.send(info);
  });
});

app.get('/plugs/:deviceId/on', function (req, res) {
  logger.info('[API][Plugs][On]  - turn on device', req.params.deviceId);

  client.turnOnByDeviceId(req.params.deviceId).then((info) => {
    res.send(info);
  });
});

app.get('/plugs/:deviceId/off', function (req, res) {
  logger.info('[API][Plugs][Off] - turn off device', req.params.deviceId);

  client.turnOffByDeviceId(req.params.deviceId).then((info) => {
    res.send(info);
  });
});

app.listen(3000, () => {
  logger.info('[API] - listening on port 3000');
});
