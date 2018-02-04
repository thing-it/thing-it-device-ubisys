# thing-it-device-ubisys

[![NPM](https://nodei.co/npm/thing-it-device-ubisys.png)](https://nodei.co/npm/thing-it-device-ubisys/)
[![NPM](https://nodei.co/npm-dl/thing-it-device-ubisys.png)](https://nodei.co/npm/thing-it-device-ubisys/)

Device Plugins for [[thing-it-node]](https://github.com/marcgille/thing-it-node) and [thing-it.com](wwww.thing-it.com) for ZigBee devices connected to the ubisys (http://www.ubisys.com/) platform.

<a href="./documentation/images/g1.png"><img src="./documentation/images/g1.png" width="50%" height="50%"></a>

## Installation and Configuration

### Installation of NodeJS and [thing-it-node]

First, install [nodejs](https://nodejs.org/en/download/) on your computer (e.g. your PC or your Raspberry Pi).

Then install **[thing-it-node]** via

```
npm install -g thing-it-node
```
 
### Initialization and Start of [thing-it-node] 

The **[thing-it-device-ubisys]** Plugin is installed with **[thing-it-node]**, hence there is no need to install it separately.

The Plugin supports Autodiscovery, hence you only have to create a directory in which you intend to run the configuration, e.g.
 
```
mkdir ~/ubisys-test
cd ~/ubisys-test
```

and invoke

```
tin init
```

and then start **[thing-it-node]** via

```
tin run
```

Install the **[thing-it] Mobile App** from the Apple Appstore or Google Play and set it up to connect to **[thing-it-node]** 
locally as described [here](https://thing-it.com/thing-it/#/documentationPanel/mobileClient/connectionModes) or just connect your browser under 
[http://localhost:3001](http://localhost:3001).
 
### ubisys Device Setup

Connect your **ubisys** Gateway to the same Ethernet network as the **[thing-it-node]** Gateway you have configured above 
and connect all ubisys Devices to it.

On the **[thing-it] Mobile App** or in the browser, confirm the registration of the ubisys Devices -
you will be able monitor and control these from the **[thing-it] Mobile App** immediately.

## Mobile UI

The following screenshot shows the Node Page of the [sample configuration]("./examples.configuration"):

<a href="./documentation/images/mobile-ui.png"><img src="./documentation/images/mobile-ui.png" width="50%" height="50%"></a>

## Where to go from here ...

After completing the above, you may be interested in

* Connecting additional [Devices](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/deviceConfiguration) and configuring
[Groups](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/groupConfiguration), 
[Services](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/serviceConfiguration), 
[Event Processing](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/eventConfiguration), 
[Storyboards](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/storyboardConfiguration) and 
[Jobs](https://www.thing-it.com/thing-it/#/documentationPanel/mobileClient/jobConfiguration) via your **[thing-it] Mobile App**.
* Use [thing-it.com](https://www.thing-it.com) to safely connect your Gateway Computer from everywhere, manage complex configurations, store and analyze historical data 
* Explore other Device Plugins like [Texas Instruments Sensor Tag](https://www.npmjs.com/package/thing-it-device-ti-sensortag), [Philips Hue Lighting](https://www.npmjs.com/package/thing-it-device-philips-hue) and many more. For a full set of 
Device Plugins search for **thing-it-device** on [npm](https://www.npmjs.com/). Or [write your own Plugins](https://github.com/marcgille/thing-it-node/wiki/Plugin-Development-Concepts).