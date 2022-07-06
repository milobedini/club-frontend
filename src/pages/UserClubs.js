import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ClubCard from '../components/ClubCard'
import { getConfig } from '../helpers/api'

const UserClubs = () => {
  const [userClubs, setUserClubs] = useState([])

  useEffect(() => {
    const getUserClubs = async () => {
      const config = getConfig('auth/profile')
      try {
        const res = await axios(config)
        setUserClubs(res.data.squads)
      } catch (err) {
        console.log(err)
      }
    }
    getUserClubs()
  }, [])

  if (userClubs && userClubs.length === 0) {
    return <p>No clubs</p>
  } else if (!userClubs) {
    return <p>Loading...</p>
  } else if (userClubs) {
    return (
      <div>
        {userClubs.map((club) => (
          <ClubCard key={club.id} {...club} />
        ))}
      </div>
    )
  }
}

export default UserClubs
