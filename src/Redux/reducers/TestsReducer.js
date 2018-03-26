import StoreInit from '../StoreInit.js';

export default TestsReducer = (state = StoreInit.tests, action) => {
    switch (action.type) {
        case 'SET_TEST':
            return { ...state, [action.idTest]: {...state[action.idTest], ...action.payload}};
        default:
            return (state);
    }
}

export const CurrentTestReducer = (state = StoreInit.currentTest, action) => {
    switch (action.type) {
        case 'SET_CURRENT_TEST':
            return (action.payload);
        default:
            return (state);
    }
};