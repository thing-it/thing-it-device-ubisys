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
                label: "IP Address",
                id: "ipAddress",
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

