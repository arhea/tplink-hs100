'use strict';

const express = require('express');
const tplink = require('./src/tplink');

const client = new tplink.Create();
const app = express();

app.get('/plugs', function (req, res) {
  console.log('[API] - List all plugs on network.');
  res.send(client.getAll());
});

app.get('/plugs/:deviceId', function (req, res) {
  console.log('[API] - Get Device Info:', req.params.deviceId);

  const plug = client.getByDeviceId(req.params.deviceId);

  client.update(plug).then((info) => {
    res.send(info);
  });
});

app.get('/plugs/:deviceId/on', function (req, res) {
  console.log('[API] - Turn On Device:', req.params.deviceId);

  const plug = client.getByDeviceId(req.params.deviceId);

  plug.setPowerState(true).then(() => {
    return client.update(plug);
  }).then((info) => {
    res.send(info);
  });
});

app.get('/plugs/:deviceId/off', function (req, res) {
  console.log('[API] - Turn Off Device:', req.params.deviceId);

  const plug = client.getByDeviceId(req.params.deviceId);

  plug.setPowerState(false).then(() => {
    return client.update(plug);
  }).then((info) => {
    res.send(info);
  });
});

app.listen(3000);
console.log('[API] - Listening on port 3000...');
