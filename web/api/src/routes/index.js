import express from 'express';
import rethink from 'rethinkdb';
import { database } from '../config/database';
import { createDatabase, createTable, insert, getData } from "../utils/database";

const router = express.Router();


router.get('/create', (req, res) => {
    rethink.dbCreate(database).run(req._rdb);
    console.log(`Database ${database} created` );
    rethink.db(database).tableCreate('test_table').run(req._rdb);
    console.log(`Table test_table created`);

    res.json({title: 'Rethink', message: 'Sucessfully created DB and Table'})
    
})

router.get('/users', async (req, res) => {
    let data = {
        first: 'Bob',
        last: 'Tom',
        DOB: '1111'
    }
    // createDatabase('stream_example', req);
    // createTable('stream_example', 'test', req);
    insert('stream_example', 'users', data, req);
    // const users = await getData('ttt', 'ttt', req);

    res.json({users: users})
})



module.exports = router;