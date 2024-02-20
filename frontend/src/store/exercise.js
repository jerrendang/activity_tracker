import {csrfFetch} from './csrf';

const GET = 'exercise/GET_EXERCISES';
const ADD = 'exercise/ADD_EXERCISE';
const DELETE = 'exercise/DELETE_EXERCISE';

const allExercises = (exercises) => {
    return {
        type: GET,
        exercises
    }
}

export const getExercises = (activityID) => async (dispatch) => {
    const res = await csrfFetch(`/api/exercise/${activityID}`, {
        method: 'GET'
    })

    const data = await res.json();
    dispatch(allExercises(data.exercises))

    return data.exercises
}

const addExercise = (exercise) => {
    return {
        type: ADD,
        exercise
    }
}

export const newExercise = (exerciseName, activityID) => async (dispatch) => {
    const res = await csrfFetch('/api/exercise/', {
        method: 'POST',
        body: JSON.stringify({
            exerciseName,
            activityID
        })
    })

    const data = await res.json();

    dispatch(addExercise(data.exercise));

    return data.exercise;
}

const delExercise = (exercise) => {
    return {
        type: DELETE,
        exercise
    }
}

export const deleteExercise = exercise => async (dispatch) => {
    const res = await csrfFetch(`/api/exercise/${exercise.id}`, {
        method: 'DELETE',
    })

    const data = await res.json();

    dispatch(delExercise(exercise))

    return data;
}

const exerciseReducer = (state = {}, action) => {
    let newState;
    let stateExercises;
    switch (action.type){
        case GET:
            newState = {
                ...state,
                exercises:action.exercises
            }
            return newState;
        case ADD:
            stateExercises = [...state.exercises]
            newState = {
                ...state,
                exercises: stateExercises.concat([action.exercise])
            }
            return newState;
        case DELETE:
            stateExercises = [...state.exercises]
            let idx = stateExercises.indexOf(action.exercise);
            stateExercises.splice(idx, 1);
            newState = {
                ...state,
                exercises: stateExercises
            }
            return newState;
        default:
            return state;
    }   
}

export default exerciseReducer;