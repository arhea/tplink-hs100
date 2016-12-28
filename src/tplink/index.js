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

    setInterval(self._refresh.bind(self), 30000);
  }

  getAll() {
    return _.values(this.plugs);
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

  update(plug) {
    const self = this;

    return plug.getInfo().then((data) => {
      return self._process(plug, data);
    });
  }

  _refresh() {
    const self = this;
    const plugs = self.plugs;

    _.forIn(plugs, (deviceInfo, deviceId) => {
      const plug = self.client.getPlug({ host: deviceInfo.connectionInfo.host });

      plug.getInfo().then((data) => {
        return self._process(plug, data);
      });
    });
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
