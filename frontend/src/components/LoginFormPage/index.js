import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, redirect } from 'react-router-dom';

import { login } from '../../store/session';

import './LoginForm.css';

const LoginFormPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const userSession = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(login({
            credential: username,
            password
        }))
            .then(async res => {
                if (res.ok){
                    navigate('/')
                }
                return await res.json();
            })
            .then(data => data.errors)
            .then(errors => setErrors(errors));
    }

    return (
        <div className='wrapper text-[black]'>  
            {
                userSession && (() => {
                    redirect('/')
                })
            }
            <ul>
                {
                    (errors.length > 0) && 
                    errors.map((err, id) => {
                        return (
                            <li key={id}>{err}</li>
                        )
                    })
                }
            </ul>
            <form
                onSubmit={(e) => {handleSubmit(e)}}
                className='loginForm text-center'
            >
                <div className='text-heading font-semibold'>Track your workouts and see progress.</div>
                <div>
                    <div className='text-text !mb-0'>Get active with Muscle Metrics.</div>
                    <div className='text-text'>Join today for free.</div>
                </div>
                <div>
                    <label htmlFor='usernameEntry'>
                        Username:
                    </label>
                    <input
                        id='usernameEntry'
                        onChange={(e) => {setUsername(e.target.value)}}
                        className='bg-[#f9f8f5] rounded border-[1px]'
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor='passwordEntry'>
                        Password:
                    </label>
                    <input
                        id='passwordEntry'
                        onChange={(e) => {setPassword(e.target.value)}}
                        className='bg-[#f9f8f5] rounded border-[1px]'
                    >
                    </input>
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginFormPage;