import './SignupPage.css';

import { useState } from 'react';

import { signup } from '../../store/session';

import { useDispatch} from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const history = useHistory();

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
        
        e.target.reset();
        console.log(errors)
        if (!errors){
            history.push('/');
        }
    }

    return (
        <div className='lg:w-[100vw] lg:h-[100vh] bg-red'>
            <div className='wrapper'>
                <form onSubmit={e => handleSubmit(e)}>
                    <h2>Sign Up</h2>
                    <ul>
                        {
                            errors && errors.map((err, idx) => (
                                <li key={idx}>{err}</li>
                            ))
                        }
                    </ul>
                    <div>
                        <label htmlFor='signupUsername'>Username:</label>
                        <input
                            id='signupUsername'
                            onChange={e => setUsername(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor='signupEmail'>Email:</label>
                        <input
                            id='signupEmail'
                            onChange={e => setEmail(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <label htmlFor='signupPassword'>Password:</label>
                        <input
                            id='signupPassword'
                            onChange={e => setPassword(e.target.value)}
                        >
                        </input>
                    </div>
                    <button>Sign Up</button>
                </form>
                <div>
                    Already have an account? <Link to='landing'>Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;