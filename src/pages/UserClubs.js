import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ClubCard from '../components/ClubCard'
import { getConfig } from '../helpers/api'
import { Wrapper } from '../styles/styled'

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
    return (
      <Wrapper>
        <p>No Clubs</p>
      </Wrapper>
    )
  } else if (!userClubs) {
    return (
      <Wrapper>
        <p>Loading...</p>
      </Wrapper>
    )
  } else if (userClubs) {
    return (
      <Wrapper>
        {userClubs.map((club) => (
          <ClubCard key={club.id} {...club} />
        ))}
      </Wrapper>
    )
  }
}

export default UserClubs
