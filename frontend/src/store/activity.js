import { csrfFetch } from "./csrf";

const GET = 'activity/GET_ACTIVITIES';
const ADD = 'activity/ADD_ACTIVITY';
const ACTIVE = 'activity/ACTIVE_ACTIVITY';
const DELETE = 'activity/DELETE_ACTIVITY';

const getActivity = (activities) => {
    return {
        type: GET,
        activities,
    }
}

export const allActivity = (userID) => async (dispatch) => {
    const res = await csrfFetch(`/api/activity/${userID}`,{
        method: "GET",
    })
    const data = await res.json();

    dispatch(getActivity(data.activities));

    return data;
}

const addActivity = (activity) => {
    return {
        type: ADD,
        activity
    }
}

export const newActivity = (activityName, userID) => async (dispatch) => {
    const res = await csrfFetch('/api/activity', {
        method: 'POST',
        body: JSON.stringify({
            activityName,
            userID
        })
    })

    const data = await res.json();

    dispatch(addActivity(data.newActivity))

    return data.activity;
}

export const activeActivity = (activity) => {
    return {
        type: ACTIVE,
        activity
    }
}

const delActivity = (activity) => {
    return {
        type: DELETE,
        activity
    }
}

export const deleteActivity = (activity) => async (dispatch) => {
    const res = await csrfFetch(`/api/activity/${activity.id}`, {
        method: 'DELETE',
    })

    const data = await res.json();

    dispatch(delActivity(activity));

    return data;
}

// initalState = {activities:[]}
const activityReducer = (state = {activities:[], activeActivity: undefined}, action) => {
    let newState;
    let newActivities;
    switch (action.type){
        case GET:
            newState = {
                ...state,
                activities: action.activities
            }
            return newState;
        case ADD:
            newActivities = [...state.activities]
            newActivities.push(action.activity);
            newState = {
                ...state,
                activities: newActivities
            }

            return newState;
        case ACTIVE:
            newState = {
                ...state, 
                activeActivity: action.activity
            }
            return newState;
        case DELETE:
            newActivities = [...state.activities]
            let idx = newActivities.indexOf(action.activity);
            newActivities.splice(idx, 1)
            newState = {
                ...state,
                activities: newActivities
            }
            
            return newState;
        default:
            return state
    }
}

export default activityReducer