module.exports = {
    metadata: {
        family: 'ubisys',
        plugin: 'gateway',
        label: 'ubisys G1 — ZigBee/Ethernet Gateway',
        manufacturer: 'ubisys technologies GmbH',
        discoverable: true,
        additionalSoftware: [],
        actorTypes: [],
        sensorTypes: [],
        services: [],
        configuration: [
            {
                label: "Host",
                id: "host",
                type: {
                    id: "string"
                },
                defaultValue: "192.168.192.1"
            }, {
                label: "Port",
                id: "port",
                type: {
                    id: "integer"
                },
                defaultValue: 55555
            }, {
                label: "ZigBee Network",
                id: "zigBeeNetwork",
                type: {
                    id: "string"
                }
            }
        ]
    },
    create: function () {
        return new Gateway();
    },
    discovery: function () {
        return new GatewayDiscovery();
    }
};

var q = require('q');

/**
 *
 * @constructor
 */
function GatewayDiscovery() {
    /**
     *
     * @param options
     */
    GatewayDiscovery.prototype.start = function () {
        if (this.isSimulated()) {
            this.timer = setInterval(function () {
            }.bind(this), 20000);
        } else {
            this.logLevel = 'debug';
        }
    };

    /**
     *
     * @param options
     */
    GatewayDiscovery.prototype.stop = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }

    };
}

/**
 *
 * @constructor
 */
function Gateway() {
    /**
     *
     */
    Gateway.prototype.start = function () {
        var deferred = q.defer();

        if (this.isSimulated()) {
            this.logDebug("Starting ubisys G1 in simulated mode.");

            deferred.resolve();
        } else {
            this.adapter = new Adapter().initialize(this.configuration.host, this.configuration.port);

            this.logDebug('Adapter initialized.');

            deferred.resolve();
        }

        return deferred.promise;
    };

    /**
     *
     */
    Gateway.prototype.stop = function () {
        var deferred = q.defer();

        if (this.isSimulated()) {
            this.logDebug("Stopping ubisys G1 in simulated mode.");
        } else {
        }

        deferred.resolve();

        return deferred.promise;
    };

    /**
     *
     */
    Gateway.prototype.getState = function () {
        return {};
    };

    /**
     *
     */
    Gateway.prototype.setState = function () {
    };
}

function Adapter() {
    Adapter.prototype.initialize = function (host, port) {
        if (!this.request) {
            this.request = require('request-json');
        }

        this.client = this.request.createClient('http://' + host + ':' + port + '/');

        // Initialize Websocket

        this.listeners = [];

        const WebSocket = require('ws');

        this.ws = new WebSocket('ws://' + host + ':' + port + '/events');

        this.ws.on('open', () => {
            console.log('>>> Connection to g1 opened');
        });

        this.ws.on('message', data => {
            for (const listener of this.listeners) {
                listener(data);
            }
        });

        return this;
    }

    /**
     *
     */
    Adapter.prototype.getNodeState = function (nodeId) {
        var deferred = q.defer();

        this.client.get('nodes/' + nodeId, function (err, res, body) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(body);
            }
        });

        return deferred.promise;
    };

    /**
     *
     */
    Adapter.prototype.invokeNodeService = function (nodeId, serviceId) {
        var deferred = q.defer();

        this.client.post('nodes/' + nodeId + '/services/' + serviceId, function (err, res, body) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(body);

                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    /**
     *
     */
    Adapter.prototype.registerListener = function (callback) {
        this.listeners.push(callback);
    };
}

