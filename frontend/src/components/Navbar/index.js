import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

import { logout } from '../../store/session';

const Navbar = () => {
    const user = useSelector(state => state.session.user);
    const logoLink = user ? '/': '/landing';
    const navFill = '#000000'

    const dispatch = useDispatch();

    return (
        <div className='z-[2] top-0 sticky bg-[rgba(255,255,255,1)] shadow-sm pl-[2%] pr-[2%] h-[8vh] w-[100vw]'
        >
            <div className='flex flex-row items-center justify-between w-[80vw] h-[100%]'>
                <Link className='logo h-full lg:text-[1em] flex items-center self-start !m-0'
                    to={logoLink}
                >
                    <span>MUSCLE</span>
                    <span className='text-[#ffffff] bg-[#a0deff] rounded-lg pl-[5px] pr-[5px]'>METRICS</span>
                </Link>
                <div className='navigation text-[#000000] flex flex-row items-center justify-end
                    h-full w-[25%] text-[.8em] !m-0 lg:justify-end min-w-[200px]' 
                >
                    {
                        user && (
                            <>
                                <Link to='/'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                        <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" 
                                            fill={navFill}
                                        />
                                    </svg>
                                </Link>
                                <Link to='/newEntry'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height='16' width='16' viewBox="0 0 448 512">
                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" 
                                            fill={navFill}
                                        />
                                    </svg>
                                </Link>
                                <Link to='/recent'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height='16' width='16' viewBox="0 0 512 512">
                                        <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" 
                                            fill={navFill}
                                        />
                                    </svg>
                                </Link>
                                <Link
                                    to='/landing'
                                    onClick={e => dispatch(logout())}
                                >
                                    Logout
                                </Link>
                            </>
                        )
                    }
                    {
                        !user && (
                            <>
                                <Link to='/signup' className='text-[black] border-[rgba(0,0,0,.3)] border-[1px] px-[20px] py-[8px] rounded-md'>Signup</Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;