import * as types from '../actions/all-types';
const initState = [];
const queryReducer = (state = initState, action) => {
    console.log(action, 'client reducer');
    switch (action.type) {
        case types.ADD_QUERY:
            return [...state, action.payload];
        case types.REMOVE_QUERY:
            return state.filter((item, i) => i !== action.payload);
        case types.REMOVE_ALL_QUERIES:
            return [];
        default: return state
    }
};

export default queryReducer