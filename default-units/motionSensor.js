module.exports = {
    metadata: {
        plugin: "motionSensor",
        label: "ubisys PIR Sensor",
        role: "sensor",
        family: "motionSensor",
        deviceTypes: ["ubisys/gateway"],
        services: [],
        state: [{
            label: "Motion",
            id: "motion",
            type: {
                id: "boolean"
            }
        }, {
            label: "Ticks",
            id: "ticks",
            type: {
                id: "integer"
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
        return new MotionSensor();
    }
};

var q = require('q');

/**
 *
 */
function MotionSensor() {
    /**
     *
     */
    MotionSensor.prototype.start = function () {
        var deferred = q.defer();

        this.state = {motion: false, ticks: 0};

        if (this.isSimulated()) {
            this.interval = setInterval(function () {
                this.state.motion = !this.state.motion;

                if (this.state.motion) {
                    this.state.ticks = Math.round(Math.random() * 10);
                } else {
                    this.state.ticks = 0;
                }

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