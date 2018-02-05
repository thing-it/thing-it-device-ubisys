const moment = require('moment')
const express = require('express')
const app = express()
const expressWs = require('express-ws')(app);
let ws;

const outlet = {
    configuration: {id: 1}, state: {switch: false},
    toggle: function () {
        console.log('Toggle Outlet to', !this.switch);

        this.switch = !this.switch;

        ws.send(JSON.stringify({
            type: 'stateChange', node: this.configuration.id, state: this.state
        }));
    }
};
const smartSwitch = {
    configuration: {id: 2}, state: {switch: false}, toggle: function () {
        console.log('Toggle Switch to', !this.switch);

        this.switch = !this.switch;

        ws.send(JSON.stringify({
            type: 'stateChange', node: this.configuration.id, state: this.state
        }));
    }
};
const motionSensor = {configuration: {id: 3}, state: {occupied: false, lastMotionTimestamp: null, ticksPerMinute: 0}};
const temperatureSensor = {configuration: {id: 4}, state: {temperature: 20}};
const nodes = [outlet, smartSwitch, motionSensor, temperatureSensor];

// Returns the state of the Gateway

app.get('/', (req, res) => {
    res.send({});
});

// Returns the state of ZigBee Nodes

app.get('/nodes/:node', (req, res) => {
    res.send(nodes[Number(req.params.node) - 1].state);
});

// Invokes a Service on ZigBee Nodes

app.post('/nodes/:node/services/:service', (req, res) => {
    console.log('Invoking service ' + req.params.service + ' on Node ' + req.params.node);

    nodes[Number(req.params.node) - 1][req.params.service]();

    res.send({});
});

// Sends messages on Node changes

app.ws('/events', function (socket, req) {
    ws = socket;

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



