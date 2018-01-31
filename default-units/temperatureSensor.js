module.exports = {
    metadata: {
        plugin: "temperatureSensor",
        label: "ubisys Temperature Sensor",
        role: "actor",
        family: "temperatureSensor",
        deviceTypes: ["ubisys/gateway"],
        services: [],
        state: [{
            label: "Temperature",
            id: "temperature",
            type: {
                id: "decimal"
            }
        }],
        configuration: [{
            label: "ZigBee ID",
            id: "zigBeeId",
            type: {
                id: "integer"
            }
        }]
    },
    create: function () {
        return new TemperatureSensor();
    }
};


var q = require('q');

/**
 *
 */
function TemperatureSensor() {
    /**
     *
     */
    TemperatureSensor.prototype.start = function () {
        var deferred = q.defer();

        this.state = {temperature: 20.0};

        if (!this.isSimulated()) {
            this.interval = setInterval(function () {
                this.state.temperature = Math.round(15 + Math.random() * 10);

                this.publishStateChange();
            }.bind(this), 20000);

            deferred.resolve();
        }
        else {
            deferred.resolve();
        }

        return deferred.promise;
    };

    /**
     *
     */
    TemperatureSensor.prototype.stop = function () {
        if (this.isSimulated()) {
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }

}