import LoginFormPage from '../LoginFormPage';

import './LandingPage.css';

import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';

const LandingPage = () => {
    const svgSize = 'h-[100px]'
    return (
        <div className='relative flex flex-row
        h-[100vh]'>
            <div className='landingImages !m-0 h-[100%] w-[33%]'>

                <div className='mainRow !m-0 h-[50%] w-[100%] flex flex-row'>
                    <div className='h-[100%] w-[50%] !m-0'>
                        <div className='flex h-[50%] w-[100%] justify-center text-center bg-orange'>
                            <svg className={`${svgSize}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H96V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"
                                    fill='white'
                                />
                            </svg>
                        </div>
                        <div className='flex h-[50%] w-[100%] justify-center text-center bg-white'>
                            <svg className={`${svgSize}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z" 
                                    fill='black'
                                />
                            </svg>
                        </div>
                    </div>
                    <div className='overflow-clip !m-0 h-[100%] w-[50%] bg-blue relative'>
                        <img src={image3} alt='image3' className='object-cover h-[100%] w-[100%]'></img>
                    </div>
                </div>

                <div className='mainRow bg-black !m-0 h-[50%] overflow-clip'>
                    <img src={image1} alt='image1'></img>
                </div>
            </div>
            <div className=' flex justify-center items-center !m-0
            lg:w-[33%]'>
                <LoginFormPage />
            </div>
            <div className='landingImages !m-0 h-[100%] w-[33%]'>
                <div className='mainRow !m-0 h-[50%]'>
                    <img src={image4} alt='image4' className='h-[100%] w-[100%]'></img>
                </div>
                <div className='mainRow !m-0 h-[50%] w-[100%] flex flex-row'>
                    <div className='h-[100%] w-[50%]'>
                        <div className='h-[50%] w-[100%] flex justify-center text-center bg-yellow'>
                            <svg className={`${svgSize}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M511.8 267.4c-26.1 8.7-53.4 13.8-81 15.1c9.2-105.3-31.5-204.2-103.2-272.4C434.1 41.1 512 139.5 512 256c0 3.8-.1 7.6-.2 11.4zm-3.9 34.7c-5.8 32-17.6 62-34.2 88.7c-97.5 48.5-217.7 42.6-311.9-24.5c23.7-36.2 55.4-67.7 94.5-91.8c79.9 43.2 170.1 50.8 251.6 27.6zm-236-55.5c-2.5-90.9-41.1-172.7-101.9-231.7C196.8 5.2 225.8 0 256 0c2.7 0 5.3 0 7.9 .1c90.8 60.2 145.7 167.2 134.7 282.3c-43.1-2.4-86.4-14.1-126.8-35.9zM138 28.8c20.6 18.3 38.7 39.4 53.7 62.6C95.9 136.1 30.6 220.8 7.3 316.9C2.5 297.4 0 277 0 256C0 157.2 56 71.5 138 28.8zm69.6 90.5c19.5 38.6 31 81.9 32.3 127.7C162.5 294.6 110.9 368.9 90.2 451C66 430.4 45.6 405.4 30.4 377.2c6.7-108.7 71.9-209.9 177.1-257.9zM256 512c-50.7 0-98-14.7-137.8-40.2c5.6-27 14.8-53.1 27.4-77.7C232.2 454.6 338.1 468.8 433 441c-46 44-108.3 71-177 71z"
                                    fill='rgba(0,0,0,.7)'
                                />
                            </svg>
                        </div>
                        <div className='h-[50%] flex justify-center text-center bg-green'>
                            <svg className={`${svgSize}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                                    fill='white'
                                />
                            </svg>
                        </div>
                    </div>
                    <div className='overflow-clip !m-0 h-[100%] w-[50%] bg-blue relative'>
                        <img src={image2} alt='image2' className='h-[100%] w-[100%]'></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage