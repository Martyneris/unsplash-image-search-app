import * as types from './all-types';

export function addQuery(query) {
    return {
        type: types.ADD_QUERY,
        payload: query
    }
}

export function removeQuery(i) {
    return {
        type: types.REMOVE_QUERY,
        payload: i
    }
}

export function removeAllQueries() {
    return {
        type: types.REMOVE_ALL_QUERIES,
    }
}