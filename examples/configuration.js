module.exports = {
    label: "All ubisys Devices",
    id: "allubisysDevices",
    autoDiscoveryDeviceTypes: [{
        plugin: "plugwise/switch",
        confirmRegistration: true,
        persistRegistration: false,
        defaultConfiguration: {},
        options: {}
    }],
    devices: [{
        label: "Switch",
        id: "switch",
        plugin: "plugwise/switch",
        configuration: {stretch: "srvfszsv", host: "192.168.1.13", id: "3BBB33A"},
        actors: [],
        sensors: [],
        logLevel: "debug"
    }],
    groups: [],
    services: [],
    eventProcessors: [],
    data: []
};
