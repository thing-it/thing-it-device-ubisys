var assert = require("assert");

describe('[thing-it] ubisys Plugin', function () {
    var testDriver;

    before(function () {
        testDriver = require("thing-it-test").createTestDriver({logLevel: "debug", simulated: false});

        testDriver.registerDevicePlugin('ubisys', __dirname + "/../gateway");
        testDriver.registerUnitPlugin(__dirname + "/../default-units/motionSensor");
        testDriver.registerUnitPlugin(__dirname + "/../default-units/outlet");
        testDriver.registerUnitPlugin(__dirname + "/../default-units/switch");
        testDriver.registerUnitPlugin(__dirname + "/../default-units/temperatureSensor");
    });
    describe('Start Configuration', function () {
        this.timeout(5000);

        it('should complete without error', function () {
            return testDriver.start({
                configuration: require("../examples/configuration.js"),
                heartbeat: 10
            });
        });
    });
    describe('Actor and Sensor Events', function () {
        this.timeout(30000);

        before(function () {
            testDriver.removeAllListeners();
        });
        it('should receive state change messages', function (done) {
            testDriver.addListener({
                publishActorStateChange: function (event) {
                    console.log('Event received >>>', event);
                    done();
                }
            });
        });
    });
});





