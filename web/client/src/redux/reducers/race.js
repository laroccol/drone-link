import { types } from "../actions/race";

const defaultState = {
    id: null,
    moderator: null,
    creation_date: null,
    laps: 0,
    pilots: [],
    timers: [],
    pilotPings: [],
    sstatus: null,
    active: false,
}

export default function(state = defaultState, action) {
    switch(action.type) {
        
        case (types.status.init): {
            const newState = action.payload
            return {
                ...state,
                ...newState
            }
        }

        case (types.status.addPilot): {
            return {...state, pilots: action.payload}
        }

        case (types.status.startRace): {
            return {
                ...state,
                status: "started",
                race_start_time: action.payload
            }
        }

        default: {
            return { ...state}
        }

    }
}