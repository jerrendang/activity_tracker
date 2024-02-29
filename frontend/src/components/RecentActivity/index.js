import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';

import './RecentActivity.css';
import { getRecent } from '../../store/recent';

const RecentActivity = () => {
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.']
    const [isLoaded, setLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const numResults = 15;

    const user = useSelector(state => state.session.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const recent = useSelector(state => state.recent.records);

    useEffect(() => {
        if (user){
            dispatch(getRecent(user.id, page, numResults)) // userID, page, numResults
                .then(setLoaded(true))
        }
        else{
            navigate('/landing')
        }
    }, [dispatch])

    const handlePageChange = (num) => {
        if (num === 1){
            if (!(recent.length < numResults)){
                setPage(page + 1)
            }
        }
        else{ // num === -1
            if (page > 1){
                setPage(page - 1)
            }
        }
    }

    useEffect(() => {
        if (isLoaded){
            dispatch(getRecent(user.id, page, numResults))
            console.log(page)
        }
    }, [page])

    return (
        <>
            {
                isLoaded && (
                    <div className='text-[black] flex flex-col
                    w-[80vw] h-auto min-w-[800px]'>
                        <div className='text-title titleText'
                        >
                            Recent Activity
                        </div>
                        <table className='text-[black]
                        w-[100%]'
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
                        <div className='flex flex-row !mt-[30px]'>
                            <div className='hover:cursor-pointer hover:opacity-[.6]' onClick={() => {
                                handlePageChange(-1)
                            }}>
                                <svg className='h-[20px] w-[20px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                    <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" 
                                        fill='rgba(0,0,0,1)'
                                    />
                                </svg>
                            </div>
                            <div className='p-[20px]'>{page}</div>
                            <div className='hover:cursor-pointer hover:opacity-[.6]' onClick={() => {
                                handlePageChange(1)
                            }}>
                                <svg className='h-[20px] w-[20px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                    <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" 
                                        fill='rgba(0,0,0,1)'
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default RecentActivity;