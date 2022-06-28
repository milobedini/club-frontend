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

            <Route path="/events/" element={<EventList />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
