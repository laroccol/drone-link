import express from 'express';
import { createDatabase, deleteDatabase, deleteTable, createTable, insert, deleteByID, getData, update, grabData } from '../../utils/database';

const router = express.Router();

router.get('/initalize', (req, res) => {
    createDatabase('drone-link', req).then(createTable('drone-link', 'data', req)).then(createTable('drone-link', 'db-logs', req)).then(createTable('drone-link', 'mqtt-logs', req)).then(createTable('drone-link', 'timers', req)).then(createTable('drone-link', 'races-active', req)).then(createTable('drone-link', 'races-inactive', req)).then(createTable('drone-link', 'pilots', req)).then(res.json({message: 'Initalized Project'}))
})

router.post('/dbcreate', (req, res) => {
    const response = createDatabase(req.body.name, req);
    res.json({response: response.message});
});

router.post('/dbdelete', (req, res) => {
    const response = deleteDatabase(req.body.name, req);
    res.json({response: response.message})
})

router.post('/tablecreate', (req, res) => {
    const response = createTable(req.body.database, req.body.name, req);
    res.json({response: response.message});
});

router.post('/tabledelete', (req, res) => {
    const response = deleteTable(req.body.database, req.body.name, req);
    res.json({response: response.message})
})

router.post('/insert', (req, res) => {
    const response = insert(req.body.database, req.body.tablename, JSON.parse(req.body.data), req);
    res.json({response: response.message});
})

router.post('/delete', (req, res) => {
    const response = deleteByID(req.body.database, req.body.tablename, req.body.id, req);
    res.json({response: response.message});
})

router.post('/update', async (req, res) => {
    console.log(req.body)
    const response = update(req.body.database, req.body.tablename, req.body.type, req.body.update, req);
    res.json({response: response.message})
})

router.post('/grab', async (req, res) => {
    const response = await grabData(req.body.database, req.body.tablename, req.body.filter, req);
    if(response.data) response.data.toArray((e, r) => res.json({result: r}));
})

router.post('/getall', async (req, res) => {
    const response = await getData(req.body.database, req.body.tablename, req);
    if(response.data)
        response.data.toArray((e, r) => res.json({result: r}))
})



module.exports = router;