import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getConfig } from '../helpers/api'

const Profile = () => {
  const [user, setUser] = useState({})

  //   Should be able to change name.
  // Should have links to your squads, admin squads, and your fixtures.
  //   Eventually profile picture.

  useEffect(() => {
    const getProfile = async () => {
      const config = getConfig('auth/profile')
      try {
        const res = await axios(config)
        console.log(res.data)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()
  }, [])

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}

export default Profile
