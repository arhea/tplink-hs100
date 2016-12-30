'use strict';

const _      = require('lodash');
const tplink = require('hs100-api');
const logger = require('../config/logger');

class TPLinkService {

  constructor() {
    const self = this;
    self.client = new tplink.Client();
    self.plugs = {};

    logger.info('[TPLINK] - starting discovery...');

    self.client.startDiscovery().on('plug-new', (plug) => {
      logger.info('[TPLINK] - found plug', plug);
      self.updateByPlug(plug);
    });
  }

  getAll() {
    const self = this;

    logger.info('[TPLINK] - list all plugs');

    return self.updateAll().then(() => {
      logger.debug('[TPLINK] - list all plugs', self.plugs);
      return _.values(self.plugs);
    })
  }

  getByDeviceId(deviceId) {
    logger.info('[TPLINK] - get device by id', deviceId);

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
    logger.info('[TPLINK] - get device by MAC address', mac);

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
    logger.info('[TPLINK] - get device by hostname', host);

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
    logger.info('[TPLINK] - get device info by device id', deviceId);

    const plug = this.getByDeviceId(deviceId);
    return this.updateByPlug(plug);
  }

  turnOnByDeviceId(deviceId) {
    logger.info('[TPLINK] - turn on plug by device id', deviceId);

    const self = this;
    const plug = this.getByDeviceId(deviceId);

    return plug.setPowerState(true).then(() => {
      return self.updateByPlug(plug);
    });
  }

  turnOnByMac(mac) {
    logger.info('[TPLINK] - turn on plug by mac', mac);

    const self = this;
    const plug = this.getByMac(mac);

    return plug.setPowerState(true).then(() => {
      return self.updateByPlug(plug);
    });
  }

  turnOnByHost(host) {
    logger.info('[TPLINK] - turn on plug by host', host);

    const self = this;
    const plug = this.getByHost(host);

    return plug.setPowerState(true).then(() => {
      return self.updateByPlug(plug);
    });
  }

  turnOffByDeviceId(deviceId) {
    logger.info('[TPLINK] - turn off plug by device id', deviceId);

    const self = this;
    const plug = this.getByDeviceId(deviceId);

    return plug.setPowerState(false).then(() => {
      return self.updateByPlug(plug);
    });
  }

  turnOffByMac(mac) {
    logger.info('[TPLINK] - turn off plug by mac', mac);

    const self = this;
    const plug = this.getByMac(mac);

    return plug.setPowerState(false).then(() => {
      return self.updateByPlug(plug);
    });
  }

  turnOffByHost(host) {
    logger.info('[TPLINK] - turn off plug by host', host);

    const self = this;
    const plug = this.getByHost(host);

    return plug.setPowerState(false).then(() => {
      return self.updateByPlug(plug);
    });
  }

  updateByPlug(plug) {
    logger.info('[TPLINK] - update plug information by plug', plug);

    const self = this;

    return plug.getInfo().then((data) => {
      return self._process(plug, data);
    });
  }

  updateByInfo(deviceInfo) {
    logger.info('[TPLINK] - update plug information by info', deviceInfo);

    const plug = this.client.getPlug({ host: deviceInfo.connectionInfo.host });
    return this.updateByPlug(plug);
  }

  updateAll() {
    logger.info('[TPLINK] - update all plugs');

    const self = this;

    const requests = _.map(self.plugs, function(deviceInfo, deviceId) {
      return self.updateByInfo(deviceInfo);
    });

    return Promise.all(requests);
  }

  _process(plug, data) {
    logger.info('[TPLINK] - process plug info');

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
