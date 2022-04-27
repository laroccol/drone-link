export const addPilot = data => {
    return fetch('/database/insert', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              database: 'drone-link',
              tablename: 'pilots',
              data: JSON.stringify(data)
          })
    })
}

export const removePilot = async id => {
    return fetch('/database/delete', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            database: 'drone-link', 
            tablename: 'pilots', 
            id: id
        })
    }).then(response => response.json());
}

export const getPilot = async filters => {
    return fetch('/database/grab', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            database: 'drone-link',
            tablename: 'pilots',
            filter: filters
        })
    }).then(response => response.json())
}

export const updatePilot = async (type, update) => {
    return fetch('/database/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({database: 'drone-link', tablename: 'pilots', type: type, update: update})
    })
}