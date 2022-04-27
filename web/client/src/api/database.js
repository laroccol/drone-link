export const initalizeDB = () => {
    return fetch('/database/initalize', {
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    })
}

export const createDB = name => {
    return fetch('/database/dbcreate', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({name: name})
    })
}

export const deleteDB = name => {
    return fetch('/database/dbdelete', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({name: name})
    })
}

export const createTable = (dbName, tableName) => {
    return fetch('/database/tablecreate', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({database: dbName, name: tableName})
    })
}

export const deleteTable = (dbName, tableName) => {
    return fetch('/database/tabledelete', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({database: dbName, name: tableName})
    })
}

export const getTable = async (dbName, tableName) => {
    return fetch('/database/getall', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({database: dbName, tablename: tableName})
    }).then(response => response.json());
}

export const removeTimer = async (dbName, tableName, id) => {
    return fetch('/database/delete', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({database: dbName, tablename: tableName, id: id})
    }).then(response => response.json());
}