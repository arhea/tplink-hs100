# TPLink Home Hub
This NodeJS server is a simple REST API to discover and interact with TPLink HS100 Smart Plugs.

## Installing
To get started, install NodeJS on a Raspberry Pi.

```bash
wget https://nodejs.org/dist/v6.9.2/node-v6.9.2-linux-armv7l.tar.xz
tar -xvf node-v6.9.2-linux-armv7l.tar.xz
cd node-v6.9.2-linux-armv7l
sudo cp -R * /usr/local/
```

Clone this repository to a folder and run the server.

```bash
git clone git@github.com:arhea/tplink-hs100.git
cd tplink-hs100
npm start
```

## Samsung SmartThings

## REST API
The following REST API is exposed by the service.

- `GET` - `/plugs` - List all the plugs on the network.
- `GET` - `/plugs/:deviceId` - Get information about a specific plug on the network.
- `GET` - `/plugs/:deviceId/on` - Turn the plug on.
- `GET` - `/plugs/:deviceId/off` - Turn the plug off.

## Thanks
Thanks to [hs100-api](https://github.com/plasticrake/hs100-api) that serves as the underpinning of this service.
