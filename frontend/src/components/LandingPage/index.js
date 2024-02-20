import LoginFormPage from '../LoginFormPage';

const LandingPage = () => {
    return (
        <div className='relative h-[100vh] w-[100vw] bg-red'>
            {/* image slideshow from openai dall e model */}
            <div className='absolute right-0 lg:w-[30vw] lg:h-[100vh] bg-white rounded-l-[5%] flex justify-center items-center'>
                <LoginFormPage />
            </div>
        </div>
    )
}

export default LandingPage