import { Route, Routes } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { restoreUser } from "./store/session";
import { allActivity } from "./store/activity";

import SignupPage from "./components/SignupPage";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import NewEntry from './components/NewEntry';
import ActivityPage from './components/ActivityPage';
import HomeDash from './components/HomeDash';
import RecentActivity from './components/RecentActivity';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const user = useSelector(state => state.session.user);
  const activities = useSelector(state => state.activity)
  const dispatch = useDispatch();

  let username = '';
  if (user){
    username = user.username;
  }

  useEffect(() => {
    // loading
    dispatch(restoreUser())
      .then((res) => {setIsLoaded(true)})
  }, [dispatch])
  // connect the actvities to user

  return (
    <>
      {
        isLoaded && (
          <div className='relative'>
            <Navbar />
            <Routes>
              <Route path='/landing' element={<LandingPage />}>
                
              </Route>
              <Route path='/signup' element={<SignupPage />}>
                
              </Route>
              <Route path='/activityPage' element={<ActivityPage />}>
                
              </Route>
              <Route path='/newEntry' element={<NewEntry />}>
                
              </Route>
              <Route path='/recent' element={<RecentActivity />}>
                
              </Route>
              <Route exact path='/' element={<HomeDash />}>
                
              </Route>
            </Routes>
            {/* <Route exact path='/'>
              <Home />
            </Route> */}
            <script src="https://kit.fontawesome.com/a4ec5f52e4.js" crossOrigin="anonymous"></script>
          </div>
        )
      }
    </>
  );
}

export default App;
