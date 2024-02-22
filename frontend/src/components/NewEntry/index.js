import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { allActivity, activeActivity, newActivity } from '../../store/activity';
import { getExercises, newExercise } from '../../store/exercise';
import { mostRecent } from '../../store/recent';
import { addRecord } from '../../store/exercise_records';

import './NewEntry.css';

const NewEntry = () => {
    const userActivities = useSelector(state => state.activity.activities); // array of activity names
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    if (!user) {
        history.push('/landing')
    }
    const dispatch = useDispatch();

    const activities = useSelector(state => state.activity.activities);

    const [entryTitle, setEntryTitle] = useState('');
    const [entryNotes, setEntryNotes] = useState('');
    const [repTracker, setRepTracker] = useState({});
    const [newExerciseInput, setNewExerciseInput] = useState(false);
    const [newExerciseName, setNewExerciseName] = useState('');
    const [newMuscleGroupInput, setNewMuscleGroupInput] = useState(false);
    const [newMuscleName, setNewMuscleName] = useState('');

    const chosenActivity = useSelector(state => state.activity.activeActivity);
    const chosenExercises = useSelector(state => state.exercise.exercises);

    const [newActivityName, setNewActivityName] = useState('');

    const [isLoaded, setLoaded] = useState(false);

    const handleMuscleGroupChange = (e) => {
        dispatch(activeActivity(JSON.parse(e.target.value)))
        dispatch(getExercises(JSON.parse(e.target.value).id))
    }

    useEffect(() => {
        if (user) {
            dispatch(allActivity(user.id))
                .then(() => dispatch(mostRecent(user.id)))
                .then(() => setLoaded(true));
        }
    }, [dispatch, user])

    const resetRepTracker = () => {
        setRepTracker({});
        let newInfo = {};
        for (let i = 0; i < chosenExercises.length; i += 1) {
            newInfo[chosenExercises[i].id] = {
                name: chosenExercises[i].name,
                reps: [0]
            }
        }
        setRepTracker({ ...newInfo })
    }

    useEffect(() => {
        if (chosenExercises){
            resetRepTracker();
        }
    }, [chosenExercises])

    const handleNewActivity = (e) => {
        e.preventDefault();
        if (newActivityName){
            dispatch(newActivity(newActivityName, user.id))
            e.target.reset();
            setNewActivityName('')
        }
    }

    const handleNewExercise = (e) => {
        e.preventDefault();
        if (chosenActivity && newExerciseName){
            dispatch(newExercise(newExerciseName, chosenActivity.id))
            e.target.value = '';
            setNewExerciseName('')
            setNewExerciseInput(false)
        }
    }

    const handleNewMuscle = (e) => {
        e.preventDefault();
        if (newMuscleName){
            dispatch(newActivity(newMuscleName, user.id))
            e.target.value = '';
            setNewMuscleName('');
            setNewMuscleGroupInput(false);
        }
    }

    const deleteExercise = e => {
        e.preventDefault();
    }

    const handleSubmitEntry = (e) => {
        e.preventDefault();
        dispatch(addRecord(repTracker, user.id, chosenActivity.id, chosenActivity.name , entryTitle, entryNotes))
        resetRepTracker();
        e.target.reset()
        // addRecord = (record, user_id, activity_id, activity_name, title = '', notes = '') 
    }

    return (
        <>
            {
                (isLoaded && user) && (
                    <>
                        <div className="newEntry relative bg-[rgba(0,0,0,0)] flex flex-col justify-center items-start overflow-hidden text-[black] font-[.5em]
                        lg:w-[80vw]">
                            <div
                                className='titleText text-[2.1em] font-medium
                                '
                            >
                                New Entry
                            </div>
                            <form className='w-[80%] flex flex-row' onSubmit={e => handleSubmitEntry(e)}>
                                <div className='formArea overflow-visible
                                lg:w-[60%]'>
                                    <div>
                                        <label htmlFor='titleInput' className=''>Title</label>
                                        <input type='text' className='titleInput w-[50%]' placeholder=' Ex: Morning lift' onChange={(e) => setEntryTitle(e.target.value)}>
                                        </input>
                                    </div>
                                    <div>
                                        <label htmlFor='muscleGroup'>Muscle Group</label>
                                        <select className='muscleGroup w-[50%]' defaultValue='' onChange={(e) => {
                                            handleMuscleGroupChange(e)
                                        }}>
                                            <option disabled value=''></option>
                                            {
                                                activities.map((activity, idx) => {
                                                    return (
                                                        <option key={idx} value={JSON.stringify(activity)} className=''>
                                                            {activity.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <div className={`${newMuscleGroupInput ? 'flex' : 'hidden'}`}>
                                            <input type='text' className='w-[50%]' placeholder=' New muscle group name'
                                                onChange={(e) => setNewMuscleName(e.target.value)}></input>
                                            <button className='bg-blue w-fit' onClick={e => handleNewMuscle(e)}>
                                                Create
                                            </button>
                                        </div>
                                        <div className='text-blue text-[.8em] hover:opacity-[.7] hover:cursor-pointer'
                                        onClick={e => setNewMuscleGroupInput(true)}
                                        >
                                            + Create new muscle group
                                        </div>
                                    </div>
                                    <div>
                                        <label>Exercises</label>
                                        {
                                            !chosenExercises ? 'Select a muscle group to see exercises.' : chosenExercises.map((exercise, idx) => {
                                                return (
                                                    <div key={idx} className='exerciseTab text-[.75em] flex flex-row h-fit w-auto flex-grow-0 flex-shrink-0'>
                                                        <span className='border-[rgba(0,0,0,.1)] border-solid border-[.5px] w-fit flex-grow-0 flex-shrink-0 hover:cursor-default'
                                                        >{exercise.name}</span>
                                                        {
                                                            (repTracker[exercise.id]) &&
                                                                repTracker[exercise.id].reps.map((rep, repIdx) => {
                                                                    return (
                                                                        <input key={repIdx} min={0} type='number' placeholder='Reps' className='h-[100%] w-[10%] flex-grow-0 flex-shrink-0'
                                                                            onChange={e => {
                                                                                let newReps = [...repTracker[exercise.id].reps]
                                                                                newReps[repIdx] = parseInt(e.target.value)
                                                                                setRepTracker({
                                                                                    ...repTracker,
                                                                                    [exercise.id]: {
                                                                                        name: exercise.name,
                                                                                        reps: newReps
                                                                                    }
                                                                                })
                                                                        }}
                                                                        ></input>
                                                                    )
                                                                })
                                                        }
                                                        <div className='text-blue hover:cursor-pointer hover:opacity-[.7]'
                                                        onClick={(e) => {
                                                            let newReps = {...repTracker[exercise.id]}
                                                            newReps.reps.push(0)
                                                            setRepTracker(newReps => (
                                                                {   
                                                                    ...repTracker,
                                                                    ...newReps
                                                                }
                                                            ))
                                                        }}>
                                                            + Add set
                                                        </div>
                                                        {/* list of each set */}
                                                        {/* add buttom */}
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className={`${newExerciseInput ? 'flex' : 'hidden'}`}>
                                            <input  type='text' className='w-[50%]' placeholder=' New exercise name'
                                                onChange={(e) => setNewExerciseName(e.target.value)}></input>
                                            <button className='bg-blue w-fit' onClick={e => handleNewExercise(e)}>
                                                Create
                                            </button>
                                        </div>
                                        <div className='text-blue text-[.8em] hover:opacity-[.7] hover:cursor-pointer' 
                                            // onClick={() => {console.log(chosenExercises); console.log(repTracker)}}>
                                            onClick={(e) => {
                                                setNewExerciseInput(true);
                                            }}>
                                            + Create new exercise
                                        </div>
                                    </div>
                                    <div>
                                        <button type='submit' className='bg-blue w-fit'>
                                            Submit
                                            {/* createRecord = async (record, user_id, activity_id) */}
                                            {/* record = {
                                                name:name,
                                                reps: [reps]
                                            } */}
                                        </button>
                                    </div>
                                </div>
                                <div className='formArea
                                lg:w-[40%]'>
                                    <div>
                                        <label>Notes</label>
                                        <textarea type='textarea' maxLength={255} placeholder=' Max 255 characters' className=''
                                        onChange={(e) => setEntryNotes(e.target.value)}>
                                        </textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default NewEntry;