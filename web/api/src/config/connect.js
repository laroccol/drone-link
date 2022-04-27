import rethink from "rethinkdb";
import {db_host, db_port} from "../config/database";


export const connect = (req, res, next) => {
    let count = 0;

       rethink.connect( {host: db_host, port: db_port}, (e, connection) => {
           if(e && e.name === 'ReqlDriverError' && e.message.indexOf('Could not connect') === 0 && ++count < 31) {
               console.log(e);
               return;
           }
           req._rdb = connection;
           next();
       })
}

export const close = (req, res, next) => {
    req._rdb.close();
}