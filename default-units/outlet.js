module.exports = {
    metadata: {
        plugin: "outlet",
        label: "ubisys Smart Power Outlet",
        role: "actor",
        family: "outlet",
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
        return new Outlet();
    }
};

var q = require('q');
var moment = require('moment');

/**
 *
 */
function Outlet() {
    /**
     *
     */
    Outlet.prototype.start = function () {
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
    Outlet.prototype.getState = function () {
        return this.state;
    };

    /**
     *
     */
    Outlet.prototype.setState = function (state) {
        this.state = state;
    };

    /**
     *
     */
    Outlet.prototype.toggle = function () {
        if (this.isSimulated()) {
            this.state.switch = !this.state.switch;
        } else {
            this.device.adapter.invokeNodeService(this.configuration.zigBeeId, 'toggle()').then(() => {
                this.state.switch = !this.state.switch;
            }).fail();
        }
    };

    /**
     *
     */
    Outlet.prototype.stop = function () {
        if (this.isSimulated()) {
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }
}