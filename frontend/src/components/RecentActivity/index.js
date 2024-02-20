import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';

import './RecentActivity.css';
import { getRecent } from '../../store/recent';

const RecentActivity = () => {
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.']
    const [isLoaded, setLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const numResults = 20;

    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    if (!user){
        history.push('/landing')
    }

    const recent = useSelector(state => state.recent.records);

    useEffect(() => {
        if (user){
            dispatch(getRecent(user.id, page, numResults)) // userID, page, numResults
                .then(setLoaded(true))
        }
    }, [dispatch])


    return (
        <>
            {
                isLoaded && (
                    <div className='text-[black]
                    lg:w-[80vw] lg:h-auto'>
                        <div className='text-title titleText'
                        >
                            Recent Activity
                        </div>
                        <table className='text-[black]
                        lg:w-[100%]'
                        >
                            <thead className='border-b-[1px] border-b-[rgba(0,0,0,.1)] bg-[rgba(0,0,0,.07)]
                                lg:h-[2em]'>
                                <tr className=''>
                                    <th>Title</th>
                                    <th>Muscle Group</th>
                                    <th>Date</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    recent && (
                                        recent.map((record, idx) => (
                                            <tr key={idx} 
                                                className='border-b-[1px] border-b-[rgba(0,0,0,.01)]
                                                lg:h-[4em]'
                                            >
                                                <td>
                                                    {
                                                        record.title
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        record.activity_name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        // record.createdAt.split('T')[0].split('-')[1] + '/' + 
                                                        // record.createdAt.split('T')[0].split('-')[2] + '/' +
                                                        // record.createdAt.split('T')[0].split('-')[0]

                                                        // "July 21, 1983 01:15:00"
                                                        // [2024-02-04]T[19:25:04.418Z]

                                                        // monthsOfYear[parseInt(record.createAt.split('T')[0].split('-')[1]) - 1]
                                                        // record.createdAt.split('T')[0]
                                                        // record.createdAt.split('T')[1].split('Z')[0]
                                                        // monthsOfYear[parseInt(record.createdAt.split('T')[0].split('-')[1]) - 1]
                                                        daysOfWeek[(new Date(`
                                                            ${monthsOfYear[parseInt(record.createdAt.split('T')[0].split('-')[1]) - 1]} 
                                                            ${parseInt(record.createdAt.split('T')[0].split('-')[2])}, 
                                                            ${record.createdAt.split('T')[0].split('-')[0]} 
                                                            ${record.createdAt.split('T')[1].split('Z')[0].split('.')[0]}
                                                        `)).getDay()] + ' ' +
                                                        `
                                                        ${record.createdAt.split('T')[0].split('-')[1]}/${record.createdAt.split('T')[0].split('-')[2]}/${record.createdAt.split('T')[0].split('-')[0]}
                                                        `
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        record.notes
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </>
    )
}

export default RecentActivity;