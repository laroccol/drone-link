import express from 'express';
import rethink from 'rethinkdb';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path'; 
import socketIO from 'socket.io';
import http from 'http';
import routes from "./routes/index";
import database from './routes/database/rest';
import race from './routes/race/rest'
import mqtt from "./routes/mqtt/rest";
import { connect, close } from "./config/connect";
import MqttHandler from "./config/mqttHandler";
import { timersLog, dbLog } from "./routes/database/stream";
import { activeRaceStream, inactiveRaceStream, raceStatStream } from "./routes/race/stream";
import { db_host, db_port } from './config/database';

const app = express();

const port = 3000;

const server = http.createServer(app);

const io = socketIO(server);

app.use(connect);

app.use(express.static(path.join(__dirname, '../../static/dist')));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

let mqttClient = new MqttHandler('test');

mqttClient.connect();

mqttClient.subscribe('timer/register');

mqttClient.subscribe('race/pings');

io.on('connection', socket => {
    console.log('Socket Connected')
    let connection = null;
    rethink.connect({host: db_host, port: db_port}, async (e, conn) => {
        connection = conn;
        dbLog(socket, conn);
        timersLog(socket, conn);
        activeRaceStream(socket, conn);
        inactiveRaceStream(socket, conn);

        const doesDbExist = await rethink.dbList().contains('drone-link').run(conn);

        if (doesDbExist) {
            const activeRaces = await rethink.db('drone-link').table('races-active').run(conn);
            activeRaces.toArray((e, r) => {
                r.forEach((value) => {
                    raceStatStream(value.id, socket, conn);
                })
            })
        }
        
        if (e) console.error(e);
    });
    socket.on('disconnect', reason => {
        console.log('Disconnectiong:', reason);
        connection.close();
    })
})

/**
 * Route Handling
 */
app.use('/', routes);
app.use('/database', database);
app.use('/race', race)
app.use('/mqtt', mqtt.sendMessage(mqttClient));




 //Serves the static react bundle on any route that is not an API call
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../../static/dist/index.html'))
});

app.use(close);

server.listen(port, () => console.log(`Server Luanched on port: ${port}`)) 