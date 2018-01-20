module.exports = {
    metadata: {
        plugin: "pirSensor",
        label: "ubisys PIR Sensor",
        role: "sensor",
        family: "pirSensor",
        deviceTypes: ["ubisys/gateway"],
        services: [],
        state: [{
            label: "Occupancy",
            id: "occupancy",
            type: {
                id: "integer"
            }
        }],
        configuration: [{
            label: "Name",
            id: "name",
            type: {
                id: "string"
            }
        }, {
            label: "Threshold",
            id: "threshold",
            type: {
                id: "integer"
            }
        }]
    },
    create: function () {
        return new PirSensor();
    }
};

var q = require('q');

/**
 *
 */
function PirSensor() {
    /**
     *
     */
    PirSensor.prototype.start = function () {
        var deferred = q.defer();

        this.state = {occupancy: 1};

        if (!this.isSimulated()) {
            deferred.resolve();
        }
        else {
            deferred.resolve();
        }

        return deferred.promise;
    };
}