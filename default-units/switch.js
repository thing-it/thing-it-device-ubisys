module.exports = {
    metadata: {
        plugin: "switch",
        label: "ubisys Smart Power Switch",
        role: "actor",
        family: "switch",
        deviceTypes: ["ubisys/gateway"],
        services: [{label: "Toggle", id: "toggle"}],
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
            },
            defaultValue: 1
        }]
    },
    create: function () {
        return new Switch();
    }
};

var q = require('q');
var moment = require('moment');

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
                if (this.state.switch) {
                    this.state.power += 0.1;

                    this.publishStateChange();
                }
            }.bind(this), 10000);

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
        if (this.isSimulated()) {
            this.state.switch = !this.state.switch;

            this.publishStateChange();
        } else {
            this.device.adapter.invokeNodeService(this.configuration.zigBeeId, 'toggle').then(() => {
                this.state.switch = !this.state.switch;

                this.publishStateChange();
            }).fail();
        }
    };

    /**
     *
     */
    Switch.prototype.stop = function () {
        if (this.isSimulated()) {
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }
}