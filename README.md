# TPLink Home Hub
This NodeJS server is a simple REST API to discover and interact with TPLink HS100 Smart Plugs.

## Installing
To get started, install Docker on a Raspberry Pi.

```bash
wget -qO- https://get.docker.com/ | sh
```

Pull and run the server

```bash
docker run -d --name tplink-hs100-hub \
  -p 3000:3000 \
  --restart always \
  --network host \
  arhea/tplink-hs100-hub:armhf
```

## Samsung SmartThings
1. Login to the [SmartThings IDE](https://graph-na02-useast1.api.smartthings.com)
2. Go to the "My SmartApps" page and click "Settings"
3. Add this repository to the list of repositories.
4. Select the TPLink Home Hub and add the script.
5. Go to the "My Device Handler" page and click "Updaet from Repo" and select the device type. Check the box that says publish.

## REST API
The following REST API is exposed by the service.

- `GET` - `/plugs` - List all the plugs on the network.
- `GET` - `/plugs/:deviceId` - Get information about a specific plug on the network.
- `GET` - `/plugs/:deviceId/on` - Turn the plug on.
- `GET` - `/plugs/:deviceId/off` - Turn the plug off.

## Thanks
Thanks to [hs100-api](https://github.com/plasticrake/hs100-api) that serves as the underpinning of this service.
