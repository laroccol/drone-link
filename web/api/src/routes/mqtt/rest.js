import express from 'express';

const router = express.Router();

const sendMessage = client => router.post('/message', (req, res) => {
    console.log("RECIEVED MESSAGE");
    console.log(req.body.topic);
    console.log(req.body.message);
    client.sendMessage(req.body.topic, req.body.message);
    res.status(200).send('Message sent to MQTT');
})

export default {
    sendMessage
}