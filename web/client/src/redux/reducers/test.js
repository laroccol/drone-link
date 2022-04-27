const defaultState = {
    data: {}
}

export default function(state = defaultState, action) {
    switch(action.type) {
        default: {
            return {...state}
        }
    }
}