import express from 'express';
import { createDatabase, deleteDatabase, deleteTable, createTable, insert, deleteByID, getData, update, appendArray, grabData, updateAll } from '../../utils/database';
import { raceStatStream } from './stream';

const router = express.Router();

router.post('/createRace', (req, res) => {
    const data = JSON.parse(req.body.data);

    createTable('drone-link', `race_${data.id}_stats`, req)
        .then(insert('drone-link', 'races-active', data, req))
        .then(res.json({message: 'Created Race'}));
        
})

router.post('/addPilot', (req, res) => {
    const raceId = req.body.raceId;
    const data = JSON.parse(req.body.data);

    const pilotId = data[0];
    const pilotName = data[1];
    const pilotTeam = data[2];
    const pilotFrequency = data[3];

    update('drone-link', 'pilots', {id: pilotId}, {current_race: raceId, inrace: true}, req);
    appendArray('drone-link', 'races-active', raceId, pilotId, req);
    insert('drone-link', `race_${raceId}_stats`, {id: pilotId, pilotName: pilotName, lapTimes: [], gate: 0, place: 1, status: 'waiting'}, req);
    res.json({message: `Added Pilot ${pilotName} To Race ${raceId}`});
})

router.post('/startRace', (req, res) => {
    const raceId = req.body.raceId;
    const startTime = Date.now();

    update('drone-link', 'races-active', {id: raceId}, {status: 'started', race_start_time: startTime}, req);
    updateAll('drone-link', `race_${raceId}_stats`, {status: 'racing'}, req);
    res.json({message: 'Started Race'});
})

router.post('/endRace', async (req, res) => {
    const raceData = req.body.raceData;
    const endTime = Date.now();

    await raceData.timers.map(timer => {
        update('drone-link', 'timers', {id: timer}, {inuse: false}, req);
    });

    if(raceData.pilots) {
        grabData('drone-link', 'pilots', raceData.pilots, req).then(d => {
            d.data.toArray((e, r) => {
                console.log(r);
                r.map(p => {
                    const past = p.past_races;
                    update('drone-link', 'pilots', {id: p.id}, {inrace: false, current_race: null, past_races: [...past, raceData.id]}, req);
                })
            });
        });
    }

    await getData('drone-link', `race_${raceData.id}_stats`, req).then(d => {
        d.data.toArray((e, r) => {
            const updatedRaceData = {...raceData, active: false, end_date: Date.now(), status: 'ended', 'stats': JSON.stringify(r)};
            insert('drone-link', 'races-inactive', updatedRaceData, req);
            deleteByID('drone-link', 'races-active', raceData.id, req);
            deleteTable('drone-link', `race_${raceData.id}_stats`, req);
        })
    });

    res.json({message: 'Ended Race'});
})

module.exports = router;