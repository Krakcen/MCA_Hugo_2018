import { combineReducers } from 'redux';

import ProtoReducer from './ProtoReducer.js';

export default combineReducers({
    proto: ProtoReducer
});