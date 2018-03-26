import { combineReducers } from 'redux';

import ProtoReducer from './ProtoReducer.js';
import TestsReducer, { CurrentTestReducer } from './TestsReducer';

export default combineReducers({
    proto: ProtoReducer,
    tests: TestsReducer,
    currentTest: CurrentTestReducer,
});