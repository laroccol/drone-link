export const getTimers = async () => {
    return fetch('/database/getall', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({database: 'drone-link', tablename: 'timers'})
    }).then(response => response.json());
}

export const updateTimer = async (type, update) => {
    return fetch('/database/update', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({database: 'drone-link', tablename: 'timers', type: type, update: update})
    })
}