import { useEffect } from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { getToken } from './helpers/auth'

import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import EventList from './pages/EventList'
import UserClubs from './pages/UserClubs'
import ClubShow from './pages/ClubShow'
import EventShow from './pages/EventShow'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Change to useContext or Redux to manage user state rather than prop drilling
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
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route
              path="/login/"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/register/" element={<Register />} />
            {/* <Route path="/clubs/all/" element={<ClubList />} /> */}
            <Route path="/clubs/user/" element={<UserClubs />} />
            <Route path="/clubs/:id/" element={<ClubShow />} />

            <Route path="/events/" element={<EventList />} />
            <Route path="/events/:clubId/:id/" element={<EventShow />} />
          </Routes>
          <ToastContainer />
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
