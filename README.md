# TPLink HS100 Home Hub (Unofficial)
This NodeJS server is a simple REST API to discover and interact with [TPLink HS100 Smart Plugs](http://www.tp-link.com/us/products/details/cat-5516_HS100.html) that runs on a [Raspberry Pi](https://www.amazon.com/CanaKit-Raspberry-Complete-Starter-Kit/dp/B01C6Q2GSY/) on your home network. This hub interacts over REST API and also comes with a [Samsung SmartThings](https://www.smartthings.com/) Integration.

## Getting Started
To get started, plugin your Raspberry Pi to the network that your plugs are connected to. Setup your Switches using the TPLink Kasa app. Next, install Docker on the Raspberry Pi.

```bash
apt-get update -y && apt-get upgrade -y && apt-get install wget -y
wget -qO- https://get.docker.com/ | sh
sudo usermod pi -aG docker
```

Once Docker is installed, it is time to run the hub. The following Docker commands are all you need to get started.

```bash
docker pull arhea/tplink-hs100-hub:armhf

docker run -d --name tplink-hs100-hub \
  -p 3000:3000 \
  --restart always \
  --network host \
  arhea/tplink-hs100-hub:armhf
```

Now, visit the `http://<ip address of pi>:3000/plugs` and you should see all of your plugs listed. New plugs will automatically be discovered once they are configured using the Kasa app.

## Samsung SmartThings Integration
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
