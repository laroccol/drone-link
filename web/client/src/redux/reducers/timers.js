import { types } from "../actions/timers";

const defaultState = {
    available: [],
    used: []
}

export default function(state = defaultState, action) {
    switch(action.type) {

        case (types.status.init): {
            const free = [];
            const inuse = [];
            action.payload.map(t => {
                t.inuse ? inuse.push(t) : free.push(t);
            })
            return {...state, available: free, used: inuse}
        }

        case (types.status.add): {
            return {...state, available: [...state.available, action.payload]}
        }

        case (types.status.use): {
            const newUsed = state.available.filter(i => i.id === action.payload.id)[0];
            // console.log(newUsed.inuse)
            newUsed.inuse = true;
            return {...state, available: state.available.filter(i => i.id !== action.payload.id).sort((a, b) => a.id - b.id), used: [...state.used, state.available.filter(i => i.id === action.payload.id)[0]].sort((a, b) => a.id - b.id)}
        }

        case (types.status.unuse): {
            const newFree = state.used.filter(i => i.id === action.payload.id)[0];
            newFree.inuse = false;
            return {...state, available: [...state.available, newFree].sort((a, b) => a.id - b.id), used: state.used.filter(i => i.id !== action.payload.id).sort((a, b) => a.id - b.id)}
        }

        default: {
            return {...state}
        }
    }
}