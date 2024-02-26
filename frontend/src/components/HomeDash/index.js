import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarElement,
} from "chart.js";
import { Line, Bar } from 'react-chartjs-2';
import { activeActivity, allActivity } from '../../store/activity';
import { useNavigate } from 'react-router-dom';

import { getExercises } from '../../store/exercise';
import { getRecord, resetRecord, getActivityRecord } from '../../store/exercise_records';
////////////////////////////////////////////////////////////////////////////////////////////////////////
// getRecord has been changed
////////////////////////////////////////////////////////////////////////////////////////////////////////
import { mostRecent } from '../../store/recent';

import './HomeDash.css';
const moment = require('moment');

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarElement,
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            display: false,
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    },
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false,
        }
    }
}

const HomeDash = () => {
    // get activities
    // get exercises from activities
    // then select from records where exercises == selected exerciseReducer
    // format
    const user = useSelector(state => state.session.user);
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    
    const [isLoaded, setLoaded] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState();
    const [selectedExercise, setSelectedExercise] = useState();

    const [weeked, setWeeked] = useState(false);
    const [monthed, setMonthed] = useState(false);
    const [yeared, setYeared] = useState(false);

    const date = new Date();

    const records = useSelector(state => state.exerciseRecords.records);
    const activityRecords = useSelector(state => state.exerciseRecords.user_activity);
    const activeActivity = useSelector(state => state.activity.activeActivity);
    const activities = useSelector(state => state.activity.activities);
    const exercises = useSelector(state => state.exercise.exercises);
    const mostRecentRecord = useSelector(state => state.recent.mostRecent);

    const activitySelection = ['Year', 'Month', 'Week'];
    const [activityOption, setActivityOption] = useState(-1);
    const daysInMonth = moment((date.getMonth() + 1).toString().padStart(2, '0'), 'MM').daysInMonth();

    const [days, setDays] = useState({ 'Sunday': 0, 'Monday': 0, 'Tuesday': 0, 'Wednesday': 0, 'Thursday': 0, 'Friday': 0, 'Saturday': 0 })
    const daysOfTheWeek = ['Sunday','Monday','Tuesday', 'Wednesday','Thursday','Friday','Saturday']
    const [dayNums, setDayNums] = useState(() => {
        let nums = {};
        for (let i = 0; i <= 30; i += 1){
            nums[i] = 0
        }
        return nums;
    });
    
    const [months, setMonths] = useState({ 'Jan.': 0, 'Feb.': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'Aug.': 0, 'Sept.': 0, 'Oct.': 0, 'Nov.': 0, 'Dec.': 0 })
    const monthsOfYear = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']

    const activityLabel = {
        [-1]: {},
        0: months ? months : {},
        1: dayNums ? dayNums: {},
        2: days ? days: {}
    }

    const [muscleGroupOption, setMuscleGroupOption] = useState(-1);


    // also get the exercise records
    // dispatch(getRecord(exercise.id, user.id))
    const populateActivityData = () => {
        switch (activityOption) {
            case -1:
                break;
            case 2: // week
                return Object.values(days);
            case 1: // month
                return Object.values(dayNums);
            default:
                return Object.values(months);
        }
    }

    const activityData = {
        labels: Object.keys(activityLabel[activityOption]),
        datasets: [
            {
                label: '',
                data: populateActivityData(),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                fill: true,
            },
        ],
    };

    const performanceData = {
        // labels: records.map((record) => record.createdAt.split('T')[0]),
        labels: records.map(() => ''),
        datasets: [
            {
                label: '',
                data: records.map((record) => record.reps),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                fill: false,
            },
        ],
    };

    useEffect(() => {
        if (!user) {
            navigate('/landing');
        }
        if (user){
            dispatch(allActivity(user.id))
                .then(() => dispatch(mostRecent(user.id)))
                .then(() => setLoaded(true));
        }
    }, [dispatch, user])

    useEffect(() => {
        if (selectedActivity){
            dispatch(getExercises(selectedActivity.id))
            // dispatch(resetRecord());
        }
    }, [selectedActivity])

    useEffect(() => {
        if (selectedExercise){
            dispatch(getRecord(selectedExercise.id, user.id))
        }
    }, [selectedExercise])

    useEffect(() => {
        if (activityRecords){
            switch (activityOption) {
                case 1:
                    dispatch(getActivityRecord(user.id, 30))
                        .then(() => {
                            if (!monthed) {
                                for (let i in activityRecords) {
                                    let record = activityRecords[i];
                                    let formattedDate = record.createdAt.split('T')[0]
                                    let tempDate = new Date(formattedDate);
                                    if (tempDate.getMonth() == date.getMonth()){
                                        dayNums[tempDate.getDate()] += 1;
                                    }
                                }
                                setMonthed(true)
                            }
                        })
                    break;
                case 2:
                    dispatch(getActivityRecord(user.id, 7))
                        .then(() => {
                            if (!weeked){
                                for (let i in activityRecords){
                                    let record = activityRecords[i];
                                    let formattedDate = record.createdAt.split('T')[0]
                                    let tempDate = new Date(formattedDate);
                                    if (tempDate.getDay() <= date.getDay()){
                                        days[daysOfTheWeek[tempDate.getDay()]] += 1;
                                    }
                                }
                                setWeeked(true);
                            }
                        })
                    break;
                default: // default 0
                    dispatch(getActivityRecord(user.id, 365))
                        .then(() => {
                            if (!yeared && activityRecords.length > 0){
                                for (let i in activityRecords){
                                    let record = activityRecords[i];
                                    let formattedDate = record.createdAt.split('T')[0];
                                    let tempDate = new Date(formattedDate);
                                    if (tempDate.getFullYear() == date.getFullYear()){
                                        months[monthsOfYear[tempDate.getMonth()]] += 1
                                    }
                                }
                                setYeared(true);
                            }
                        })
            }
        }
    }, [activityOption])

    // reset active activity and get exercises

    return (
        <>
        {
            isLoaded && (
                <div className='flex flex-row bg-[white] !mt-[10px]
                lg:w-[80vw]'>
                    <div className='userBox text-text w-fit h-fit flex flex-col rounded-lg border-[1px] border-[rgba(0,0,0,.1)] p-[20px]'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='pb-[5px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height='100' width='100'>
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" 
                                    fill='rgba(160,222,255,.7)'/>
                                </svg>
                            </div>
                            <div className='text-text'>
                                {
                                    user.username
                                }
                            </div>
                        </div>
                        <div className='text-label justify-center items-center h-fit'>
                            <span>Last Activity</span><br/>
                                <span><span className='text-label'>{mostRecentRecord ? mostRecentRecord.title:''}</span> • {mostRecentRecord ? `
                                ${mostRecentRecord.createdAt.split('T')[0].split('-')[1]}/${mostRecentRecord.createdAt.split('T')[0].split('-')[2]}/${mostRecentRecord.createdAt.split('T')[0].split('-')[0]}
                            `: 'No recorded activity yet'}</span>
                        </div>
                    </div>
                    <div className='dash w-fit'>
                        {/* <div className='text-title'>Dashboard</div> */}
                        <div className='activity'>
                            <div className='text-heading !mb-[10px]'>All Activity</div>
                            <div className='selection'>
                                {
                                    activitySelection.map((option, idx) => (
                                        <div key={idx} className={`${activityOption === idx ? 'selected': ''} text-label`} onClick={e => setActivityOption(idx)}>
                                            {option}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='
                            lg:h-[300px] lg:w-[500px]'>
                                <Bar 
                                    className='!m-0 !mt-[10px]'
                                    data={activityData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                        plugins: {
                                            legend: {
                                                display: false
                                            },
                                            title: {
                                                display: false,
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className='progress'>
                            <div className='text-heading !mb-[10px]'>Performance</div>
                            <div className='selection'>
                                {
                                    activities.map((activity, idx) => (
                                        <div key={idx} className={`${muscleGroupOption === idx ? 'selected': ''} text-label`} onClick={e => {
                                            setSelectedActivity(activities[idx])
                                            setMuscleGroupOption(idx)
                                        }}>
                                            {
                                                activity.name
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <select className='w-[25%] !mt-[10px]' onChange={(e) => {
                                setSelectedExercise(JSON.parse(e.target.value))
                            }}>
                                <option></option>
                                {
                                    exercises && (
                                        exercises.map((exercise, idx) => {
                                            return (<option key={idx} value={JSON.stringify(exercise)}>{exercise.name}</option>)
                                        })
                                    )
                                }
                            </select>
                            <div>
                                <Line 
                                    className='!m-0 !mt-[10px]'
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                        plugins: {
                                            legend: {
                                                display: false
                                            },
                                            title: {
                                                display: false,
                                            }
                                        },
                                        animations: {
                                            tension: {
                                                duration: 3000,
                                                easing: 'linear',
                                                from: .2,
                                                to: -.2,
                                                loop: true
                                            }
                                        },
                                    }}
                                    data={performanceData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default HomeDash;