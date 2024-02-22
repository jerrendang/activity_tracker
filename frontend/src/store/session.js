import {csrfFetch} from './csrf';

const ADD = 'session/ADD_SESSION';
const REMOVE = 'session/REMOVE_SESSION';
const RESTORE = 'session/RESTORE_SESSION';
const CREATE = 'session/CREATE_USER';

const addSession = (user) => {
    return {
        type: ADD,
        user
    }
}

const removeSession = () => {
    return {
        type: REMOVE,
    }
}

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    })
    const data = await res.json();
    
    dispatch(removeSession());

    return data;
}

export const login = ({credential, password}) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    if (res.ok){
        const {user} = await res.json();
        return dispatch(addSession(user));
    }
}

const createUser = (user) => {
    return {
        type: CREATE,
        user
    }
}

export const signup = ({username, email, password}) => async (dispatch) => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            email,
            username,
            password
        })
    });

    const data = await res.json();
    const user = data.user;

    dispatch(createUser(user));

    return res;
}

const restoreSession = (user) => {
    return {
        type: RESTORE,
        user
    }
}

export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    const data = await res.json();
    dispatch(restoreSession(data.user));
}

// const initialState = {
//     user: null
// }

const sessionReducer = (state = {user: null}, action) => {
    let newState;
    switch (action.type){
        case ADD:
            let { id, email, username, createdAt, updatedAt } = action.user;
            return {
                user: {
                    id,
                    email,
                    username,
                    createdAt,
                    updatedAt
                }
            }
        case RESTORE:
            newState = {};
            newState.user = action.user;
            return newState;
        case REMOVE:
            newState = {
                user: null
            }
            return newState;
        case CREATE:
            newState = {
                user: action.user
            }
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;