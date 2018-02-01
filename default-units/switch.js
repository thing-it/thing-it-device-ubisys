module.exports = {
    metadata: {
        plugin: "switch",
        label: "ubisys Smart Power Switch",
        role: "actor",
        family: "switch",
        deviceTypes: ["ubisys/gateway"],
        services: [],
        state: [{
            label: "Switch",
            id: "switch",
            type: {
                id: "boolean"
            }
        }, {
            label: "Power Consumption",
            id: "power",
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
        return new Switch();
    }
};

var q = require('q');

/**
 *
 */
function Switch() {
    /**
     *
     */
    Switch.prototype.start = function () {
        var deferred = q.defer();

        this.state = {switch: false, power: 0};

        if (this.isSimulated()) {
            this.interval = setInterval(function () {
                this.state.switch = !this.state.switch;

                this.publishStateChange();
            }.bind(this), 20000);

            this.powerInterval = setInterval(function () {
                this.state.power += 0.1;

                this.publishStateChange();
            }.bind(this), 10000);

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
    Switch.prototype.getState = function () {
        return this.state;
    };

    /**
     *
     */
    Switch.prototype.setState = function (state) {
        this.state = state;
    };

    Switch.prototype.toggle = function () {
        this.state.switch = !this.state.switch;
    };

    /**
     *
     */
    Switch.prototype.stop = function () {
        if (this.isSimulated()) {
            if (this.interval) {
                clearInterval(this.interval);
            }

            if (this.powerInterval) {
                clearInterval(this.powerInterval);
            }
        }
    }
}