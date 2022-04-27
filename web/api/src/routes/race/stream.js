import rethink from 'rethinkdb';
export const activeRaceStream = (socket, conn) => {
    rethink.dbList().run(conn).then(db => {
        if(db.includes('drone-link')) {
            rethink.db('drone-link').tableList().run(conn).then(tables => {
                if(tables.includes('timers')) {
                    rethink.db('drone-link').table('races-active').changes().run(conn, (e, cursor) => {
                        cursor.each((e, item) => {
                            if(item) {
                                if(!item.old_val && item.new_val) {
                                    socket.emit('race-insert', {old: null, new: item.new_val});
                                } else if(item.old_val && !item.new_val) {
                                    socket.emit('race-delete', {old: item.old_val, new: null});
                                } else if(item.old_val && item.new_val) {
                                    socket.emit('race-update', {old: item.old_val, new: item.new_val});
                                }
                            }
                         })
                     }).catch(e => console.error(e));
                }
            })
        }
    })
}

export const raceStatStream = (raceId, socket, conn) => {
    rethink.dbList().run(conn).then(db => {
        if (db.includes('drone-link')) {
            rethink.db('drone-link').tableList().run(conn).then(tables => {
                if (tables.includes('timers')) {
                    rethink.db('drone-link').table(`race_${raceId}_stats`).changes().run(conn, (e, cursor) => {
                        cursor.each((e, item) => {
                            if (item) {
                                if (item.old_val && item.new_val) {
                                    socket.emit('race-ping', {new: item.new_val});
                                }
                            }
                        })
                    }).catch(e => console.error(e));
                }
            })
        }
    })
}

export const inactiveRaceStream = (socket, conn) => {
    rethink.dbList().run(conn).then(db => {
        if(db.includes('drone-link')) {
            rethink.db('drone-link').tableList().run(conn).then(tables => {
                if(tables.includes('timers')) {
                    rethink.db('drone-link').table('races-inactive').changes().run(conn, (e, cursor) => {
                        cursor.each((e, item) => {
                            if(item) {
                                if(!item.old_val && item.new_val) {
                                    socket.emit('irace-insert', {old: null, new: item.new_val});
                                } else if(item.old_val && !item.new_val) {
                                    socket.emit('irace-delete', {old: item.old_val, new: null});
                                } else if(item.old_val && item.new_val) {
                                    socket.emit('irace-update', {old: item.old_val, new: item.new_val});
                                }
                            }
                         })
                     }).catch(e => console.error(e));
                }
            })
        }
    })
}