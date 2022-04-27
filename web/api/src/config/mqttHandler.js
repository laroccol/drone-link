import mqtt from 'mqtt';
import rethink from 'rethinkdb';
import { onPingReceived } from '../utils/race';
import { db_host, db_port } from './database';

const host = 'mqtt://mqtt:1883';

export default class MQTTHandler {

    constructor(topic) {
        this.mqttClient = null,
        this.topic = topic
    }

    async connect() {
        this.mqttClient = mqtt.connect(host);

        this.mqttClient.on('error', e => {
            console.log(e);
            this.mqttClient.end();
        })
    
        this.mqttClient.on('connect', () => {
            console.log('MQTT Client Connected');
        });
    
        this.topic ? this.subscribe() : null;

        this.mqttClient.on('message', function (topic, message) {
            console.log('topic: ', topic);
            console.log('message: ', message.toString());
            if (topic == 'timer/register') {
                rethink.connect({host: db_host, port: db_port}, (e, conn) => {
                    rethink.db('drone-link').table('timers').insert({id: parseInt(message), name: `timer_${message}`, inuse: false}).run(conn);
                });
            }
            else if (topic == 'race/pings') {
                const parsedMessage = JSON.parse(message);

                if (!parsedMessage) return;

                rethink.connect({host: db_host, port: db_port}, (e, conn) => {
                    onPingReceived(parsedMessage, conn);
                })
            }
        });
    
        this.mqttClient.on('close', () => {
            console.log('MQTT connection closed');
        })
    }

    subscribe(topic) {
        this.topic = this.topic === null ? topic : this.topic
        this.mqttClient.subscribe(topic || this.topic, {qos: 0});
    }

    sendMessage(topic, message) {
        this.mqttClient.publish(topic, message);
    }
}