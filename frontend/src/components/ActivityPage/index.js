import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { getExercises, newExercise, deleteExercise } from '../../store/exercise';
import { addRecord, countRecord, resetCount, newCount, deleteCount } from '../../store/exercise_records';
import { deleteActivity } from '../../store/activity';
////////////////////////////////////////////////////////////////////////////////////////////////////////
// deleteActivity has been changed
////////////////////////////////////////////////////////////////////////////////////////////////////////

const ActivityPage = () => {
    const [isLoaded, setLoaded] = useState(false);
    const [newExerciseName, setNewExerciseName] = useState('');
    
    const exerciseCount = useSelector(state => state.exerciseRecords.counts);
    const activeActivity = useSelector(state => state.activity.activeActivity);
    const exercises = useSelector(state => state.exercise.exercises);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleDeleteActivity = (e, activity) => {
        dispatch(deleteActivity(activity));
    }

    const handleNewExercise = (e) => {
        e.preventDefault();
        if (newExerciseName){
            dispatch(newExercise(newExerciseName, activeActivity.id));
            e.target.reset();
            setNewExerciseName('');
        }
    }

    const handleDeleteExercise = (e, exercise) => {
        dispatch(deleteCount(exercise.id))
        dispatch(deleteExercise(exercise));
    }

    const handleActivitySubmit = (e) => {
        e.preventDefault();
        if (exercises.length >= 1){ 
            // exerciseCount = {
            //     1: {
            //         name:name,
            //         reps: []
            //     }
            // }
            dispatch(addRecord(exerciseCount, user.id, activeActivity.id));
            e.target.reset();
        }
    }

    useEffect(() => {
        if (activeActivity){
            dispatch(getExercises(activeActivity.id)).then(() => {
                setLoaded(true)
            })
        }
    }, [dispatch, activeActivity])

    useEffect(() => {
        if (!user || !activeActivity){
            navigate('/');
        }  
        dispatch(resetCount());
    }, [])

    return (
        <>
            {
                isLoaded && (
                    <>
                        <div className='absolute text-[#ffffff]'>
                            {activeActivity.name}
                        </div>
                        <div className='lg:h-[100vh] relative lg:w-[80vw] bg-[#ffffff] flex justify-center items-center'>
                            <div className='text-[2em]'>
                                {activeActivity.name}
                            </div>
                            <form
                                onSubmit={e => handleActivitySubmit(e)}
                            >
                                {
                                    exercises.map((exercise, idx) => {
                                        dispatch(countRecord(exercise.id, exercise.name))
                                        return (
                                            <div key={idx} className='text-[1.5em]'>
                                                {exercise.name}
                                                <div
                                                    className='rounded-full bg-white hover:cursor-pointer'
                                                    onClick={e => handleDeleteExercise(e, exercise)}
                                                >
                                                    delete
                                                </div>
                                                {
                                                    exerciseCount[exercise.id].reps.map((rep, idx2) => {
                                                        return (
                                                        <input className='text-[black]' type='number' placeholder={'reps' + idx}
                                                            onChange={e => {
                                                                dispatch(countRecord(exercise.id, exercise.name, parseInt(e.target.value), idx2))
                                                            }}
                                                        ></input>
                                                    )})
                                                }
                                                <div className='rounded-full bg-white hover:cursor-pointer'
                                                    onClick={e => {
                                                        dispatch(newCount(exercise.id));
                                                    }}
                                                >
                                                    new
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <input 
                                    type='submit'
                                    className='rounded-full bg-white hover:cursor-pointer'
                                    placeholder='submit'
                                >
                                </input>
                            </form>
                            {/* new exercise */}
                            <form
                                onSubmit={e => handleNewExercise(e)}
                            >
                                <input type='text' placeholder='New Exercise' onChange={(e) => setNewExerciseName(e.target.value)}/>
                                <button 
                                    type='submit'
                                    className='rounded-full bg-white hover:cursor-pointer'
                                >
                                    new exercise
                                </button>
                            </form>
                            <Link className='deleteButton rounded-full lg:h-[20px] lg:w-[20px] bg-blue hover:cursor-pointer items-center justify-center'
                                to='/'
                                onClick={e => handleDeleteActivity(e, activeActivity)}
                            >
                                delete activity
                            </Link>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default ActivityPage;