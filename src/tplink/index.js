'use strict';

const _      = require('lodash');
const tplink = require('hs100-api');

class TPLinkService {

  constructor() {
    const self = this;
    self.client = new tplink.Client();
    self.plugs = {};

    self.client.startDiscovery().on('plug-new', (plug) => {
      plug.getInfo().then((data) => {
        self._process(plug, data);
      });
    });
  }

  getAll() {
    const self = this;

    self.updateAll().then(() => {
      return _.values(self.plugs);
    })
  }

  getByDeviceId(deviceId) {
    const item = _.find(this.plugs, (plug) => {
      return plug.sysInfo.deviceId == deviceId;
    });

    if(item) {
      return this.client.getPlug({ host: item.connectionInfo.host });
    } else {
      return null;
    }
  }

  getByMac(mac) {
    const item = _.find(this.plugs, (plug) => {
      return plug.sysInfo.mac == mac;
    });

    if(item) {
      return this.client.getPlug({ host: item.connectionInfo.host });
    } else {
      return null;
    }
  }

  getByHost(host) {
    const item = _.find(this.plugs, (plug) => {
      return plug.connectionInfo.host == host;
    });

    if(item) {
      return this.client.getPlug({ host: item.connectionInfo.host });
    } else {
      return null;
    }
  }

  getInfoByDeviceId(deviceId) {
    const plug = this.getByDeviceId(deviceId);
    return client.updateByPlug(plug);
  }

  turnOnByDeviceId(deviceId) {
    const plug = this.getByDeviceId(deviceId);

    return plug.setPowerState(true).then(() => {
      return client.updateByPlug(plug);
    });
  }

  turnOffByDeviceId(deviceId) {
    const plug = this.getByDeviceId(deviceId);

    return plug.setPowerState(false).then(() => {
      return client.updateByPlug(plug);
    });
  }

  updateByPlug(plug) {
    const self = this;

    return plug.getInfo().then((data) => {
      return self._process(plug, data);
    });
  }

  updateByInfo(deviceInfo) {
    const plug = this.client.getPlug({ host: deviceInfo.connectionInfo.host });
    return this.updateByPlug(plug);
  }

  updateAll() {
    const self = this;

    const requests = _.map(self.plugs, function(deviceInfo, deviceId) {
      return self.updateByInfo(deviceInfo);
    });

    return Promise.all(requests);
  }

  _process(plug, data) {
    const self = this;

    data.connectionInfo = {
      host: plug.host,
      port: plug.ip || 9999
    };

    self.plugs[data.sysInfo.deviceId] = data;

    return data;
  }

}

exports.Create = function() {
  return new TPLinkService();
};
