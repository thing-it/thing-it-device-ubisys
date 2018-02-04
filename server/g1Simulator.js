const moment = require('moment')
const express = require('express')
const app = express()
const expressWs = require('express-ws')(app);

const motionSensor = {configuration: {id: 1}, state: {occupied: false, lastMotionTimestamp: null, ticksPerMinute: 0}};
const outlet = {
    configuration: {id: 2}, state: {switch: false},
    toggle: function () {
        this.switch = !this.switch;
    }
};
const smartSwitch = {
    configuration: {id: 3}, state: {switch: false}, toggle: function () {
        this.switch = !this.switch;
    }
};
const temperatureSensor = {configuration: {id: 4}, state: {temperature: 20}};
const nodes = [motionSensor, outlet, smartSwitch, temperatureSensor];

// Returns the state of the Gateway

app.get('/', (req, res) => {
    res.send(nodes[Number(req.params.node) - 1].state)
});

// Returns the state of ZigBee Nodes

app.get('/nodes/:node', (req, res) => {
    res.send(nodes[Number(req.params.node) - 1].state)
});

// Invokes a Service on ZigBee Nodes

app.post('/nodes/%node/services/%service', (req, res) => res.send(nodes[Number(req.params.node) - 1]));

// Sends messages on Node changes

app.ws('/events', function (ws, req) {
    const motionSensorInterval = setInterval(() => {
        if (!motionSensor.occupied) {
            motionSensor.state = {
                occupied: true,
                lastMotionTimestamp: moment().toISOString(),
                ticksPerMinute: Math.round(Math.random() * 15)
            }
        } else {
            motionSensor.state = {
                occupied: false,
                lastMotionTimestamp: motionSensor.lastMotionTimestamp,
                ticksPerMinute: 0
            }
        }

        try {
            ws.send(JSON.stringify({
                type: 'stateChange', node: motionSensor.configuration.id, state: motionSensor.state
            }));
        } catch (error) {
            console.log('Cannot send WS message; connection may be closed.');
        }

    }, 10000);

    const temperatureSensorInterval = setInterval(() => {
        temperatureSensor.state = {
            temperature: Math.round(15 + Math.random() * 20)
        };

        try {
            ws.send(JSON.stringify({
                type: 'stateChange', node: temperatureSensor.configuration.id, state: temperatureSensor.state
            }));
        } catch (error) {
            console.log('Cannot send WS message; connection may be closed.');
        }

    }, 7000);
});

app.listen(3335, () => console.log('ubisys g1 Simulator listening on port 3335.'));



