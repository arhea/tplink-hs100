'use strict';

const express = require('express');
const tplink = require('./src/tplink');

const client = new tplink.Create();
const app = express();

app.get('/plugs', function (req, res) {
  res.send(client.getAll());
});

app.get('/plugs/:deviceId', function (req, res) {
  const plug = client.getByDeviceId(req.params.deviceId);

  client.update(plug).then((info) => {
    res.send(info);
  });
});

app.get('/plugs/:deviceId/on', function (req, res) {
  const plug = client.getByDeviceId(req.params.deviceId);

  plug.setPowerState(true).then(() => {
    return client.update(plug);
  }).then((info) => {
    res.send(info);
  });
});

app.get('/plugs/:deviceId/off', function (req, res) {
  const plug = client.getByDeviceId(req.params.deviceId);

  plug.setPowerState(false).then(() => {
    return client.update(plug);
  }).then((info) => {
    res.send(info);
  });
});

app.listen(3000);
