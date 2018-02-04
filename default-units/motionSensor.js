module.exports = {
    metadata: {
        plugin: "motionSensor",
        label: "ubisys PIR Sensor",
        role: "sensor",
        family: "motionSensor",
        deviceTypes: ["ubisys/gateway"],
        services: [],
        state: [{
            label: "Occupied",
            id: "occupied",
            type: {
                id: "boolean"
            }
        }, {
            label: "Ticks/Minute",
            id: "ticksPerMinute",
            type: {
                id: "integer"
            }
        }, {
            label: "Last Motion Timestamp",
            id: "lastMotionTimestamp",
            type: {
                id: "string"
            }
        }],
        configuration: [{
            label: "ZigBee ID",
            id: "zigBeeId",
            type: {
                id: "integer"
            },
            defaultValue: 1
        }]
    },
    create: function () {
        return new MotionSensor();
    }
};

var q = require('q');
var moment = require('moment');

/**
 *
 */
function MotionSensor() {
    /**
     *
     */
    MotionSensor.prototype.start = function () {
        var deferred = q.defer();

        this.state = {occupied: false, ticksPerMinute: 0};

        if (this.isSimulated()) {
            this.interval = setInterval(function () {
                this.state.occupied = !this.state.occupied;

                if (this.state.occupied) {
                    this.state.ticksPerMinute = Math.round(Math.random() * 10);
                    this.state.lastMotionTimestamp = moment().toISOString();
                } else {
                    this.state.ticksPerMinute = 0;
                }

                this.publishStateChange();
            }.bind(this), 20000);

            deferred.resolve();
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

            deferred.resolve();
        }

        return deferred.promise;
    };

    /**
     *
     */
    MotionSensor.prototype.getState = function () {
        return this.state;
    };

    /**
     *
     */
    MotionSensor.prototype.setState = function (state) {
        this.state = state;
    };

    /**
     *
     */
    MotionSensor.prototype.stop = function () {
        if (this.isSimulated()) {
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }

}