import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getToken } from './helpers/auth'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import EventList from './pages/EventList'
import UserClubs from './pages/UserClubs'
import ClubShow from './pages/ClubShow'
import EventShow from './pages/EventShow'
import Profile from './pages/Profile'
import FindClub from './pages/FindClub'
import MapSearch from './pages/MapSearch'
import CreateClub from './pages/CreateClub'

function App() {
  // TO DO

  /* 

  Front End
  - Request to join club via admin.
  - Notification to admin member to accept or deny application.
  - Sign up to fixtures.
  - Leave fixtures and club.
  - Create a club (react select for sport).
        - Eventually include option for repeating venue which generates lat/long which are used for each event by default.
  - Create a fixture (using date/time and geocoding).
  - Enhance profile, setup Cloudinary for profile pictures, club posts and club.
  - Consider best way to deal with Splitwise type feature.
  
  */

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main>
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route
              path="/login/"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/register/" element={<Register />} />
            <Route path="/profile/" element={<Profile />} />

            {/* Club Routes */}
            <Route path="/clubs/user/" element={<UserClubs />} />
            <Route path="/clubs/:id/" element={<ClubShow />} />
            <Route path="/clubs/join/" element={<FindClub />} />
            <Route path="clubs/create/" element={<CreateClub />} />

            {/* Event Routes */}
            <Route path="/events/" element={<EventList />} />
            <Route path="/events/:clubId/:id/" element={<EventShow />} />

            {/* Map Test */}
            {/* <Route path="/map/:long/:lat/" element={<MapTest />} /> */}
            <Route path="/mapsearch/" element={<MapSearch />} />
          </Routes>
          <ToastContainer />
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
