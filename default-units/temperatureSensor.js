module.exports = {
    metadata: {
        plugin: "temperatureSensor",
        label: "ubisys Temperature Sensor",
        role: "sensor",
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
            },
            defaultValue: 55555
        }]
    },
    create: function () {
        return new TemperatureSensor();
    }
};


var q = require('q');
var moment = require('moment');

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

        if (this.isSimulated()) {
            this.interval = setInterval(function () {
                this.state.temperature = Math.round(15 + Math.random() * 10);

                this.publishStateChange();
            }.bind(this), 20000);
        }
        else {
            // Retrieve current state

            this.device.adapter.getNodeState(this.configuration.zigBeeId).then(state => {
                this.state = state;

                this.publishStateChange();
            }).fail(error => {
                this.logError(error);
            });

            this.device.adapter.registerListener((message) => {
                if (message.type === 'stateChange' && message.node === this.configuration.zigBeeId) {
                    this.state = message.state;

                    this.publishStateChange();
                }
            });
        }

        deferred.resolve();

        return deferred.promise;
    };

    /**
     *
     */
    TemperatureSensor.prototype.getState = function () {
        return this.state;
    };

    /**
     *
     */
    TemperatureSensor.prototype.setState = function (state) {
        this.state = state;
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