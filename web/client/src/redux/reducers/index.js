import { combineReducers } from 'redux';
import test from './test';
import timers from "./timers";
import race from "./race";

const rootReducer = combineReducers({
    test,
    timers,
    race
});


export default (state, action) =>
  rootReducer(action.type === 'RESET' ? undefined : state, action);
