import { updateTimer } from "./timers";
import { getPilot, updatePilot } from "./pilot";
export const createRace = data => {
    return fetch('/race/createRace', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              data: JSON.stringify(data)
          })
    })
}

export const addPilot = (raceId, data) => {
    return fetch('/race/addPilot', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            raceId: raceId,
            data: JSON.stringify(data)
        })
    })
}

export const updateRacePilot = async (raceId, type, update) => {
    return fetch('/database/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({database: 'drone-link', tablename: `race_${raceId}_stats`, type: type, update: update})
    })
}

export const getActiveRace = async id => {
    return fetch('/database/grab', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            database: 'drone-link',
            tablename: 'races-active',
            filter: {id: id}
        })
    }).then(response => response.json())
}

export const getAllActiveRaces = async () => {
    return fetch('/database/getall', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            database: 'drone-link',
            tablename: 'races-active'
        })
    }).then(response => response.json())
}

export const getInactiveRace = async id => {
    return fetch('/database/grab', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            database: 'drone-link',
            tablename: 'races-inactive',
            filter: {id: id}
        })
    }).then(response => response.json())
}

export const getAllInactiveRaces = async () => {
    return fetch('/database/getall', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            database: 'drone-link',
            tablename: 'races-inactive'
        })
    }).then(response => response.json())
}

export const updateRace = async (type, update) => {
    return fetch('/database/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({database: 'drone-link', tablename: 'races-active', type: type, update: update})
    })
}

export const startRace = async (raceId) => {
    return fetch('/race/startRace', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({raceId: raceId})
    })
}

export const inactivateRace = async race => {
    return fetch('/database/insert', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              database: 'drone-link',
              tablename: 'races-inactive',
              data: JSON.stringify(race)
          })
    })
}

export const removeRace = data => {
    return fetch('/database/delete', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({database: 'drone-link', tablename: 'races-active', id: data.id})
    })
} 

export const endRace = (raceData) => {
    return fetch('/race/endRace', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({raceData: raceData})
    })
}