module.exports = {
    label: "All ubisys Devices",
    id: "allUbisysDevices",
    autoDiscoveryDeviceTypes: [],
    devices: [{
        label: "Gateway",
        id: "gateway",
        plugin: "ubisys/gateway",
        configuration: {ipAddress: "192.168.192.1", port: 5555},
        actors: [{
            "class": "Actor",
            "id": "outlet1",
            "label": "Outlet 1",
            "type": "outlet",
            "logLevel": "debug",
            "configuration": {
                "simulated": true,
                "zigBeeId": "1"
            }
        }, {
         "class": "Actor",
         "id": "switch1",
         "label": "Switch 1",
         "type": "switch",
         "logLevel": "debug",
         "configuration": {
         "simulated": true,
         "zigBeeId": "2"
         }
         }],
        sensors: [{
            "class": "Sensor",
            "id": "motionSensor1",
            "label": "Motion Sensor 1",
            "type": "motionSensor",
            "logLevel": "debug",
            "configuration": {
                "simulated": true,
                "zigBeeId": "3"
            }
        }, {
            "class": "Sensor",
            "id": "temperatureSensor1",
            "label": "Temperature Sensor 1",
            "type": "temperatureSensor",
            "logLevel": "debug",
            "configuration": {
                "simulated": true,
                "zigBeeId": "4"
            }
        }],
        logLevel: "debug"
    }],
    groups: [],
    services: [],
    eventProcessors: [],
    data: []
};
