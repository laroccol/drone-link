import rethink, { db } from 'rethinkdb';
export const dbLog = (socket, conn) => {
    rethink.dbList().run(conn).then(db => {
        if(db.includes('drone-link')) {
            rethink.db('drone-link').tableList().run(conn).then(tables => {
                if(tables.includes('db-logs')) {
                    rethink.db('drone-link').table('db-logs').changes().run(conn, (e, cursor) => {
                        cursor.each((e, item) => {
                            item ? ((item.old_val !== item.new_val) ? socket.emit('db-log-update', item.new_val): null) : null;
                         })
                     }).catch(e => console.error(e));
                }
            })
        }
    })
}

export const timersLog = (socket, conn) => {
    rethink.dbList().run(conn).then(db => {
        if(db.includes('drone-link')) {
            rethink.db('drone-link').tableList().run(conn).then(tables => {
                if(tables.includes('timers')) {
                    rethink.db('drone-link').table('timers').changes().run(conn, (e, cursor) => {
                        cursor.each((e, item) => {
                            item ? ((item.old_val !== item.new_val) ? socket.emit('timers-update', {old: item.old_val, new: item.new_val}): null) : null;
                         })
                     }).catch(e => console.error(e));
                }
            })
        }
    })
}