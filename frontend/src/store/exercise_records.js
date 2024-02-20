import { csrfFetch } from "./csrf";

const GET_USER_ACTIVITIES = 'record/USER_ACTIVITY';

const NEW = 'record/NEW';
const GET = 'record/GET_RECORDS';
const RESET = 'record/RESET_RECORDS';

const COUNT = 'record/COUNT';
const RESET_COUNT = 'record/RESET_COUNT';
const NEW_COUNT = 'record/NEW_COUNT';
const DELETE_COUNT = 'record/DELETE_COUNT';

const GETRecords = (records) => {
    return {
        type: GET,
        records
    }
}

export const getRecord = (exercise_id, userID) => async dispatch => {
    const res = await csrfFetch(`/api/exercise_record/${exercise_id}/${userID}`, {
        method: 'GET'
    })

    const data = await res.json();

    dispatch(GETRecords(data.records))
}

const GETActivityRecords = (records) => {
    return {
        type: GET_USER_ACTIVITIES,
        records
    }
}

export const getActivityRecord = (userID, timeSpan) => async dispatch => {
    const res = await csrfFetch(`/api/exercise_record/activityRecord/${userID}/${timeSpan}`, {
        method: 'GET'
    })

    const data = await res.json();

    dispatch(GETActivityRecords(data.records))
}

const newRecord = (record) => {
    return {
        type: NEW,
        record
    }
}

export const addRecord = (record, user_id, activity_id, activity_name, title = '', notes = '') => async (dispatch) => {
    // record: 
    const res = await csrfFetch('/api/exercise_record', {
        method: 'POST',
        body: JSON.stringify({
            record,
            user_id,
            activity_id,
            activity_name,
            title,
            notes
        })
    })

    const data = await res.json();

    dispatch(newRecord(record));
}

export const resetRecord = () => {
    return {
        type: RESET
    }
}

export const countRecord = (id, name, reps = 0, idx = 0) => {
    return {
        type: COUNT,
        id,
        name,
        reps,
        idx
    }
}

export const resetCount = () => {
    return {
        type: RESET_COUNT
    }
}

export const newCount = (id) => {
    return {
        type: NEW_COUNT,
        id
    }
}

export const deleteCount = id => {
    return {
        type: DELETE_COUNT,
        id
    }
}

const recordReducer = (state = {record: undefined, counts: {}, records: [], user_activity: []}, action) => {
    let newState;
    switch (action.type){
        case GET_USER_ACTIVITIES:
            newState = {
                ...state
            };
            newState.user_activity = action.records;
            return newState;
        case GET:
            newState = {
                ...state
            }
            newState.records = action.records
            return newState;
        case NEW:
            newState = {
                ...state,
                record: action.record
            };
            return newState;
        case COUNT:
            newState = {...state};
            if (!newState.counts[action.id] || !newState.counts[action.id].reps) {
                newState.counts[action.id] = {
                    reps: [],
                    name: action.name
                }
            }
            newState.counts[action.id].reps[action.idx] = action.reps
            return newState;
        case NEW_COUNT:
            newState = {
                ...state,
                counts: {...state.counts}
            }
            newState.counts[action.id].reps = [...state.counts[action.id].reps]
            newState.counts[action.id].reps.push(0);
            return newState;
        case DELETE_COUNT:
            newState = {
                ...state
            }
            delete newState.counts[action.id]
            return newState;
        case RESET_COUNT:
            newState = {
                ...state,
                counts: {}
            }
            return newState;
        case RESET:
            newState = {
                ...state,
                records: []
            }
            return newState;
        default:
            return state;
    }
}

export default recordReducer;