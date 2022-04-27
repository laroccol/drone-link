import rethink from 'rethinkdb';

export const createDatabase = async (name, req) => {
    rethink.dbCreate(name).run(req._rdb)
    .then(appendDbLog({action: 'create', type: 'database', message: `Created Database: ${name}`}, req))
            .catch(e => {return {message: handleErrors(e)}})
    return {message: 'Successfully Created Database'}
}

export const deleteDatabase = (name, req) => {
    rethink.dbDrop(name).run(req._rdb)
    .then(appendDbLog({action: 'delete', type: 'database', message: `Removed Database: ${name}`}, req))
        .catch(e => { return {message:handleErrors(e)}});
    return {message: 'Successfully Removed Database'}
}

export const createTable = async (database, name, req) => {
     rethink.db(database).tableCreate(name).run(req._rdb)
        .then(appendDbLog({action: 'create', type: 'table', message: `Created Table: ${name} in Database: ${database}`}, req))
            .catch(e => {return {message: handleErrors(e)}});
     return {message: 'Successfully Created Table'}
}

export const deleteTable = (database, name, req) => {
    rethink.db(database).tableDrop(name).run(req._rdb)
        .then(appendDbLog({action: 'delete', type: 'table', message: `Removed Table: ${name} in Database: ${database}`}, req))
            .catch(e => {return {message: handleErrors(e)}});
    return {message: 'Successfully Removed Table'}
}

export const insert = (database, tableName, data, req) => {
    rethink.db(database).table(tableName).insert(data).run(req._rdb).catch(e => {return {message: handleErrors(e)}});
    return {message: `Succesfully Inserted into Table: ${tableName}`}
}

export const deleteByID = (database, tableName, id, req) => {
    rethink.db(database).table(tableName).get(id).delete().run(req._rdb).catch(e => {return {message: handleErrors(e)}});
    return {message: `Successfully Deleted Element With ID ${id} From Table ${tableName}`}
}

// Type is an object of what attribute you want to update based off ex: {id: 1} or {name: timer_1}
// Update is the attribute you wish to update. Ex: {inuse: true} to {inuse: false} would send {inuse: false} as update
export const update = (database, tableName, type, update, req) => {
    rethink.db(database).table(tableName).filter(type).update(update).run(req._rdb)
        .then(appendDbLog({action: 'update', type: 'table', message: `Updated Table: ${tableName} in Database: ${database}`}, req))
            .catch(e => {return {message: handleErrors(e)}});
    return {message: `Sucessfully Updated Element`}
}

export const updateAll = (database, tableName, update, req) => {
    rethink.db(database).table(tableName).update(update).run(req._rdb)
    .then(appendDbLog({action: 'updateall', type: 'table', message: `Updated Table: ${tableName} in Database: ${database}`}, req))
    .catch(e => {return {message: handleErrors(e)}});
    return {message: `Sucessfully Updated Elements`}
}

export const appendArray = (database, tableName, id, item, req) => {
    rethink.db(database).table(tableName).get(id).update({
        pilots: rethink.row('pilots').append(item)
    }).run(req._rdb)
    .then(appendDbLog({action: 'update', type: 'table', message: `Updated Table: ${tableName} in Database: ${database}`}, req))
        .catch(e => {return {message: handleErrors(e)}});
    return {message: `Sucessfully Updated Element`}

}

export const grabData = async (database, tableName, filter, req) => {
    try{
        if(Array.isArray(filter)) {
            const data = await rethink.db(database).table(tableName).getAll(...filter).run(req._rdb);
            return {data: data, message: 'Successfully Retrieved Data'}
        } else {
            const data = await rethink.db(database).table(tableName).filter(filter).run(req._rdb);
            return {data: data, message: 'Successfully Retrieved Data'};
        }
    } catch (e) {
        return {data: null, message: handleErrors(e) }
    }
}

export const getData = async (database, tableName, req) => {
    try {
        const data = await rethink.db(database).table(tableName).run(req._rdb);
        return {data: data, message: 'Successfully Retrieved Data'};
    } catch (e) {
        return {data: null, message: handleErrors(e) }
    }
}

/**
 * 
 * @param {object} payload {action: create, delete, insert, etc, type: Table/DB, message: string'
 * @param {object} req request object 
 */
const appendDbLog = (payload, req) => {
    const data = {
        date: Date.now(),
        action: payload.action,
        type: payload.type,
        message: payload.message
    }
    rethink.db('drone-link').table('db-logs').insert(data).run(req._rdb).catch(e =>  { return {message: handleErrors(e)}})
}


const handleErrors = async type => {
    switch(type.constructor.name) {
        case 'ReqlOpFailedError':
                return `Operation Error: ${type.msg}`;
        case 'ReqlRuntimeError':
                return `Error: ${type.msg}`;
        default:
            console.log('This error is not handled, please add it for ', type.constructor.name);
            console.error(type.stack)
            break;
        }
};

const appendResults = (resultArr, result) => {
    resultArr.push(result);
}