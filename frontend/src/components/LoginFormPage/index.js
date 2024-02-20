import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { login } from '../../store/session';

import './LoginForm.css';

const LoginFormPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch()

    const history = useHistory();

    const userSession = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(login({
            credential: username,
            password
        }))
            .catch(async res => await res.json())
            .then(data => data.errors)
            .then(errors => setErrors(errors));
        e.target.reset()
        setUsername('');
        setPassword('');
        if (!errors){
            history.push('/');
        }
    }

    return (
        <div className='wrapper text-[black]'>  
            {
                userSession && (
                    <Redirect to='/' />
                )
            }
            <ul>
                {
                    errors.map((err, id) => {
                        return (
                            <li key={id}>{err}</li>
                        )
                    })
                }
            </ul>
            <form
                onSubmit={(e) => handleSubmit(e)}
            >
                <h2>Login</h2>
                <div>
                    <label htmlFor='usernameEntry'>
                        Username:
                    </label>
                    <input
                        id='usernameEntry'
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor='passwordEntry'>
                        Password:
                    </label>
                    <input
                    id='passwordEntry'
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                    >
                    </input>
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginFormPage;