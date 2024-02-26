import './SignupPage.css';

import { useState } from 'react';

import { signup } from '../../store/session';

import { useDispatch} from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup({username, email, password}))
            .catch(res => res.json())
            .then(data => data.errors)
            .then(errs => {
                console.log(errs)
                return errs
            })
            .then(errs => setErrors(errs))
            .then(() => {
                e.target.reset();
                if (errors.length < 1) {
                    navigate('/')
                }
            })
    }

    return (
        <div className='text-center !mt-[10px]
        w-[100vw]'>
            <form onSubmit={e => handleSubmit(e)} className='signupForm'>
                <h2 className='text-center'>Sign Up</h2>
                <ul>
                    {
                        errors && errors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                        ))
                    }
                </ul>
                <div className='!m-0 items-center'>
                    <label htmlFor='signupUsername'>Username:</label>
                    <input
                        id='signupUsername'
                        onChange={e => setUsername(e.target.value)}
                        className='w-[20%]'
                    >
                    </input>
                </div>
                <div className='!m-0 items-center'>
                    <label htmlFor='signupEmail'>Email:</label>
                    <input
                        id='signupEmail'
                        onChange={e => setEmail(e.target.value)}
                        className='w-[20%]'
                    >
                    </input>
                </div>
                <div className='!m-0 items-center'>
                    <label htmlFor='signupPassword'>Password:</label>
                    <input
                        id='signupPassword'
                        onChange={e => setPassword(e.target.value)}
                        className='w-[20%]'
                    >
                    </input>
                </div>
                <button>Sign Up</button>
            </form>
            <div>
                Already have an account? <Link to='landing' className='hover:text-blue'>Log in</Link>
            </div>
        </div>
    )
}

export default SignupPage;