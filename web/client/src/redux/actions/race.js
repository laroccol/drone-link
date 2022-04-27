import { getActiveRace, updateRace, startRace } from "../../api/race";

export const types = {
    status: {
        init: 'race/INIT',
        addPilot: 'race/ADDPILOT',
        startRace: 'race/STARTRACE'
    }
}

export default {
    init: (id) => {
        return dispatch =>
            getActiveRace(id).then(data => {
                return dispatch({
                    type: types.status.init,
                    payload: data.result[0]
                })
            })
    },

    addPilot: (id, data) => {
        return dispatch => {
            return dispatch({
                type: types.status.addPilot,
                payload: data
            })
        }
    },

    startRace: (id) => {
        return dispatch => {
            const startTime = Date.now();
            startRace(id).then(r => {
               return dispatch({
                   type: types.status.startRace,
                   payload: startTime
               }) 
            })
        }
    }

}