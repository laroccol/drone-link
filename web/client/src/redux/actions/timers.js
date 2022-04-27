import { getTimers } from "../../api/timers";

export const types = {
    status: {
        init: 'timers/INIT',
        use: 'timer/USE',
        unuse: 'timer/UNUSE',
        add: 'timer/UPDATE'
    }
}

export default {
    init: () => {
        return dispatch =>
            getTimers().then(data => {
                return dispatch({
                    type: types.status.init,
                    payload: data.result.sort((a, b) => a.id - b.id)
                })
            })
    },

    add: (data) => {
        return dispatch =>
            dispatch({
                type: types.status.add,
                payload: data
            })
    },

    use: (data) => {
        return dispatch =>
            dispatch({
                type: types.status.use,
                payload: data
            })
    },

    unuse: (data) => {
        return dispatch =>
            dispatch({
                type: types.status.unuse,
                payload: data
            })
    }
}