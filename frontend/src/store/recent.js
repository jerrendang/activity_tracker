import { csrfFetch } from "./csrf";

const GET = 'recent/GET';
const MOST_RECENT = 'recent/MOST_RECENT';

const recentRecords = (records) => {
    return {
        type: GET,
        records
    }
}

export const getRecent = (userID, page = 1, numResults = 20) => async (dispatch) => {
    const res = await csrfFetch(`/api/recent/${userID}/${page}/${numResults}`, {
        method: 'GET'
    });

    const data = await res.json();

    dispatch(recentRecords(data.records));

    return data.records;
}

const mostRecentDispatched = (mostRecent) => {
    return {
        type: MOST_RECENT,
        mostRecent
    }
}

export const mostRecent = (userID) => async (dispatch) => {
    const res = await csrfFetch(`/api/recent/mostRecent/${userID}`, {
        method: 'GET'
    })

    const data = await res.json();

    dispatch(mostRecentDispatched(data.mostRecent));

    return data.mostRecent;
}

const recentReducer = (state = {}, action) => {
    let newState;
    switch (action.type){
        case GET:
            newState = {...state};
            newState.records = action.records;
            return newState;
        case MOST_RECENT:
            newState = {...state};
            newState.mostRecent = action.mostRecent;
            return newState;
        default:
            return state;
    }
}

export default recentReducer;