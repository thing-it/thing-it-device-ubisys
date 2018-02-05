module.exports = {
    label: "All ubisys Devices",
    id: "allUbisysDevices",
    autoDiscoveryDeviceTypes: [],
    devices: [{
        label: "Gateway",
        id: "gateway",
        plugin: "ubisys/gateway",
        configuration: {host: "localhost", port: 3335},
        actors: [{
            "class": "Actor",
            "id": "outlet1",
            "label": "Outlet 1",
            "type": "outlet",
            "logLevel": "debug",
            "configuration": {
                "zigBeeId": "1"
            }
        }, {
         "class": "Actor",
         "id": "switch1",
         "label": "Switch 1",
         "type": "switch",
         "logLevel": "debug",
         "configuration": {
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
                "zigBeeId": "3"
            }
        }, {
            "class": "Sensor",
            "id": "temperatureSensor1",
            "label": "Temperature Sensor 1",
            "type": "temperatureSensor",
            "logLevel": "debug",
            "configuration": {
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
